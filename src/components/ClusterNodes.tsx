/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Maximize2,
  Settings,
  CheckCircle,
  AlertTriangle,
  Activity,
  Clock,
  BarChart3,
  Eye,
  Terminal,
} from 'lucide-react';

const ClusterNodes: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Cluster Nodes Dashboard</h1>
        <p className="page-subtitle">
          Complete visibility into cluster health, node performance, and resource distribution
        </p>
      </div>

      {/* Cluster Overview Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Nodes</div>
            <div className="metric-icon">
              <Server style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">6</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            All online
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total CPU Cores</div>
            <div className="metric-icon">
              <Cpu style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">192</div>
          <div className="metric-change neutral">
            <Activity style={{ width: '16px', height: '16px' }} />
            64% utilized
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Memory</div>
            <div className="metric-icon">
              <MemoryStick style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">1.5TB</div>
          <div className="metric-change positive">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            58% used
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Storage</div>
            <div className="metric-icon">
              <HardDrive style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">32TB</div>
          <div className="metric-change negative">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            68% used
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Network Traffic</div>
            <div className="metric-icon">
              <Network style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">4.2GB/s</div>
          <div className="metric-change positive">
            <Activity style={{ width: '16px', height: '16px' }} />
            Peak: 8.9GB/s
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Cluster Health</div>
            <div className="metric-icon">
              <Zap style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">98.7%</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            Excellent
          </div>
        </div>
      </div>

      {/* Main Dashboard Panels */}
      <div className="panel-grid">
        {/* Cluster Resource Distribution */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <BarChart3 style={{ width: '16px', height: '16px' }} />
              Cluster Resource Distribution
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8b949e' }}>
                Resource Distribution Chart
                <br />
                <small>CPU, Memory, Storage across nodes</small>
              </div>
            </div>
          </div>
        </div>

        {/* Node Health Status */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <CheckCircle style={{ width: '16px', height: '16px' }} />
              Node Health Status
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '100%' }}>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3fb950' }}>6</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Healthy</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#bb8009' }}>1</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Warning</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b949e' }}>0</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Critical</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f85149' }}>0</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Offline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Node Events */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Clock style={{ width: '16px', height: '16px' }} />
              Recent Node Events
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="activity-item">
              <div className="activity-icon activity-warning">
                <AlertTriangle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">High CPU on lxd-prod-02</div>
                <div className="activity-desc">CPU usage at 89% for 20 minutes</div>
                <div className="activity-time">8 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <CheckCircle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Storage expanded</div>
                <div className="activity-desc">lxd-prod-01 storage +2TB</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-info">
                <Server style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Node maintenance</div>
                <div className="activity-desc">lxd-prod-06 scheduled restart</div>
                <div className="activity-time">6 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Performance Overview */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Activity style={{ width: '16px', height: '16px' }} />
              Performance Overview
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="chart-container">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8b949e' }}>
                Performance Metrics Chart
                <br />
                <small>Load average across nodes</small>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Node Information */}
        <div className="panel panel-full">
          <div className="panel-header">
            <div className="panel-title">
              <Server style={{ width: '16px', height: '16px' }} />
              Node Details & Management
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
          <div className="panel-content large">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Node</th>
                  <th>Status</th>
                  <th>CPU Usage</th>
                  <th>Memory</th>
                  <th>Storage</th>
                  <th>Load Avg</th>
                  <th>Instances</th>
                  <th>Uptime</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>lxd-prod-01</strong>
                    <br />
                    <small>192.168.1.10</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Online
                    </span>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '45%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>45%</span>
                      </div>
                    </div>
                  </td>
                  <td>156GB / 256GB</td>
                  <td>4.2TB / 6TB</td>
                  <td>1.23</td>
                  <td>142</td>
                  <td>47d</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>lxd-prod-02</strong>
                    <br />
                    <small>192.168.1.11</small>
                  </td>
                  <td>
                    <span className="status-badge status-warning">
                      <span className="status-dot"></span>High Load
                    </span>
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
                  <td>198GB / 256GB</td>
                  <td>3.8TB / 6TB</td>
                  <td>3.45</td>
                  <td>198</td>
                  <td>52d</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>lxd-prod-03</strong>
                    <br />
                    <small>192.168.1.12</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Online
                    </span>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '58%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>58%</span>
                      </div>
                    </div>
                  </td>
                  <td>105GB / 256GB</td>
                  <td>4.9TB / 6TB</td>
                  <td>2.01</td>
                  <td>156</td>
                  <td>38d</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>lxd-prod-04</strong>
                    <br />
                    <small>192.168.1.13</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Online
                    </span>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill low" style={{ width: '23%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>23%</span>
                      </div>
                    </div>
                  </td>
                  <td>89GB / 256GB</td>
                  <td>2.1TB / 6TB</td>
                  <td>0.87</td>
                  <td>98</td>
                  <td>61d</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>lxd-prod-05</strong>
                    <br />
                    <small>192.168.1.14</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Online
                    </span>
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
                  <td>133GB / 256GB</td>
                  <td>3.6TB / 6TB</td>
                  <td>2.34</td>
                  <td>174</td>
                  <td>29d</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>lxd-prod-06</strong>
                    <br />
                    <small>192.168.1.15</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Online
                    </span>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill low" style={{ width: '34%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>34%</span>
                      </div>
                    </div>
                  </td>
                  <td>72GB / 256GB</td>
                  <td>2.8TB / 6TB</td>
                  <td>1.12</td>
                  <td>89</td>
                  <td>73d</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Terminal style={{ width: '12px', height: '12px' }} />
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

export default ClusterNodes;