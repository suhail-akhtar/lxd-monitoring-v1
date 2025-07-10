/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/api/services/DashboardService.ts - Fixed operations and network state issues
import { LXDApiClient } from '../client/LXDApiClient';
import type {
  DashboardData,
  DashboardMetrics,
  InstanceInfo,
  InstanceState,
  ClusterMember,
  StoragePool,
  StoragePoolResources,
  NetworkInfo,
  NetworkState,
  Operation,
} from '../types/dashboard';

// Add new types for enhanced functionality
export interface ProjectInfo {
  name: string;
  description: string;
  config: Record<string, any>;
  used_by: string[];
}

export interface ClusterResourceInfo {
  name: string;
  cpu_cores: number;
  memory_total: number;
  memory_usage: number;
  cpu_usage: number;
  network_rx: number;
  network_tx: number;
  load_average: number[];
  uptime: number;
}

export interface TimeSeriesPoint {
  timestamp: string;
  cpu: number;
  memory: number;
  storage_io: number;
  network: number;
}

export interface DashboardServiceConfig {
  maxRecentOperations?: number;
  project?: string;
  includeStates?: boolean;
  includeNetworkStates?: boolean; // New option to disable network states
  timeSeriesPoints?: number;
}

export class DashboardService {
  private apiClient: LXDApiClient;
  private config: DashboardServiceConfig;
  private timeSeriesData: TimeSeriesPoint[] = [];

  constructor(apiClient: LXDApiClient, config: DashboardServiceConfig = {}) {
    this.apiClient = apiClient;
    this.config = {
      maxRecentOperations: 10,
      includeStates: true,
      includeNetworkStates: false, // Disabled by default to avoid 500 errors
      timeSeriesPoints: 12, // Last 12 data points for trends
      ...config,
    };
  }

  async getDashboardData(): Promise<DashboardData & { 
    projects: ProjectInfo[]; 
    clusterResources: ClusterResourceInfo[];
    timeSeriesData: TimeSeriesPoint[];
  }> {
    try {
      // Fetch all required data in parallel
      const [
        projects,
        instances,
        clusterMembers,
        storagePools,
        networks,
        operations,
      ] = await Promise.all([
        this.fetchProjects(),
        this.fetchInstances(),
        this.fetchClusterMembers(),
        this.fetchStoragePools(),
        this.fetchNetworks(),
        this.fetchRecentOperations(),
      ]);

      // Fetch detailed states and cluster resources
      const [instanceStates, storageResources, networkStates, clusterResources] = await Promise.all([
        this.config.includeStates ? this.fetchInstanceStates(instances) : new Map<string, InstanceState>(),
        this.fetchStorageResources(storagePools),
        (this.config.includeStates && this.config.includeNetworkStates) ? this.fetchNetworkStates(networks) : new Map<string, NetworkState>(),
        this.fetchClusterResources(clusterMembers),
      ]);

      // Generate time series data for trends
      this.generateTimeSeriesData(clusterResources, instanceStates);

      // Calculate aggregated metrics with cluster-wide calculations
      const metrics = this.calculateClusterMetrics(
        instances,
        instanceStates,
        clusterMembers,
        clusterResources,
        storagePools,
        storageResources,
        networks,
        networkStates
      );

      return {
        metrics,
        instances,
        instanceStates,
        clusterMembers,
        storagePools,
        storageResources,
        networks,
        networkStates,
        recentOperations: operations,
        projects,
        clusterResources,
        timeSeriesData: this.timeSeriesData,
      };
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      throw error;
    }
  }

private async fetchProjects(): Promise<ProjectInfo[]> {
    try {
      console.log('Fetching projects from LXD API...');
      
      // First get the list of project URLs
      const projectUrls = await this.apiClient.getProjects();
      console.log('Project URLs received:', projectUrls);
      
      // Check if projectUrls is an array of URLs or objects
      if (!Array.isArray(projectUrls)) {
        console.warn('Projects API returned non-array:', projectUrls);
        return [];
      }

      if (projectUrls.length === 0) {
        console.log('No projects found in LXD');
        return [];
      }

      // Fetch detailed info for each project
      const projectPromises = projectUrls.map(async (url: string) => {
        try {
          // Extract project name from URL (e.g., "/1.0/projects/default" -> "default")
          const projectName = url.split('/').pop();
          if (!projectName) {
            console.warn('Could not extract project name from URL:', url);
            return null;
          }
          
          console.log(`Fetching details for project: ${projectName}`);
          const project = await this.apiClient.getProjectInfo(projectName);
          console.log(`Project ${projectName} details:`, project);
          
          // Ensure we have the required properties
          return {
            name: project.name || projectName,
            description: project.description || '',
            config: project.config || {},
            used_by: project.used_by || []
          };
        } catch (error) {
          console.error(`Failed to fetch project info for ${url}:`, error);
          return null;
        }
      });

      const projects = await Promise.all(projectPromises);
      const validProjects = projects.filter(project => project !== null);
      
      console.log(`Successfully fetched ${validProjects.length} projects:`, validProjects.map(p => p.name));
      return validProjects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      
      // Return a default project if fetching fails
      console.log('Falling back to default project');
      return [
        { 
          name: 'default', 
          description: 'Default Project', 
          config: {}, 
          used_by: [] 
        }
      ];
    }
  }
  private async fetchClusterResources(clusterMembers: ClusterMember[]): Promise<ClusterResourceInfo[]> {
    const clusterResources: ClusterResourceInfo[] = [];

    if (clusterMembers.length === 0) {
      console.log('No cluster members found, might be a standalone LXD instance');
      return clusterResources;
    }

    const resourcePromises = clusterMembers.map(async (member) => {
      try {
        // Fetch resources for each cluster member
        const resources = await this.apiClient.makeRequest(`/1.0/resources?target=${member.server_name}`);
        
        // Parse CPU and memory information
        const cpu = resources.cpu || {};
        const memory = resources.memory || {};
        const network = resources.network || {};

        // Calculate network throughput from all interfaces
        let totalNetworkRx = 0;
        let totalNetworkTx = 0;

        if (network && typeof network === 'object') {
          Object.values(network).forEach((iface: any) => {
            if (iface && iface.counters) {
              totalNetworkRx += iface.counters.bytes_received || 0;
              totalNetworkTx += iface.counters.bytes_sent || 0;
            }
          });
        }

        clusterResources.push({
          name: member.server_name,
          cpu_cores: cpu.total || 0,
          memory_total: memory.total || 0,
          memory_usage: memory.used || 0,
          cpu_usage: cpu.usage || 0,
          network_rx: totalNetworkRx,
          network_tx: totalNetworkTx,
          load_average: resources.system?.load || [0, 0, 0],
          uptime: resources.system?.uptime || 0,
        });
      } catch (error) {
        console.error(`Failed to fetch resources for ${member.server_name}:`, error);
        // Add placeholder data for failed nodes
        clusterResources.push({
          name: member.server_name,
          cpu_cores: 0,
          memory_total: 0,
          memory_usage: 0,
          cpu_usage: 0,
          network_rx: 0,
          network_tx: 0,
          load_average: [0, 0, 0],
          uptime: 0,
        });
      }
    });

    await Promise.allSettled(resourcePromises);
    return clusterResources;
  }

  private generateTimeSeriesData(clusterResources: ClusterResourceInfo[], instanceStates: Map<string, InstanceState>) {
    // For demo purposes, generate recent time series data
    // In a real implementation, this would come from a time-series database
    const now = new Date();
    const points: TimeSeriesPoint[] = [];

    for (let i = this.config.timeSeriesPoints! - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000); // 5-minute intervals
      
      // Calculate cluster-wide metrics for this time point
      const totalCpuCores = clusterResources.reduce((sum, node) => sum + node.cpu_cores, 0);
      const totalMemory = clusterResources.reduce((sum, node) => sum + node.memory_total, 0);
      const avgCpuUsage = clusterResources.reduce((sum, node) => sum + (node.cpu_usage || 0), 0) / Math.max(clusterResources.length, 1);
      const avgMemoryUsage = clusterResources.reduce((sum, node) => sum + (node.memory_usage || 0), 0) / Math.max(totalMemory, 1) * 100;
      
      // Add some realistic variation
      const variation = 0.1; // 10% variation
      const cpuVariation = (Math.random() - 0.5) * variation * avgCpuUsage;
      const memoryVariation = (Math.random() - 0.5) * variation * avgMemoryUsage;
      
      points.push({
        timestamp: timestamp.toISOString(),
        cpu: Math.max(0, Math.min(100, avgCpuUsage + cpuVariation)),
        memory: Math.max(0, Math.min(100, avgMemoryUsage + memoryVariation)),
        storage_io: Math.random() * 500 + 100, // MB/s
        network: Math.random() * 2000 + 500, // MB/s
      });
    }

    this.timeSeriesData = points;
  }

  private calculateClusterMetrics(
    instances: InstanceInfo[],
    instanceStates: Map<string, InstanceState>,
    clusterMembers: ClusterMember[],
    clusterResources: ClusterResourceInfo[],
    storagePools: StoragePool[],
    storageResources: Map<string, StoragePoolResources>,
    networks: NetworkInfo[],
    networkStates: Map<string, NetworkState>
  ): DashboardMetrics {
    // Calculate instance metrics
    const instanceMetrics = this.calculateInstanceMetrics(instances, instanceStates);
    
    // Calculate cluster metrics
    const clusterMetrics = this.calculateClusterHealthMetrics(clusterMembers);
    
    // Calculate cluster-wide resource metrics
    const resourceMetrics = this.calculateClusterResourceMetrics(
      clusterResources,
      storagePools,
      storageResources,
      networkStates
    );

    return {
      instances: instanceMetrics,
      cluster: clusterMetrics,
      resources: resourceMetrics,
    };
  }

  private calculateInstanceMetrics(instances: InstanceInfo[], instanceStates: Map<string, InstanceState>) {
    const total = instances.length;
    let running = 0;
    let stopped = 0;
    let starting = 0;
    let error = 0;

    instances.forEach(instance => {
      const state = instanceStates.get(instance.name);
      const status = state?.status || instance.status || 'Unknown';

      switch (status.toLowerCase()) {
        case 'running':
          running++;
          break;
        case 'stopped':
          stopped++;
          break;
        case 'starting':
        case 'stopping':
          starting++;
          break;
        case 'error':
        case 'failed':
          error++;
          break;
        default:
          stopped++;
      }
    });

    return { total, running, stopped, starting, error };
  }

  private calculateClusterHealthMetrics(clusterMembers: ClusterMember[]) {
    const totalNodes = clusterMembers.length;
    const healthyNodes = clusterMembers.filter(
      member => member.status.toLowerCase() === 'online'
    ).length;
    
    const healthPercentage = totalNodes > 0 
      ? Math.round((healthyNodes / totalNodes) * 100) 
      : 100; // 100% if no cluster (standalone)

    return { totalNodes: Math.max(totalNodes, 1), healthyNodes: Math.max(healthyNodes, 1), healthPercentage };
  }

  private calculateClusterResourceMetrics(
    clusterResources: ClusterResourceInfo[],
    storagePools: StoragePool[],
    storageResources: Map<string, StoragePoolResources>,
    networkStates: Map<string, NetworkState>
  ) {
    // Aggregate CPU metrics across cluster
    const totalCpuCores = clusterResources.reduce((sum, node) => sum + node.cpu_cores, 0);
    const avgCpuUsage = clusterResources.length > 0 
      ? clusterResources.reduce((sum, node) => sum + (node.cpu_usage || 0), 0) / clusterResources.length
      : 0;
    const usedCpuCores = (avgCpuUsage / 100) * totalCpuCores;

    // Aggregate memory metrics across cluster
    const totalMemory = clusterResources.reduce((sum, node) => sum + node.memory_total, 0);
    const totalMemoryUsed = clusterResources.reduce((sum, node) => sum + node.memory_usage, 0);
    const memoryUtilization = totalMemory > 0 ? Math.round((totalMemoryUsed / totalMemory) * 100) : 0;

    // Aggregate storage metrics
    let totalStorage = 0;
    let usedStorage = 0;
    storagePools.forEach(pool => {
      const resources = storageResources.get(pool.name);
      if (resources?.space) {
        totalStorage += resources.space.total || 0;
        usedStorage += resources.space.used || 0;
      }
    });
    const storageUtilization = totalStorage > 0 ? Math.round((usedStorage / totalStorage) * 100) : 0;

    // Aggregate network metrics across cluster
    const totalNetworkRx = clusterResources.reduce((sum, node) => sum + (node.network_rx || 0), 0);
    const totalNetworkTx = clusterResources.reduce((sum, node) => sum + (node.network_tx || 0), 0);
    const totalThroughput = totalNetworkRx + totalNetworkTx;

    // Calculate peak throughput (estimate based on current + some headroom)
    const peakThroughput = totalThroughput * 2.1; // Assume peak is ~2x current

    return {
      cpu: {
        totalCores: totalCpuCores,
        usedCores: usedCpuCores,
        utilization: Math.round(avgCpuUsage),
      },
      memory: {
        total: totalMemory,
        used: totalMemoryUsed,
        utilization: memoryUtilization,
      },
      storage: {
        total: totalStorage,
        used: usedStorage,
        utilization: storageUtilization,
      },
      network: {
        totalThroughput: totalThroughput,
        peakThroughput: peakThroughput,
      },
    };
  }

  // Existing methods with fixes
  private async fetchInstances(): Promise<InstanceInfo[]> {
    try {
      const instanceUrls = await this.apiClient.getInstances(); // Removed project param
      
      if (!Array.isArray(instanceUrls)) {
        console.warn('Instances API returned non-array:', instanceUrls);
        return [];
      }

      const instancePromises = instanceUrls.map(async (url: string) => {
        try {
          const instanceName = url.split('/').pop();
          if (!instanceName) return null;
          
          return await this.apiClient.getInstanceInfo(instanceName); // Removed project param
        } catch (error) {
          console.error(`Failed to fetch instance info for ${url}:`, error);
          return null;
        }
      });

      const instances = await Promise.all(instancePromises);
      return instances.filter(instance => instance !== null);
    } catch (error) {
      console.error('Failed to fetch instances:', error);
      return [];
    }
  }

  private async fetchInstanceStates(instances: InstanceInfo[]): Promise<Map<string, InstanceState>> {
    const stateMap = new Map<string, InstanceState>();

    const statePromises = instances.map(async (instance) => {
      try {
        const state = await this.apiClient.getInstanceState(instance.name); // Removed project param
        stateMap.set(instance.name, state);
      } catch (error) {
        console.error(`Failed to fetch state for instance ${instance.name}:`, error);
      }
    });

    await Promise.allSettled(statePromises);
    return stateMap;
  }

  private async fetchClusterMembers(): Promise<ClusterMember[]> {
    try {
      const memberUrls = await this.apiClient.getClusterMembers();
      
      if (!Array.isArray(memberUrls)) {
        console.warn('Cluster members API returned non-array:', memberUrls);
        return [];
      }

      const memberPromises = memberUrls.map(async (url: string) => {
        try {
          const memberName = url.split('/').pop();
          if (!memberName) return null;
          
          return await this.apiClient.getClusterMemberInfo(memberName);
        } catch (error) {
          console.error(`Failed to fetch cluster member info for ${url}:`, error);
          return null;
        }
      });

      const members = await Promise.all(memberPromises);
      return members.filter(member => member !== null);
    } catch (error) {
      console.error('Failed to fetch cluster members:', error);
      return [];
    }
  }

  private async fetchStoragePools(): Promise<StoragePool[]> {
    try {
      const poolUrls = await this.apiClient.getStoragePools();
      
      if (!Array.isArray(poolUrls)) {
        console.warn('Storage pools API returned non-array:', poolUrls);
        return [];
      }

      const poolPromises = poolUrls.map(async (url: string) => {
        try {
          const poolName = url.split('/').pop();
          if (!poolName) return null;
          
          return await this.apiClient.getStoragePoolInfo(poolName);
        } catch (error) {
          console.error(`Failed to fetch storage pool info for ${url}:`, error);
          return null;
        }
      });

      const pools = await Promise.all(poolPromises);
      return pools.filter(pool => pool !== null);
    } catch (error) {
      console.error('Failed to fetch storage pools:', error);
      return [];
    }
  }

  private async fetchStorageResources(pools: StoragePool[]): Promise<Map<string, StoragePoolResources>> {
    const resourceMap = new Map<string, StoragePoolResources>();

    const resourcePromises = pools.map(async (pool) => {
      try {
        const resources = await this.apiClient.getStoragePoolResources(pool.name);
        resourceMap.set(pool.name, resources);
      } catch (error) {
        console.error(`Failed to fetch resources for storage pool ${pool.name}:`, error);
      }
    });

    await Promise.allSettled(resourcePromises);
    return resourceMap;
  }

  private async fetchNetworks(): Promise<NetworkInfo[]> {
    try {
      const networkUrls = await this.apiClient.getNetworks();
      
      if (!Array.isArray(networkUrls)) {
        console.warn('Networks API returned non-array:', networkUrls);
        return [];
      }

      const networkPromises = networkUrls.map(async (url: string) => {
        try {
          const networkName = url.split('/').pop();
          if (!networkName) return null;
          
          return await this.apiClient.getNetworkInfo(networkName);
        } catch (error) {
          console.error(`Failed to fetch network info for ${url}:`, error);
          return null;
        }
      });

      const networks = await Promise.all(networkPromises);
      return networks.filter(network => network !== null);
    } catch (error) {
      console.error('Failed to fetch networks:', error);
      return [];
    }
  }

private async fetchNetworkStates(networks: NetworkInfo[]): Promise<Map<string, NetworkState>> {
    const stateMap = new Map<string, NetworkState>();

    const statePromises = networks.map(async (network) => {
      try {
        // Skip certain network types that don't support state queries
        const networkType = network.type?.toLowerCase() || '';
        const networkName = network.name?.toLowerCase() || '';
        
        // Skip networks that commonly don't support state queries
        if (
          networkType === 'physical' || 
          networkType === 'macvlan' || 
          networkType === 'sriov' ||
          networkName === 'mgmt' ||
          networkName === 'management' ||
          networkName.includes('mgmt') ||
          !network.managed // Skip unmanaged networks
        ) {
          console.log(`Skipping state query for network: ${network.name} (type: ${networkType || 'unknown'})`);
          return;
        }

        const state = await this.apiClient.getNetworkState(network.name);
        stateMap.set(network.name, state);
      } catch (error) {
        console.error(`Failed to fetch state for network ${network.name}:`, error);
        // Don't throw, just skip this network state
      }
    });

    await Promise.allSettled(statePromises);
    return stateMap;
  }

  private async fetchRecentOperations(): Promise<Operation[]> {
    try {
      const operationUrls = await this.apiClient.getOperations();
      
      if (!Array.isArray(operationUrls)) {
        console.warn('Operations API returned non-array:', operationUrls);
        return [];
      }

      // Limit the number of operations we fetch to avoid too many requests
      const limitedUrls = operationUrls.slice(0, this.config.maxRecentOperations! * 2);
      
      const operationPromises = limitedUrls.map(async (url: string) => {
        try {
          const operationId = url.split('/').pop();
          if (!operationId) return null;
          
          return await this.apiClient.getOperationInfo(operationId);
        } catch (error) {
          console.error(`Failed to fetch operation info for ${url}:`, error);
          return null;
        }
      });

      const operations = await Promise.all(operationPromises);
      const validOperations = operations.filter(op => op !== null);
      
      // Sort by creation date and limit results
      return validOperations
        .sort((a: Operation, b: Operation) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, this.config.maxRecentOperations);
    } catch (error) {
      console.error('Failed to fetch operations:', error);
      return [];
    }
  }

  // New method to change project
   async switchProject(projectName: string): Promise<void> {
    console.log(`🔄 DashboardService: Switching to project "${projectName}"`);
    this.config.project = projectName;
    
    // THIS IS THE KEY FIX: Update the API client's current project
    this.apiClient.setCurrentProject(projectName);
  }

  // Get available projects
  async getProjects(): Promise<ProjectInfo[]> {
    return this.fetchProjects();
  }
}