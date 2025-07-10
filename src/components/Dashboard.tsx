import React from 'react';
import {
  Layers,
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  TrendingUp,
  CheckCircle,
  Minus,
  TrendingDown,
  PieChart,
  Database,
  Wifi,
  Gauge,
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useOverviewMetrics, useInstances, useClusterNodes, useNetworks, useStoragePools } from '../hooks/useDashboardData';
import DashboardCard from './DashboardCard';
import ResourceTrendsChart from './charts/ResourceTrendsChart';
import InstanceStatusChart from './charts/InstanceStatusChart';
import PerformanceChart from './charts/PerformanceChart';

const Dashboard: React.FC = () => {
  const { currentProject } = useProject();
  
  // Individual card data hooks
  const overviewMetrics = useOverviewMetrics(currentProject);
  const instancesData = useInstances(currentProject);
  const clusterData = useClusterNodes();
  const networksData = useNetworks(currentProject);
  const storageData = useStoragePools(currentProject);

  const metrics = overviewMetrics.data || {
    totalInstances: 0,
    runningInstances: 0,
    clusterHealth: "0%",
    cpuUtilization: "0%",
    memoryUsage: "0%",
    storageCapacity: "0TB",
    networkThroughput: "0GB/s",
    activeOperations: 0
  };

  return (
    <div className="dashboard-content" id="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Cluster Monitoring Dashboard</h1>
        <p className="page-subtitle">
          Real-time monitoring, performance metrics, and troubleshooting for your MicroCloud LXD infrastructure
        </p>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card" data-metric="instances">
          <div className="metric-header">
            <div className="metric-title">Total Instances</div>
            <div className="metric-icon">
              <Layers style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.totalInstances.toLocaleString()}</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            {metrics.runningInstances} running
          </div>
        </div>

        <div className="metric-card" data-metric="nodes">
          <div className="metric-header">
            <div className="metric-title">Cluster Health</div>
            <div className="metric-icon">
              <Server style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.clusterHealth}</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            All systems online
          </div>
        </div>

        <div className="metric-card" data-metric="cpu">
          <div className="metric-header">
            <div className="metric-title">CPU Utilization</div>
            <div className="metric-icon">
              <Cpu style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.cpuUtilization}</div>
          <div className="metric-change negative">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            Current load
          </div>
        </div>

        <div className="metric-card" data-metric="memory">
          <div className="metric-header">
            <div className="metric-title">Memory Usage</div>
            <div className="metric-icon">
              <MemoryStick style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.memoryUsage}</div>
          <div className="metric-change positive">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            Available memory
          </div>
        </div>

        <div className="metric-card" data-metric="storage">
          <div className="metric-header">
            <div className="metric-title">Storage Capacity</div>
            <div className="metric-icon">
              <HardDrive style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.storageCapacity}</div>
          <div className="metric-change neutral">
            <Minus style={{ width: '16px', height: '16px' }} />
            Total storage
          </div>
        </div>

        <div className="metric-card" data-metric="network">
          <div className="metric-header">
            <div className="metric-title">Network Throughput</div>
            <div className="metric-icon">
              <Network style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.networkThroughput}</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            Current rate
          </div>
        </div>
      </div>

      {/* Enhanced Main Panels with Individual Refresh */}
      <div className="panel-grid">
        {/* Resource Trends */}
        <DashboardCard
          title="Resource Usage Trends"
          icon={<TrendingUp style={{ width: '16px', height: '16px' }} />}
          loading={overviewMetrics.loading}
          error={overviewMetrics.error}
          lastUpdated={overviewMetrics.lastUpdated}
          onRefresh={overviewMetrics.refresh}
          className="panel-lg"
          liveIndicator={true}
        >
          <div className="chart-container">
            <ResourceTrendsChart />
          </div>
        </DashboardCard>

        {/* Instance Distribution */}
        <DashboardCard
          title="Instance Status"
          icon={<PieChart style={{ width: '16px', height: '16px' }} />}
          loading={instancesData.loading}
          error={instancesData.error}
          lastUpdated={instancesData.lastUpdated}
          onRefresh={instancesData.refresh}
          className="panel-md"
        >
          <div className="chart-container small">
            <InstanceStatusChart />
          </div>
        </DashboardCard>

        {/* Storage Pools */}
        <DashboardCard
          title="Storage Pool Utilization"
          icon={<Database style={{ width: '16px', height: '16px' }} />}
          loading={storageData.loading}
          error={storageData.error}
          lastUpdated={storageData.lastUpdated}
          onRefresh={storageData.refresh}
          className="panel-xl"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Pool Name</th>
                <th>Type</th>
                <th>Total Size</th>
                <th>Used</th>
                <th>Available</th>
                <th>Usage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {storageData.data?.map((pool) => (
                <tr key={pool.name}>
                  <td><strong>{pool.name}</strong></td>
                  <td>{pool.type}</td>
                  <td>{pool.totalSize}</td>
                  <td>{pool.usedSize}</td>
                  <td>{pool.totalSize}</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: `${pool.usage}%` }}></div>
                      </div>
                      <div className="progress-text">
                        <span>{pool.usage}%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>{pool.status}
                    </span>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: '#8b949e' }}>
                    No storage pools found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </DashboardCard>

        {/* Network Overview */}
        <DashboardCard
          title="Network Bridges"
          icon={<Wifi style={{ width: '16px', height: '16px' }} />}
          loading={networksData.loading}
          error={networksData.error}
          lastUpdated={networksData.lastUpdated}
          onRefresh={networksData.refresh}
          className="panel-md"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Bridge</th>
                <th>Type</th>
                <th>Instances</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {networksData.data?.map((network) => (
                <tr key={network.name}>
                  <td>
                    <strong>{network.name}</strong>
                    <br />
                    <small>{network.subnet}</small>
                  </td>
                  <td>{network.type}</td>
                  <td>{network.instances}</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>{network.status}
                    </span>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: '#8b949e' }}>
                    No networks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </DashboardCard>

        {/* Cluster Nodes Health */}
        <DashboardCard
          title="Cluster Nodes Health Monitor"
          icon={<Server style={{ width: '16px', height: '16px' }} />}
          loading={clusterData.loading}
          error={clusterData.error}
          lastUpdated={clusterData.lastUpdated}
          onRefresh={clusterData.refresh}
          className="panel-full"
        >
          <div className="node-grid">
            {clusterData.data?.map((node) => (
              <div key={node.name} className="node-card">
                <div className="node-header">
                  <div className="node-name">{node.name}</div>
                  <div 
                    className="node-status" 
                    style={{ 
                      background: node.status === 'online' ? '#3fb950' : 
                                 node.status === 'high-load' ? '#bb8009' : '#f85149'
                    }}
                  ></div>
                </div>
                <div className="node-metrics">
                  <div>CPU: {node.cpu}%</div>
                  <div>RAM: {node.memory}</div>
                  <div>Disk: {node.storage}</div>
                  <div>Load: {node.load}</div>
                  <div>Uptime: {node.uptime}</div>
                  <div>Instances: {node.instances}</div>
                </div>
              </div>
            )) || (
              <div style={{ textAlign: 'center', color: '#8b949e', gridColumn: '1 / -1' }}>
                No cluster nodes found
              </div>
            )}
          </div>
        </DashboardCard>

        {/* Performance Metrics */}
        <DashboardCard
          title="Performance Metrics"
          icon={<Gauge style={{ width: '16px', height: '16px' }} />}
          loading={clusterData.loading}
          error={clusterData.error}
          lastUpdated={clusterData.lastUpdated}
          onRefresh={clusterData.refresh}
          className="panel-md"
        >
          <div className="chart-container">
            <PerformanceChart />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;