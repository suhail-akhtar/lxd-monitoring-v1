/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface OverviewMetrics {
  totalInstances: number;
  runningInstances: number;
  clusterHealth: string;
  cpuUtilization: string;
  memoryUsage: string;
  storageCapacity: string;
  networkThroughput: string;
  activeOperations: number;
  projectsCount: number;
}

interface Instance {
  name: string;
  status: string;
  node: string;
  cpu: number;
  memory: string;
  storage: string;
  uptime: string;
  project: string;
}

interface ClusterNode {
  name: string;
  status: string;
  cpu: number;
  memory: string;
  storage: string;
  load: string;
  uptime: string;
  instances: number;
  ip: string;
}

interface Network {
  name: string;
  type: string;
  subnet: string;
  instances: number;
  rxTraffic: string;
  txTraffic: string;
  status: string;
}

interface StoragePool {
  name: string;
  type: string;
  totalSize: string;
  usedSize: string;
  usage: number;
  readIO: string;
  writeIO: string;
  status: string;
}

interface Operation {
  id: string;
  type: string;
  status: string;
  progress: number;
  duration: string;
  target: string;
}

interface Project {
  name: string;
  path: string;
}

class ApiService {
  private baseUrl = '/api';

  private async request<T>(endpoint: string, project?: string): Promise<ApiResponse<T>> {
    try {
      const url = project 
        ? `${this.baseUrl}${endpoint}?project=${encodeURIComponent(project)}`
        : `${this.baseUrl}${endpoint}`;
        
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Overview data
  async getOverview(project: string = 'default'): Promise<ApiResponse<{
    metrics: OverviewMetrics;
    instances: Instance[];
    clusterMembers: ClusterNode[];
    networks: Network[];
    storagePools: StoragePool[];
    operations: Operation[];
  }>> {
    return this.request('/overview', project);
  }

  // Individual endpoints for dashboard cards
  async getInstances(project: string = 'default'): Promise<ApiResponse<Instance[]>> {
    return this.request('/instances', project);
  }

  async getClusterNodes(): Promise<ApiResponse<ClusterNode[]>> {
    return this.request('/cluster-nodes');
  }

  async getNetworks(project: string = 'default'): Promise<ApiResponse<Network[]>> {
    return this.request('/networks', project);
  }

  async getStorage(project: string = 'default'): Promise<ApiResponse<StoragePool[]>> {
    return this.request('/storage', project);
  }

  async getOperations(project: string = 'default'): Promise<ApiResponse<Operation[]>> {
    return this.request('/operations', project);
  }

  async getEvents(project: string = 'default'): Promise<ApiResponse<any[]>> {
    return this.request('/events', project);
  }

  async getProjects(): Promise<ApiResponse<Project[]>> {
    return this.request('/projects-list');
  }

  // Test endpoint
  async test(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    return this.request('/test');
  }
}

export const apiService = new ApiService();
export type { 
  OverviewMetrics, 
  Instance, 
  ClusterNode, 
  Network, 
  StoragePool, 
  Operation, 
  Project 
};