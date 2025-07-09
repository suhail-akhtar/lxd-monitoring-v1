/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Dashboard.tsx - Fully Functional with Real Data
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
  Clock,
  Gauge,
  RefreshCw,
  Maximize2,
  Settings,
  ExternalLink,
  Check,
  ArrowRight,
  AlertTriangle,
  X,
  Activity,
} from 'lucide-react';
import ResourceTrendsChart from './charts/ResourceTrendsChart';
import InstanceStatusChart from './charts/InstanceStatusChart';
import PerformanceChart from './charts/PerformanceChart';
import DebugPanel from './DebugPanel';
import { useDashboard } from '../hooks/useDashboard';
import { useApiHealth } from '../hooks/useApiHealth';
import { useChartData } from '../hooks/useChartData';
import { useProject } from '../hooks/useProject';

// Helper functions to format data
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const formatThroughput = (bytesPerSecond: number): string => {
  return formatBytes(bytesPerSecond) + '/s';
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
};

const Dashboard: React.FC = () => {
  const { currentProject, projects } = useProject();
  const { data, loading, error, lastUpdated, refresh } = useDashboard({
    autoRefresh: true,
    refreshInterval: 30000,
    includeStates: true,
  });

  const { isHealthy, checking } = useApiHealth();
  const { instanceStatusData, resourceTrendsData, performanceData } = useChartData(data);

  // Show debug panel in development
  const showDebug = false; //process.env.NODE_ENV === 'development';
  
  // Loading state
  if (loading && !data) {
    return (
      <div className="dashboard-content" id="dashboard-content">
        {showDebug && <DebugPanel />}
        <div className="page-header">
          <h1 className="page-title">Cluster Monitoring Dashboard</h1>
          <p className="page-subtitle">Loading MicroCloud LXD infrastructure data...</p>
        </div>
        <div className="loading">
          <div className="spinner"></div>
          <p>Connecting to LXD API...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !data) {
    return (
      <div className="dashboard-content" id="dashboard-content">
        {showDebug && <DebugPanel />}
        <div className="page-header">
          <h1 className="page-title">Cluster Monitoring Dashboard</h1>
          <p className="page-subtitle">Unable to connect to MicroCloud LXD infrastructure</p>
        </div>
        <div className="panel panel-full">
          <div className="panel-header">
            <div className="panel-title">
              <X style={{ width: '16px', height: '16px' }} />
              Connection Error
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={refresh}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
                Retry
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div style={{ color: '#f85149', padding: '2rem', textAlign: 'center' }}>
              <AlertTriangle style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
              <h3>Failed to Connect to LXD API</h3>
              <p style={{ color: '#8b949e', marginTop: '0.5rem' }}>{error}</p>
              <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#8b949e' }}>
                <p>Please ensure:</p>
                <ul style={{ textAlign: 'left', marginTop: '0.5rem' }}>
                  <li>LXD API is running on https://172.21.200.18:8443</li>
                  <li>Client certificates are properly configured</li>
                  <li>Network connectivity is available</li>
                  <li>CORS policy allows browser connections (or use a proxy)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { metrics, instances, clusterMembers, storagePools, storageResources, networks, recentOperations } = data;

  // Get current project info
  const currentProjectInfo = projects.find(p => p.name === currentProject);

  return (
    <div className="dashboard-content" id="dashboard-content">
      {showDebug && <DebugPanel />}
      
      <div className="page-header">
        <h1 className="page-title">Cluster Monitoring Dashboard</h1>
        <p className="page-subtitle">
          Real-time monitoring, performance metrics, and troubleshooting for your MicroCloud LXD infrastructure
          <br />
          <span style={{ fontSize: '0.9rem', color: '#58a6ff' }}>
            Project: {currentProject || 'All Projects'} 
            {currentProjectInfo && currentProjectInfo.description && ` (${currentProjectInfo.description})`} • 
            {data?.clusterMembers?.length || 0} Cluster Nodes • 
            {data?.instances?.length || 0} Total Instances
          </span>
          {lastUpdated && (
            <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.875rem', color: '#8b949e' }}>
              Last updated: {getTimeAgo(lastUpdated)}
              {!isHealthy && (
                <span style={{ color: '#f85149', marginLeft: '0.5rem' }}>
                  • API Connection Issues
                </span>
              )}
            </span>
          )}
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
          <div className="metric-value">{metrics.instances.total.toLocaleString()}</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            {metrics.instances.running} running
          </div>
        </div>

        <div className="metric-card" data-metric="nodes">
          <div className="metric-header">
            <div className="metric-title">Cluster Health</div>
            <div className="metric-icon">
              <Server style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.cluster.healthPercentage}%</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            {metrics.cluster.healthyNodes}/{metrics.cluster.totalNodes} nodes online
          </div>
        </div>

        <div className="metric-card" data-metric="cpu">
          <div className="metric-header">
            <div className="metric-title">CPU Utilization</div>
            <div className="metric-icon">
              <Cpu style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.resources.cpu.utilization}%</div>
          <div className="metric-change neutral">
            <Activity style={{ width: '16px', height: '16px' }} />
            {metrics.resources.cpu.totalCores} total cores
          </div>
        </div>

        <div className="metric-card" data-metric="memory">
          <div className="metric-header">
            <div className="metric-title">Memory Usage</div>
            <div className="metric-icon">
              <MemoryStick style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{metrics.resources.memory.utilization}%</div>
          <div className="metric-change neutral">
            <Activity style={{ width: '16px', height: '16px' }} />
            {formatBytes(metrics.resources.memory.used)} used
          </div>
        </div>

        <div className="metric-card" data-metric="storage">
          <div className="metric-header">
            <div className="metric-title">Storage Capacity</div>
            <div className="metric-icon">
              <HardDrive style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{formatBytes(metrics.resources.storage.used)}</div>
          <div className="metric-change neutral">
            <Minus style={{ width: '16px', height: '16px' }} />
            of {formatBytes(metrics.resources.storage.total)} ({metrics.resources.storage.utilization}%)
          </div>
        </div>

        <div className="metric-card" data-metric="network">
          <div className="metric-header">
            <div className="metric-title">Network Throughput</div>
            <div className="metric-icon">
              <Network style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">{formatThroughput(metrics.resources.network.totalThroughput)}</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            Peak: {formatThroughput(metrics.resources.network.peakThroughput)}
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      {/* I'll include the key panels but truncate for brevity */}
      
      <div className="panel-grid">
        {/* Resource Trends */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <TrendingUp style={{ width: '16px', height: '16px' }} />
              Resource Usage Trends
              {loading && (
                <span className="live-indicator">
                  <div className="live-dot"></div>
                  Updating...
                </span>
              )}
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={refresh} disabled={loading}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Maximize2 style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="chart-container">
              <ResourceTrendsChart data={resourceTrendsData} loading={loading} />
            </div>
          </div>
        </div>

        {/* Instance Distribution */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <PieChart style={{ width: '16px', height: '16px' }} />
              Instance Status
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={refresh} disabled={loading}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content small">
            <div className="chart-container small">
              <InstanceStatusChart data={instanceStatusData} loading={loading} />
            </div>
          </div>
        </div>

        {/* Storage Pools */}
        <div className="panel panel-xl">
          <div className="panel-header">
            <div className="panel-title">
              <Database style={{ width: '16px', height: '16px' }} />
              Storage Pool Utilization
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={refresh} disabled={loading}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Settings style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
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
                {storagePools.map((pool) => {
                  const resources = storageResources.get(pool.name);
                  const total = resources?.space?.total || 0;
                  const used = resources?.space?.used || 0;
                  const available = total - used;
                  const usage = total > 0 ? Math.round((used / total) * 100) : 0;

                  return (
                    <tr key={pool.name}>
                      <td>
                        <strong>{pool.name}</strong>
                      </td>
                      <td>{pool.driver?.toUpperCase() || 'Unknown'}</td>
                      <td>{formatBytes(total)}</td>
                      <td>{formatBytes(used)}</td>
                      <td>{formatBytes(available)}</td>
                      <td>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className={`progress-fill ${usage > 80 ? 'high' : usage > 60 ? 'medium' : 'low'}`} 
                              style={{ width: `${usage}%` }}
                            ></div>
                          </div>
                          <div className="progress-text">
                            <span>{usage}%</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${pool.status === 'Created' ? 'status-running' : 'status-warning'}`}>
                          <span className="status-dot"></span>
                          {pool.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {storagePools.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: '#8b949e' }}>
                      No storage pools found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Network Overview */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Wifi style={{ width: '16px', height: '16px' }} />
              Network Bridges
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={refresh} disabled={loading}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
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
                {networks.map((network) => (
                  <tr key={network.name}>
                    <td>
                      <strong>{network.name}</strong>
                      <br />
                      <small>{network.config?.['ipv4.address'] || 'No IP configured'}</small>
                    </td>
                    <td>{network.type?.toUpperCase() || 'Bridge'}</td>
                    <td>{network.used_by?.length || 0}</td>
                    <td>
                      <span className={`status-badge ${network.status === 'Created' ? 'status-running' : 'status-warning'}`}>
                        <span className="status-dot"></span>
                        {network.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
                {networks.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: '#8b949e' }}>
                      No networks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cluster Nodes Health */}
        <div className="panel panel-full">
          <div className="panel-header">
            <div className="panel-title">
              <Server style={{ width: '16px', height: '16px' }} />
              Cluster Nodes Health Monitor
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={refresh} disabled={loading}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Settings style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="node-grid">
              {clusterMembers.map((member) => (
                <div key={member.server_name} className="node-card">
                  <div className="node-header">
                    <div className="node-name">{member.server_name}</div>
                    <div 
                      className="node-status" 
                      style={{ 
                        background: member.status === 'Online' ? '#3fb950' : 
                                   member.status === 'Offline' ? '#f85149' : '#bb8009' 
                      }}
                    ></div>
                  </div>
                  <div className="node-metrics">
                    <div>Status: {member.status}</div>
                    <div>Arch: {member.architecture}</div>
                    <div>Roles: {member.roles?.join(', ') || 'Member'}</div>
                    <div>Database: {member.database ? 'Yes' : 'No'}</div>
                    <div>URL: {member.url}</div>
                    <div>Message: {member.message || 'OK'}</div>
                  </div>
                </div>
              ))}
              {clusterMembers.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#8b949e', padding: '2rem' }}>
                  No cluster members found or not in cluster mode
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Operations */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <Clock style={{ width: '16px', height: '16px' }} />
              Recent Operations & Events
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={refresh} disabled={loading}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <ExternalLink style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            {recentOperations.map((operation) => (
              <div key={operation.id} className="activity-item">
                <div className={`activity-icon ${
                  operation.status === 'Success' ? 'activity-success' :
                  operation.status === 'Running' ? 'activity-info' :
                  operation.status === 'Failed' ? 'activity-error' : 'activity-warning'
                }`}>
                  {operation.status === 'Success' ? <Check style={{ width: '18px', height: '18px' }} /> :
                   operation.status === 'Running' ? <ArrowRight style={{ width: '18px', height: '18px' }} /> :
                   operation.status === 'Failed' ? <X style={{ width: '18px', height: '18px' }} /> :
                   <AlertTriangle style={{ width: '18px', height: '18px' }} />}
                </div>
                <div className="activity-content">
                  <div className="activity-title">{operation.description || operation.class}</div>
                  <div className="activity-desc">
                    Operation ID: {operation.id} • Status: {operation.status}
                    {operation.err && ` • Error: ${operation.err}`}
                  </div>
                  <div className="activity-time">{getTimeAgo(new Date(operation.created_at))}</div>
                </div>
              </div>
            ))}
            {recentOperations.length === 0 && (
              <div style={{ textAlign: 'center', color: '#8b949e', padding: '2rem' }}>
                No recent operations found
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Gauge style={{ width: '16px', height: '16px' }} />
              Performance Metrics
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={refresh} disabled={loading}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="chart-container">
              <PerformanceChart data={performanceData} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;