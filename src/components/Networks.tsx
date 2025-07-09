/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Network,
  Wifi,
  Globe,
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
  Edit,
  Shield,
  Router,
  Cable,
  Signal,
} from 'lucide-react';

const Networks: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Networks Dashboard</h1>
        <p className="page-subtitle">
          Complete visibility into network infrastructure, bridges, traffic, and connectivity
        </p>
      </div>

      {/* Network Overview Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Network Bridges</div>
            <div className="metric-icon">
              <Network style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">8</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            All active
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Connected Instances</div>
            <div className="metric-icon">
              <Wifi style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">1,247</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +23 today
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Throughput</div>
            <div className="metric-icon">
              <Zap style={{ width: '20px', height: '20px' }} />
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
            <div className="metric-title">Packets/sec</div>
            <div className="metric-icon">
              <Signal style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">892K</div>
          <div className="metric-change negative">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            -5% from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Network Errors</div>
            <div className="metric-icon">
              <AlertTriangle style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">0.02%</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            Very low
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Active VLANs</div>
            <div className="metric-icon">
              <Router style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">12</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            All configured
          </div>
        </div>
      </div>

      {/* Main Dashboard Panels */}
      <div className="panel-grid">
        {/* Network Traffic Trends */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <BarChart3 style={{ width: '16px', height: '16px' }} />
              Network Traffic Trends (24h)
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
                Network Traffic Chart
                <br />
                <small>Ingress/Egress traffic per bridge</small>
              </div>
            </div>
          </div>
        </div>

        {/* Bridge Status */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Network style={{ width: '16px', height: '16px' }} />
              Bridge Status
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
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3fb950' }}>8</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Active</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b949e' }}>0</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Inactive</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#bb8009' }}>1</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>High Load</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f85149' }}>0</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Errors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Network Consumers */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <Zap style={{ width: '16px', height: '16px' }} />
              Top Network Consumers
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Instance</th>
                  <th>Bridge</th>
                  <th>RX Traffic</th>
                  <th>TX Traffic</th>
                  <th>Bandwidth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>web-server-cluster-01</strong>
                    <br />
                    <small>Load Balancer</small>
                  </td>
                  <td>lxdbr0</td>
                  <td>892 MB/s</td>
                  <td>567 MB/s</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill high" style={{ width: '78%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>78%</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>cache-redis-primary</strong>
                    <br />
                    <small>Cache Server</small>
                  </td>
                  <td>br-external</td>
                  <td>567 MB/s</td>
                  <td>234 MB/s</td>
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
                </tr>
                <tr>
                  <td>
                    <strong>database-prod-main</strong>
                    <br />
                    <small>PostgreSQL</small>
                  </td>
                  <td>ovn-virtual</td>
                  <td>125 MB/s</td>
                  <td>89 MB/s</td>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Network Events */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Clock style={{ width: '16px', height: '16px' }} />
              Network Events
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
                <div className="activity-title">High traffic on lxdbr0</div>
                <div className="activity-desc">Traffic spike: 8.9GB/s for 5 minutes</div>
                <div className="activity-time">12 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <CheckCircle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">New bridge created</div>
                <div className="activity-desc">br-testing configured successfully</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-info">
                <Network style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">VLAN configuration updated</div>
                <div className="activity-desc">VLAN 100 rules modified</div>
                <div className="activity-time">4 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Network Bridge Details */}
        <div className="panel panel-full">
          <div className="panel-header">
            <div className="panel-title">
              <Router style={{ width: '16px', height: '16px' }} />
              Network Bridges & Configuration
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
                  <th>Bridge</th>
                  <th>Type</th>
                  <th>Subnet</th>
                  <th>Instances</th>
                  <th>Traffic (RX/TX)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>lxdbr0</strong>
                    <br />
                    <small>Default NAT bridge</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(31, 111, 235, 0.15)', color: '#58a6ff', border: '1px solid rgba(31, 111, 235, 0.3)' }}>
                      NAT
                    </span>
                  </td>
                  <td>10.0.0.1/24</td>
                  <td>687</td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div>↓ 2.1GB/s</div>
                      <div>↑ 1.8GB/s</div>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Edit style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>br-external</strong>
                    <br />
                    <small>External bridge</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', border: '1px solid rgba(63, 185, 80, 0.3)' }}>
                      Bridge
                    </span>
                  </td>
                  <td>192.168.1.0/24</td>
                  <td>423</td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div>↓ 1.4GB/s</div>
                      <div>↑ 0.9GB/s</div>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Edit style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>ovn-virtual</strong>
                    <br />
                    <small>OVN network</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(187, 128, 9, 0.15)', color: '#bb8009', border: '1px solid rgba(187, 128, 9, 0.3)' }}>
                      OVN
                    </span>
                  </td>
                  <td>172.16.0.0/16</td>
                  <td>137</td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div>↓ 0.7GB/s</div>
                      <div>↑ 0.5GB/s</div>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge status-warning">
                      <span className="status-dot"></span>High Load
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Edit style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>br-management</strong>
                    <br />
                    <small>Management network</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', border: '1px solid rgba(63, 185, 80, 0.3)' }}>
                      Bridge
                    </span>
                  </td>
                  <td>10.1.0.0/24</td>
                  <td>45</td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div>↓ 0.1GB/s</div>
                      <div>↑ 0.1GB/s</div>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Edit style={{ width: '12px', height: '12px' }} />
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

export default Networks;