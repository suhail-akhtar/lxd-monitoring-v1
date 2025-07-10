class DataMapper {
  
  // Transform overview data for dashboard
  mapOverviewData(lxdData, isAllProjects = false) {
    const { instances, clusterMembers, networks, storagePools, operations } = lxdData;
    
    return {
      metrics: {
        totalInstances: instances.length,
        runningInstances: this.getRunningInstancesCount(instances),
        clusterHealth: this.calculateClusterHealth(clusterMembers),
        cpuUtilization: this.calculateCpuUtilization(clusterMembers),
        memoryUsage: this.calculateMemoryUsage(clusterMembers),
        storageCapacity: this.calculateStorageCapacity(storagePools),
        networkThroughput: this.calculateNetworkThroughput(networks),
        activeOperations: operations.length,
        projectsCount: isAllProjects ? this.getProjectsCount(lxdData) : 1
      },
      instances: this.mapInstances(instances),
      clusterMembers: this.mapClusterMembers(clusterMembers),
      networks: this.mapNetworks(networks),
      storagePools: this.mapStoragePools(storagePools),
      operations: this.mapOperations(operations)
    };
  }

  // Map instances data with real LXD info
  mapInstances(instances) {
    const instancesArray = Array.isArray(instances) ? instances : [];
    return instancesArray.map(instance => {
      const state = instance.state || {};
      const config = instance.config || {};
      
      return {
        name: instance.name || this.extractNameFromPath(instance),
        status: state.status || 'unknown',
        node: state.location || 'unknown',
        cpu: this.calculateCpuUsage(state),
        memory: this.formatMemoryUsage(state),
        storage: this.formatStorageUsage(state),
        uptime: this.calculateUptime(state),
        project: instance.project || 'default'
      };
    });
  }

  // Calculate real CPU usage percentage
  calculateCpuUsage(state) {
    if (state.cpu && state.cpu.usage) {
      return Math.round((state.cpu.usage / 1000000000) * 100); // Convert nanoseconds to percentage
    }
    return 0;
  }

  // Format memory usage from LXD state
  formatMemoryUsage(state) {
    if (state.memory && state.memory.usage && state.memory.usage_peak) {
      const used = Math.round(state.memory.usage / (1024 * 1024 * 1024)); // Convert to GB
      const total = Math.round(state.memory.usage_peak / (1024 * 1024 * 1024));
      return `${used}GB / ${total}GB`;
    }
    return 'unknown';
  }

  // Format storage usage from LXD state
  formatStorageUsage(state) {
    if (state.disk && Object.keys(state.disk).length > 0) {
      let totalUsed = 0;
      Object.values(state.disk).forEach(disk => {
        if (disk.usage) totalUsed += disk.usage;
      });
      const usedGB = Math.round(totalUsed / (1024 * 1024 * 1024));
      return `${usedGB}GB`;
    }
    return 'unknown';
  }

  // Calculate uptime from LXD state
  calculateUptime(state) {
    if (state.started_at) {
      const startTime = new Date(state.started_at);
      const now = new Date();
      const uptimeMs = now - startTime;
      const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days}d ${hours}h`;
    }
    return 'unknown';
  }

  // Map cluster members  
  mapClusterMembers(members) {
    const membersArray = Array.isArray(members) ? members : [];
    return membersArray.map(member => ({
      name: this.extractNameFromPath(member),
      status: 'online',
      cpu: 0,
      memory: '0GB / 0GB',
      storage: '0GB / 0GB',
      load: '0.00',
      uptime: '0d 0h', 
      instances: 0,
      ip: 'unknown'
    }));
  }

  // Map networks
  mapNetworks(networks) {
    const networksArray = Array.isArray(networks) ? networks : [];
    return networksArray.map(network => ({
      name: this.extractNameFromPath(network),
      type: 'unknown',
      subnet: 'unknown',
      instances: 0,
      rxTraffic: '0GB/s',
      txTraffic: '0GB/s',
      status: 'active'
    }));
  }

  // Map storage pools
  mapStoragePools(pools) {
    const poolsArray = Array.isArray(pools) ? pools : [];
    return poolsArray.map(pool => ({
      name: this.extractNameFromPath(pool),
      type: 'unknown',
      totalSize: '0TB',
      usedSize: '0TB', 
      usage: 0,
      readIO: '0 MB/s',
      writeIO: '0 MB/s',
      status: 'active'
    }));
  }

  // Map operations
  mapOperations(operations) {
    const operationsArray = Array.isArray(operations) ? operations : [];
    return operationsArray.map(op => ({
      id: this.extractNameFromPath(op),
      type: 'unknown',
      status: 'running',
      progress: 0,
      duration: '0m 0s',
      target: 'unknown'
    }));
  }

  // Utility methods for real calculations
  getRunningInstancesCount(instances) {
    return instances.filter(instance => 
      instance.state && instance.state.status === 'Running'
    ).length;
  }

  calculateClusterHealth(members) {
    const membersArray = Array.isArray(members) ? members : [];
    if (membersArray.length === 0) return "0%";
    
    const onlineMembers = membersArray.filter(member => 
      member.status === 'Online' || member.state === 'ONLINE'
    ).length;
    
    const healthPercentage = (onlineMembers / membersArray.length * 100).toFixed(1);
    return `${healthPercentage}%`;
  }

  calculateCpuUtilization(members) {
    const membersArray = Array.isArray(members) ? members : [];
    if (membersArray.length === 0) return "0%";
    
    // This would need real CPU data from cluster members
    // For now, return calculated based on instance load
    return "unknown";
  }

  calculateMemoryUsage(members) {
    const membersArray = Array.isArray(members) ? members : [];
    if (membersArray.length === 0) return "0%";
    
    // This would need real memory data from cluster members
    return "unknown";
  }

  calculateStorageCapacity(pools) {
    const poolsArray = Array.isArray(pools) ? pools : [];
    if (poolsArray.length === 0) return "0TB";
    
    // This would need real storage pool data
    return "unknown";
  }

  calculateNetworkThroughput(networks) {
    const networksArray = Array.isArray(networks) ? networks : [];
    if (networksArray.length === 0) return "0GB/s";
    
    // This would need real network statistics
    return "unknown";
  }

  // Helper methods
  extractNameFromPath(pathOrObject) {
    if (typeof pathOrObject === 'string') {
      // Remove query parameters and extract name
      const cleanPath = pathOrObject.split('?')[0];
      return cleanPath.split('/').pop();
    }
    if (pathOrObject && typeof pathOrObject === 'object') {
      return pathOrObject.name || pathOrObject.id || `item-${Math.random().toString(36).substr(2, 9)}`;
    }
    return `item-${Math.random().toString(36).substr(2, 9)}`;
  }

  getProjectsCount(lxdData) {
    if (lxdData.projects) {
      return lxdData.projects.length;
    }
    return 1; // default fallback
  }
}


export default new DataMapper();