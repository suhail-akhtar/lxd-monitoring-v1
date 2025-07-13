/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import ResourceTrendsChart from './charts/ResourceTrendsChart';
import InstanceStatusChart from './charts/InstanceStatusChart';
import PerformanceChart from './charts/PerformanceChart';

const API_BASE = '/api/lxd';

const Dashboard: React.FC = () => {
  // Project management
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Chart refresh trigger
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Existing state
  const [totalInstances, setTotalInstances] = useState<any>(null);
  const [clusterHealth, setClusterHealth] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [storage, setStorage] = useState<any>(null);
  const [networks, setNetworks] = useState<any>(null);
  const [setInstanceStatus] = useState<any>(null);
  //const [networkBridges, setNetworkBridges] = useState<any>(null);
  const [clusterNodes, setClusterNodes] = useState<any>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      const result = await response.json();
      
      if (result.success) {
        const projectsData = result.data || [];
        setProjects([
          { name: 'all', description: 'All Projects' },
          ...projectsData.map((p: any) => ({
            name: p.name || p,
            description: p.description || '',
          }))
        ]);
      } else {
        setProjects([
          { name: 'all', description: 'All Projects' },
          { name: 'default', description: 'Default Project' }
        ]);
      }
    } catch (error) {
      setProjects([
        { name: 'all', description: 'All Projects' },
        { name: 'default', description: 'Default Project' }
      ]);
    } finally {
      setProjectsLoading(false);
    }
  };

  const fetchData = async (endpoint: string, key: string, setter: (data: any) => void) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: '' }));
    
    try {
      const response = await fetch(`${API_BASE}${endpoint}`);
      const result = await response.json();
      
      if (result.success) {
        setter(result.data);
      } else {
        setErrors(prev => ({ ...prev, [key]: result.error || 'Failed to fetch data' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, [key]: `Network error: ${error}` }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  // Refresh all dashboard data
  const refreshDashboard = () => {
    fetchData('/dashboard/instances/total', 'totalInstances', setTotalInstances);
    fetchData('/dashboard/cluster/health', 'clusterHealth', setClusterHealth);
    fetchData('/dashboard/resources', 'resources', setResources);
    fetchData('/dashboard/storage/pools', 'storage', setStorage);
    fetchData('/dashboard/networks', 'networks', setNetworks);
    fetchData('/dashboard/instances/status', 'instanceStatus', setInstanceStatus);
    fetchData('/dashboard/cluster/members', 'clusterNodes', setClusterNodes);
    setRefreshTrigger(prev => prev + 1);
  };

  // Initial load
  useEffect(() => {
    fetchProjects();
    refreshDashboard();
  }, []);

  // Refresh when project changes
  useEffect(() => {
    if (!projectsLoading) {
      refreshDashboard();
    }
  }, [selectedProject]);

  // Auto-refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(refreshDashboard, 120000);
    return () => clearInterval(interval);
  }, [selectedProject]);

  const getTrendIcon = (change: string) => {
    if (change.includes('+')) return <TrendingUp style={{ width: '16px', height: '16px' }} />;
    if (change.includes('-')) return <TrendingDown style={{ width: '16px', height: '16px' }} />;
    return <Minus style={{ width: '16px', height: '16px' }} />;
  };

  const getTrendClass = (change: string) => {
    if (change.includes('+') && !change.includes('Peak')) return 'positive';
    if (change.includes('-')) return 'positive';
    if (change.includes('+')) return 'negative';
    return 'neutral';
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'online': case 'active': case 'created': case 'running':
        return '#3fb950';
      case 'warning': case 'stopping': case 'starting':
        return '#bb8009';
      case 'error': case 'offline': case 'stopped':
        return '#f85149';
      default:
        return '#8b949e';
    }
  };

  const getProgressClass = (usage: number) => {
    if (usage >= 80) return 'high';
    if (usage >= 60) return 'medium';
    return 'low';
  };

  return (
    <div className="dashboard-content" id="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Cluster Monitoring Dashboard</h1>
        <p className="page-subtitle">
          Real-time monitoring, performance metrics, and troubleshooting for your MicroCloud LXD infrastructure
        </p>
        
        {/* Project Selector */}
        <div style={{ 
          marginTop: '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Project:</label>
          <select 
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            style={{
              background: 'linear-gradient(135deg, #21262d, #30363d)',
              border: '1px solid #444c56',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: '#e6edf3',
              fontSize: '0.875rem',
              minWidth: '150px'
            }}
            disabled={projectsLoading}
          >
            {projects.map((project) => (
              <option key={project.name} value={project.name}>
                {project.name === 'all' ? 'All Projects' : project.name}
              </option>
            ))}
          </select>
          
          <button 
            onClick={refreshDashboard}
            style={{
              background: 'linear-gradient(135deg, #1f6feb, #388bfd)',
              border: '1px solid #388bfd',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Refresh Dashboard"
          >
            <RefreshCw style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        {/* Total Instances */}
        <div className="metric-card" data-metric="instances">
          <div className="metric-header">
            <div className="metric-title">Total Instances</div>
            <div className="metric-icon">
              <Layers style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">
            {loading.totalInstances ? (
              <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
            ) : errors.totalInstances ? (
              <span style={{ color: '#f85149', fontSize: '1rem' }}>Error</span>
            ) : (
              (totalInstances?.total || 0).toLocaleString()
            )}
          </div>
          <div className={`metric-change ${getTrendClass(totalInstances?.change || '')}`}>
            {getTrendIcon(totalInstances?.change || '')}
            {totalInstances?.change || 'No data'}
          </div>
        </div>

        {/* Cluster Health */}
        <div className="metric-card" data-metric="nodes">
          <div className="metric-header">
            <div className="metric-title">Cluster Health</div>
            <div className="metric-icon">
              <Server style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">
            {loading.clusterHealth ? (
              <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
            ) : errors.clusterHealth ? (
              <span style={{ color: '#f85149', fontSize: '1rem' }}>Error</span>
            ) : (
              `${clusterHealth?.percentage || 0}%`
            )}
          </div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            {clusterHealth?.onlineNodes || 0}/{clusterHealth?.totalNodes || 0} nodes online
          </div>
        </div>

        {/* CPU Utilization */}
        <div className="metric-card" data-metric="cpu">
          <div className="metric-header">
            <div className="metric-title">CPU Utilization</div>
            <div className="metric-icon">
              <Cpu style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">
            {loading.resources ? (
              <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
            ) : errors.resources ? (
              <span style={{ color: '#f85149', fontSize: '1rem' }}>Error</span>
            ) : (
              `${resources?.cpu?.usage || 0}%`
            )}
          </div>
          <div className={`metric-change ${getTrendClass(resources?.cpu?.change || '')}`}>
            {getTrendIcon(resources?.cpu?.change || '')}
            {resources?.cpu?.change || 'No data'}
          </div>
        </div>

        {/* Memory Usage */}
        <div className="metric-card" data-metric="memory">
          <div className="metric-header">
            <div className="metric-title">Memory Usage</div>
            <div className="metric-icon">
              <MemoryStick style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">
            {loading.resources ? (
              <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
            ) : errors.resources ? (
              <span style={{ color: '#f85149', fontSize: '1rem' }}>Error</span>
            ) : (
              `${resources?.memory?.usage || 0}%`
            )}
          </div>
          <div className={`metric-change ${getTrendClass(resources?.memory?.change || '')}`}>
            {getTrendIcon(resources?.memory?.change || '')}
            {resources?.memory?.change || 'No data'}
          </div>
        </div>

        {/* Storage Capacity */}
        <div className="metric-card" data-metric="storage">
          <div className="metric-header">
            <div className="metric-title">Storage Capacity</div>
            <div className="metric-icon">
              <HardDrive style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">
            {loading.storage ? (
              <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
            ) : errors.storage ? (
              <span style={{ color: '#f85149', fontSize: '1rem' }}>Error</span>
            ) : (
              storage?.totalCapacity || '0TB'
            )}
          </div>
          <div className="metric-change neutral">
            <Minus style={{ width: '16px', height: '16px' }} />
            {storage?.pools ? 
              `${storage.pools.length} pools active` : 
              'Loading...'
            }
          </div>
        </div>

        {/* Network Throughput */}
        <div className="metric-card" data-metric="network">
          <div className="metric-header">
            <div className="metric-title">Network Throughput</div>
            <div className="metric-icon">
              <Network style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">
            {loading.networks ? (
              <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
            ) : errors.networks ? (
              <span style={{ color: '#f85149', fontSize: '1rem' }}>Error</span>
            ) : (
              networks?.totalThroughput || '0GB/s'
            )}
          </div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            {networks?.totalUsedBy || 0} connections
          </div>
        </div>
      </div>

      {/* Main Panels */}
      <div className="panel-grid">
        {/* Resource Trends - Now with API data */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <TrendingUp style={{ width: '16px', height: '16px' }} />
              Resource Usage Trends
              <span className="live-indicator">
                <div className="live-dot"></div>
                Live
              </span>
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={() => setRefreshTrigger(prev => prev + 1)}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Maximize2 style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="chart-container">
              <ResourceTrendsChart 
                project={selectedProject} 
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        </div>

        {/* Instance Distribution - Now with API data */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <PieChart style={{ width: '16px', height: '16px' }} />
              Instance Status
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={() => setRefreshTrigger(prev => prev + 1)}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content small">
            <div className="chart-container small">
              <InstanceStatusChart 
                project={selectedProject} 
                refreshTrigger={refreshTrigger}
              />
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
              <button className="panel-btn" onClick={refreshDashboard}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Settings style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            {loading.storage ? (
              <div className="loading">
                <div className="spinner"></div>
                Loading storage pools...
              </div>
            ) : errors.storage ? (
              <div style={{ color: '#f85149', textAlign: 'center', padding: '2rem' }}>
                Error loading storage pools: {errors.storage}
              </div>
            ) : (
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
                  {storage?.pools?.map((pool: any) => (
                    <tr key={pool.name}>
                      <td>
                        <strong>{pool.name}</strong>
                      </td>
                      <td>{pool.driver}</td>
                      <td>{pool.total}TB</td>
                      <td>{pool.used}TB</td>
                      <td>{pool.available}TB</td>
                      <td>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className={`progress-fill ${getProgressClass(pool.usage)}`} 
                              style={{ width: `${pool.usage}%` }}
                            ></div>
                          </div>
                          <div className="progress-text">
                            <span>{pool.usage}%</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${pool.status === 'Created' ? 'status-running' : 'status-error'}`}>
                          <span className="status-dot"></span>
                          {pool.status === 'Created' ? 'Active' : pool.status}
                        </span>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                        No storage pools found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
              <button className="panel-btn" onClick={refreshDashboard}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            {loading.networks ? (
              <div className="loading">
                <div className="spinner"></div>
                Loading networks...
              </div>
            ) : errors.networks ? (
              <div style={{ color: '#f85149', textAlign: 'center', padding: '1rem' }}>
                Error: {errors.networks}
              </div>
            ) : (
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
                  {networks?.networks?.slice(0, 5).map((network: any) => (
                    <tr key={network.name}>
                      <td>
                        <strong>{network.name}</strong>
                        <br />
                        <small>{network.config?.['ipv4.address'] || 'N/A'}</small>
                      </td>
                      <td>{network.type}</td>
                      <td>{network.usedBy}</td>
                      <td>
                        <span className={`status-badge ${network.status === 'Created' ? 'status-running' : 'status-error'}`}>
                          <span className="status-dot"></span>
                          {network.status === 'Created' ? 'Active' : network.status}
                        </span>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>
                        No networks found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
              <button className="panel-btn" onClick={refreshDashboard}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Settings style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            {loading.clusterNodes ? (
              <div className="loading">
                <div className="spinner"></div>
                Loading cluster nodes...
              </div>
            ) : errors.clusterNodes ? (
              <div style={{ color: '#f85149', textAlign: 'center', padding: '2rem' }}>
                Error: {errors.clusterNodes}
              </div>
            ) : clusterNodes && clusterNodes.length > 0 ? (
              <div className="node-grid">
                {clusterNodes.map((node: any) => (
                  <div key={node.name} className="node-card">
                    <div className="node-header">
                      <div className="node-name">{node.name}</div>
                      <div 
                        className="node-status" 
                        style={{ background: getStatusColor(node.status) }}
                      ></div>
                    </div>
                    <div className="node-metrics">
                      <div>Status: {node.status}</div>
                      <div>Arch: {node.architecture}</div>
                      <div>URL: {node.url?.split('//')[1] || 'N/A'}</div>
                      <div>Roles: {node.roles?.join(', ') || 'Member'}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="node-grid">
                  <div className="node-card">
                    <div className="node-header">
                      <div className="node-name">Standalone Node</div>
                      <div className="node-status" style={{ background: '#3fb950' }}></div>
                    </div>
                    <div className="node-metrics">
                      <div>CPU: {resources?.cpu?.usage || 0}%</div>
                      <div>RAM: {resources?.memory?.usage || 0}%</div>
                      <div>Type: Standalone</div>
                      <div>Status: Online</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <ExternalLink style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="activity-item">
              <div className="activity-icon activity-success">
                <Check style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Dashboard refreshed successfully</div>
                <div className="activity-desc">All metrics updated with latest data from LXD API</div>
                <div className="activity-time">Just now</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-info">
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Project filter applied</div>
                <div className="activity-desc">
                  Viewing data for: {selectedProject === 'all' ? 'All Projects' : selectedProject}
                </div>
                <div className="activity-time">Recently</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <Check style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">API connection established</div>
                <div className="activity-desc">Successfully connected to LXD monitoring endpoints</div>
                <div className="activity-time">On load</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics - Now with API data */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Gauge style={{ width: '16px', height: '16px' }} />
              Performance Metrics
            </div>
            <div className="panel-actions">
              <button className="panel-btn" onClick={() => setRefreshTrigger(prev => prev + 1)}>
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="chart-container">
              <PerformanceChart 
                project={selectedProject} 
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;