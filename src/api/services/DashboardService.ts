/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/api/services/DashboardService.ts
// src/api/services/DashboardService.ts - Enhanced with cluster calculations
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
        this.config.includeStates ? this.fetchNetworkStates(networks) : new Map<string, NetworkState>(),
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
      const projectNames = await this.apiClient.getProjects();
      
      const projectPromises = projectNames.map(async (name: string) => {
        const projectName = name.split('/').pop();
        return this.apiClient.getProjectInfo(projectName!);
      });

      return await Promise.all(projectPromises);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  }

  private async fetchClusterResources(clusterMembers: ClusterMember[]): Promise<ClusterResourceInfo[]> {
    const clusterResources: ClusterResourceInfo[] = [];

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

        Object.values(network).forEach((iface: any) => {
          if (iface.counters) {
            totalNetworkRx += iface.counters.bytes_received || 0;
            totalNetworkTx += iface.counters.bytes_sent || 0;
          }
        });

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
      : 0;

    return { totalNodes, healthyNodes, healthPercentage };
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

  // Existing methods remain the same but with enhanced error handling
  private async fetchInstances(): Promise<InstanceInfo[]> {
    try {
      const instanceNames = await this.apiClient.getInstances(this.config.project);
      
      const instancePromises = instanceNames.map(async (name: string) => {
        const instanceName = name.split('/').pop();
        return this.apiClient.getInstanceInfo(instanceName!, this.config.project);
      });

      return await Promise.all(instancePromises);
    } catch (error) {
      console.error('Failed to fetch instances:', error);
      return [];
    }
  }

  private async fetchInstanceStates(instances: InstanceInfo[]): Promise<Map<string, InstanceState>> {
    const stateMap = new Map<string, InstanceState>();

    const statePromises = instances.map(async (instance) => {
      try {
        const state = await this.apiClient.getInstanceState(instance.name, this.config.project);
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
      const memberNames = await this.apiClient.getClusterMembers();
      
      const memberPromises = memberNames.map(async (name: string) => {
        const memberName = name.split('/').pop();
        return this.apiClient.getClusterMemberInfo(memberName!);
      });

      return await Promise.all(memberPromises);
    } catch (error) {
      console.error('Failed to fetch cluster members:', error);
      return [];
    }
  }

  private async fetchStoragePools(): Promise<StoragePool[]> {
    try {
      const poolNames = await this.apiClient.getStoragePools();
      
      const poolPromises = poolNames.map(async (name: string) => {
        const poolName = name.split('/').pop();
        return this.apiClient.getStoragePoolInfo(poolName!);
      });

      return await Promise.all(poolPromises);
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
      const networkNames = await this.apiClient.getNetworks();
      
      const networkPromises = networkNames.map(async (name: string) => {
        const networkName = name.split('/').pop();
        return this.apiClient.getNetworkInfo(networkName!);
      });

      return await Promise.all(networkPromises);
    } catch (error) {
      console.error('Failed to fetch networks:', error);
      return [];
    }
  }

  private async fetchNetworkStates(networks: NetworkInfo[]): Promise<Map<string, NetworkState>> {
    const stateMap = new Map<string, NetworkState>();

    const statePromises = networks.map(async (network) => {
      try {
        const state = await this.apiClient.getNetworkState(network.name);
        stateMap.set(network.name, state);
      } catch (error) {
        console.error(`Failed to fetch state for network ${network.name}:`, error);
      }
    });

    await Promise.allSettled(statePromises);
    return stateMap;
  }

  private async fetchRecentOperations(): Promise<Operation[]> {
    try {
      const operations = await this.apiClient.getOperations();
      
      return operations
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
    this.config.project = projectName;
  }

  // Get available projects
  async getProjects(): Promise<ProjectInfo[]> {
    return this.fetchProjects();
  }
}