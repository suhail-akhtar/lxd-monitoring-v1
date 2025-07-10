/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Box,
  Play,
  AlertTriangle,
  Activity,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Clock,
  Server,
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Maximize2,
  Settings,
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
  CheckCircle,
  XCircle,
  Eye,
  Terminal,
  Trash2,
} from 'lucide-react';

const Instances: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Instances Monitoring Dashboard</h1>
        <p className="page-subtitle">
          Complete 360° visibility into all LXD instances - performance, status, resources, and operations
        </p>
      </div>

      {/* Instance Overview Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Instances</div>
            <div className="metric-icon">
              <Box style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">1,247</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +47 this week
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Running Instances</div>
            <div className="metric-icon">
              <Play style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">1,087</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            87.2% uptime
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">CPU Allocation</div>
            <div className="metric-icon">
              <Cpu style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">2,847</div>
          <div className="metric-change neutral">
            <Activity style={{ width: '16px', height: '16px' }} />
            vCPUs allocated
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Memory Usage</div>
            <div className="metric-icon">
              <MemoryStick style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">892GB</div>
          <div className="metric-change positive">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            of 1.2TB allocated
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Storage Usage</div>
            <div className="metric-icon">
              <HardDrive style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">4.7TB</div>
          <div className="metric-change negative">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +340GB this week
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Network Traffic</div>
            <div className="metric-icon">
              <Network style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">12.4GB/h</div>
          <div className="metric-change positive">
            <Activity style={{ width: '16px', height: '16px' }} />
            Average throughput
          </div>
        </div>
      </div>

      {/* Main Dashboard Panels */}
      <div className="panel-grid">
        {/* Instance Status Distribution */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <PieChart style={{ width: '16px', height: '16px' }} />
              Instance Status Distribution
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="chart-container">
              {/* Placeholder for status chart */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3fb950' }}>1,087</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Running</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b949e' }}>134</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Stopped</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#bb8009' }}>23</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Starting</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f85149' }}>3</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Error</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Utilization Trends */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <BarChart3 style={{ width: '16px', height: '16px' }} />
              Instance Resource Utilization (24h)
              <span className="live-indicator">
                <div className="live-dot"></div>
                Live
              </span>
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Maximize2 style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="chart-container">
              {/* Placeholder for resource trends chart */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8b949e' }}>
                Resource Utilization Chart
                <br />
                <small>CPU, Memory, Storage I/O trends over time</small>
              </div>
            </div>
          </div>
        </div>

        {/* Top Resource Consumers */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <Zap style={{ width: '16px', height: '16px' }} />
              Top Resource Consumers
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
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
                  <th>Instance</th>
                  <th>CPU %</th>
                  <th>Memory</th>
                  <th>Disk I/O</th>
                  <th>Network</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>database-prod-main</strong>
                    <br />
                    <small>PostgreSQL Database</small>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill high" style={{ width: '89%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>89%</span>
                      </div>
                    </div>
                  </td>
                  <td>7.2GB / 8GB</td>
                  <td>450 MB/s</td>
                  <td>125 MB/s</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Running
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>web-server-cluster-01</strong>
                    <br />
                    <small>Nginx Load Balancer</small>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill high" style={{ width: '76%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>76%</span>
                      </div>
                    </div>
                  </td>
                  <td>3.8GB / 4GB</td>
                  <td>89 MB/s</td>
                  <td>892 MB/s</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Running
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>cache-redis-primary</strong>
                    <br />
                    <small>Redis Cache Server</small>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '67%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>67%</span>
                      </div>
                    </div>
                  </td>
                  <td>14.2GB / 16GB</td>
                  <td>234 MB/s</td>
                  <td>567 MB/s</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Running
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>analytics-worker-03</strong>
                    <br />
                    <small>Data Processing</small>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '54%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>54%</span>
                      </div>
                    </div>
                  </td>
                  <td>6.1GB / 8GB</td>
                  <td>167 MB/s</td>
                  <td>78 MB/s</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Running
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Instance Operations */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Clock style={{ width: '16px', height: '16px' }} />
              Recent Instance Operations
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="activity-item">
              <div className="activity-icon activity-success">
                <Play style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Instance started successfully</div>
                <div className="activity-desc">web-server-prod-247 started on lxd-prod-03</div>
                <div className="activity-time">2 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-info">
                <Server style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Migration in progress</div>
                <div className="activity-desc">database-prod-main → lxd-prod-05 (78%)</div>
                <div className="activity-time">5 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-warning">
                <AlertTriangle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">High memory usage</div>
                <div className="activity-desc">cache-redis-primary using 95% memory</div>
                <div className="activity-time">12 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <CheckCircle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Snapshot created</div>
                <div className="activity-desc">Backup snapshot for web-cluster-01</div>
                <div className="activity-time">18 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-error">
                <XCircle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Instance failed to start</div>
                <div className="activity-desc">test-container-84: insufficient resources</div>
                <div className="activity-time">25 minutes ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Instance List */}
        <div className="panel panel-full">
          <div className="panel-header">
            <div className="panel-title">
              <Box style={{ width: '16px', height: '16px' }} />
              Instance Management Console
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <Search style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Filter style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Download style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content large">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Instance Name</th>
                  <th>Status</th>
                  <th>Node</th>
                  <th>CPU</th>
                  <th>Memory</th>
                  <th>Storage</th>
                  <th>Uptime</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>database-prod-main</strong>
                    <br />
                    <small>PostgreSQL 14.2 • Production</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Running
                    </span>
                  </td>
                  <td>lxd-prod-02</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>4 vCPU</span>
                      <div className="progress-container" style={{ width: '60px', margin: 0 }}>
                        <div className="progress-bar">
                          <div className="progress-fill high" style={{ width: '89%' }}></div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>89%</span>
                    </div>
                  </td>
                  <td>7.2GB / 8GB</td>
                  <td>145GB / 200GB</td>
                  <td>47d 3h</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>web-server-cluster-01</strong>
                    <br />
                    <small>Nginx 1.22 • Load Balancer</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Running
                    </span>
                  </td>
                  <td>lxd-prod-01</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>2 vCPU</span>
                      <div className="progress-container" style={{ width: '60px', margin: 0 }}>
                        <div className="progress-bar">
                          <div className="progress-fill high" style={{ width: '76%' }}></div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>76%</span>
                    </div>
                  </td>
                  <td>3.8GB / 4GB</td>
                  <td>89GB / 100GB</td>
                  <td>52d 7h</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>cache-redis-primary</strong>
                    <br />
                    <small>Redis 7.0 • Cache Server</small>
                  </td>
                  <td>
                    <span className="status-badge status-warning">
                      <span className="status-dot"></span>High Load
                    </span>
                  </td>
                  <td>lxd-prod-03</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>8 vCPU</span>
                      <div className="progress-container" style={{ width: '60px', margin: 0 }}>
                        <div className="progress-bar">
                          <div className="progress-fill medium" style={{ width: '67%' }}></div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>67%</span>
                    </div>
                  </td>
                  <td>14.2GB / 16GB</td>
                  <td>234GB / 500GB</td>
                  <td>38d 12h</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>analytics-worker-03</strong>
                    <br />
                    <small>Ubuntu 22.04 • Processing</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Running
                    </span>
                  </td>
                  <td>lxd-prod-04</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>6 vCPU</span>
                      <div className="progress-container" style={{ width: '60px', margin: 0 }}>
                        <div className="progress-bar">
                          <div className="progress-fill medium" style={{ width: '54%' }}></div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>54%</span>
                    </div>
                  </td>
                  <td>6.1GB / 8GB</td>
                  <td>167GB / 300GB</td>
                  <td>29d 18h</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>test-environment-12</strong>
                    <br />
                    <small>Alpine Linux • Testing</small>
                  </td>
                  <td>
                    <span className="status-badge status-stopped">
                      <span className="status-dot"></span>Stopped
                    </span>
                  </td>
                  <td>lxd-prod-05</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>1 vCPU</span>
                      <div className="progress-container" style={{ width: '60px', margin: 0 }}>
                        <div className="progress-bar">
                          <div className="progress-fill low" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>0%</span>
                    </div>
                  </td>
                  <td>0GB / 2GB</td>
                  <td>45GB / 50GB</td>
                  <td>-</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Play style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Trash2 style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instances;