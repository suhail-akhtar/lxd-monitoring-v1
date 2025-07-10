/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/types/dashboard.ts
export interface InstanceInfo {
  name: string;
  status: string;
  type: string;
  architecture: string;
  profiles: string[];
  stateful: boolean;
  ephemeral: boolean;
  config: Record<string, any>;
  devices: Record<string, any>;
  expanded_config: Record<string, any>;
  expanded_devices: Record<string, any>;
  created_at: string;
  last_used_at: string;
  location: string;
  project: string;
}

export interface InstanceState {
  status: string;
  status_code: number;
  disk: Record<string, any>;
  memory: {
    usage: number;
    usage_peak: number;
    swap_usage: number;
    swap_usage_peak: number;
  };
  network: Record<string, any>;
  pid: number;
  processes: number;
  cpu: {
    usage: number;
  };
}

export interface ClusterMember {
  server_name: string;
  url: string;
  database: boolean;
  status: string;
  message: string;
  roles: string[];
  architecture: string;
  failure_domain?: string;
  description?: string;
  config: Record<string, any>;
  groups?: string[];
}

export interface StoragePool {
  name: string;
  driver: string;
  used_by: string[];
  config: Record<string, any>;
  managed: boolean;
  status: string;
  locations: string[];
}

export interface StoragePoolResources {
  space: {
    used: number;
    total: number;
  };
  inodes: {
    used: number;
    total: number;
  };
}

export interface NetworkInfo {
  name: string;
  type: string;
  managed: boolean;
  status: string;
  locations: string[];
  config: Record<string, any>;
  used_by: string[];
}

export interface NetworkState {
  addresses: Array<{
    family: string;
    address: string;
    netmask: string;
    scope: string;
  }>;
  counters: {
    bytes_received: number;
    bytes_sent: number;
    packets_received: number;
    packets_sent: number;
  };
  hwaddr: string;
  host_name: string;
  mtu: number;
  state: string;
  type: string;
}

export interface Operation {
  id: string;
  class: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: string;
  status_code: number;
  resources: Record<string, any>;
  metadata: Record<string, any>;
  may_cancel: boolean;
  err: string;
  location: string;
}

// Dashboard aggregated data types
export interface DashboardMetrics {
  instances: {
    total: number;
    running: number;
    stopped: number;
    starting: number;
    error: number;
  };
  cluster: {
    totalNodes: number;
    healthyNodes: number;
    healthPercentage: number;
  };
  resources: {
    cpu: {
      totalCores: number;
      usedCores: number;
      utilization: number;
    };
    memory: {
      total: number;
      used: number;
      utilization: number;
    };
    storage: {
      total: number;
      used: number;
      utilization: number;
    };
    network: {
      totalThroughput: number;
      peakThroughput: number;
    };
  };
}

export interface DashboardData {
  metrics: DashboardMetrics;
  instances: InstanceInfo[];
  instanceStates: Map<string, InstanceState>;
  clusterMembers: ClusterMember[];
  storagePools: StoragePool[];
  storageResources: Map<string, StoragePoolResources>;
  networks: NetworkInfo[];
  networkStates: Map<string, NetworkState>;
  recentOperations: Operation[];
}