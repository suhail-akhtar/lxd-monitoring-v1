/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Clock,
  Target,
  Gauge,
  RefreshCw,
  Maximize2,
  Settings,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Calendar,
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  PieChart,
  LineChart,
} from 'lucide-react';

const Metrics: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Metrics Dashboard</h1>
        <p className="page-subtitle">
          Advanced analytics, custom metrics, performance trends, and data insights
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Data Points (24h)</div>
            <div className="metric-icon">
              <BarChart3 style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">2.4M</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +15% from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Custom Metrics</div>
            <div className="metric-icon">
              <Target style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">47</div>
          <div className="metric-change positive">
            <Plus style={{ width: '16px', height: '16px' }} />
            3 added this week
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Alerts Triggered</div>
            <div className="metric-icon">
              <Zap style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">8</div>
          <div className="metric-change positive">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            -12 from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Performance Score</div>
            <div className="metric-icon">
              <Gauge style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">94.2</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +2.1 improvement
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Collection Rate</div>
            <div className="metric-icon">
              <Activity style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">99.8%</div>
          <div className="metric-change positive">
            <Target style={{ width: '16px', height: '16px' }} />
            Excellent
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Data Retention</div>
            <div className="metric-icon">
              <Clock style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">90d</div>
          <div className="metric-change neutral">
            <Calendar style={{ width: '16px', height: '16px' }} />
            Historical data
          </div>
        </div>
      </div>

      {/* Main Dashboard Panels */}
      <div className="panel-grid">
        {/* Performance Trends */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <LineChart style={{ width: '16px', height: '16px' }} />
              Performance Trends (7 days)
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
                Performance Trends Chart
                <br />
                <small>CPU, Memory, Storage, Network over time</small>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Utilization Metrics */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <PieChart style={{ width: '16px', height: '16px' }} />
              Resource Utilization
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#e6edf3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Cpu style={{ width: '16px', height: '16px', color: '#58a6ff' }} />
                    CPU Average
                  </span>
                  <span style={{ fontWeight: 'bold' }}>64.2%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill medium" style={{ width: '64.2%' }}></div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#e6edf3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MemoryStick style={{ width: '16px', height: '16px', color: '#3fb950' }} />
                    Memory Average
                  </span>
                  <span style={{ fontWeight: 'bold' }}>58.4%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill medium" style={{ width: '58.4%' }}></div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#e6edf3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HardDrive style={{ width: '16px', height: '16px', color: '#bb8009' }} />
                    Storage Average
                  </span>
                  <span style={{ fontWeight: 'bold' }}>68.1%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill high" style={{ width: '68.1%' }}></div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#e6edf3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Network style={{ width: '16px', height: '16px', color: '#f85149' }} />
                    Network Average
                  </span>
                  <span style={{ fontWeight: 'bold' }}>42.7%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill medium" style={{ width: '42.7%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Metrics */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <Target style={{ width: '16px', height: '16px' }} />
              Custom Metrics
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <Plus style={{ width: '14px', height: '14px' }} />
              </button>
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
                  <th>Metric Name</th>
                  <th>Type</th>
                  <th>Current Value</th>
                  <th>Threshold</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Response Time</strong>
                    <br />
                    <small>API response latency</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(31, 111, 235, 0.15)', color: '#58a6ff', border: '1px solid rgba(31, 111, 235, 0.3)' }}>
                      Latency
                    </span>
                  </td>
                  <td>127ms</td>
                  <td>&lt; 200ms</td>
                  <td>
                    <span className="status-badge status-running">
                      <Activity style={{ width: '12px', height: '12px' }} />
                      Normal
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
                    <strong>Error Rate</strong>
                    <br />
                    <small>Application error percentage</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(248, 81, 73, 0.15)', color: '#f85149', border: '1px solid rgba(248, 81, 73, 0.3)' }}>
                      Error
                    </span>
                  </td>
                  <td>0.8%</td>
                  <td>&lt; 2%</td>
                  <td>
                    <span className="status-badge status-running">
                      <Activity style={{ width: '12px', height: '12px' }} />
                      Normal
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
                    <strong>Throughput</strong>
                    <br />
                    <small>Requests per second</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', border: '1px solid rgba(63, 185, 80, 0.3)' }}>
                      Performance
                    </span>
                  </td>
                  <td>847 req/s</td>
                  <td>&gt; 500 req/s</td>
                  <td>
                    <span className="status-badge status-running">
                      <TrendingUp style={{ width: '12px', height: '12px' }} />
                      Good
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
                    <strong>Cluster Health Score</strong>
                    <br />
                    <small>Overall cluster health</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(187, 128, 9, 0.15)', color: '#bb8009', border: '1px solid rgba(187, 128, 9, 0.3)' }}>
                      Health
                    </span>
                  </td>
                  <td>94.2</td>
                  <td>&gt; 90</td>
                  <td>
                    <span className="status-badge status-running">
                      <Gauge style={{ width: '12px', height: '12px' }} />
                      Excellent
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

        {/* Top Performing Nodes */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Server style={{ width: '16px', height: '16px' }} />
              Node Performance Rankings
            </div>
            <div className="panel-actions">
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#e6edf3', fontWeight: 'bold' }}>lxd-prod-04</span>
                  <br />
                  <small style={{ color: '#3fb950' }}>Score: 97.2</small>
                </div>
                <span style={{ color: '#3fb950', fontSize: '1.5rem', fontWeight: 'bold' }}>#1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#e6edf3', fontWeight: 'bold' }}>lxd-prod-06</span>
                  <br />
                  <small style={{ color: '#58a6ff' }}>Score: 95.8</small>
                </div>
                <span style={{ color: '#58a6ff', fontSize: '1.5rem', fontWeight: 'bold' }}>#2</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#e6edf3', fontWeight: 'bold' }}>lxd-prod-01</span>
                  <br />
                  <small style={{ color: '#bb8009' }}>Score: 93.4</small>
                </div>
                <span style={{ color: '#bb8009', fontSize: '1.5rem', fontWeight: 'bold' }}>#3</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#e6edf3', fontWeight: 'bold' }}>lxd-prod-03</span>
                  <br />
                  <small style={{ color: '#8b949e' }}>Score: 91.7</small>
                </div>
                <span style={{ color: '#8b949e', fontSize: '1.5rem', fontWeight: 'bold' }}>#4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert History */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Zap style={{ width: '16px', height: '16px' }} />
              Recent Alerts
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
                <Target style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Response time threshold exceeded</div>
                <div className="activity-desc">API latency: 245ms (threshold: 200ms)</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <Gauge style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Performance score improved</div>
                <div className="activity-desc">Cluster health: 94.2 (+2.1 improvement)</div>
                <div className="activity-time">6 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-error">
                <TrendingUp style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Error rate spike detected</div>
                <div className="activity-desc">Error rate: 3.2% (threshold: 2%)</div>
                <div className="activity-time">12 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Collection Status */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Activity style={{ width: '16px', height: '16px' }} />
              Data Collection
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>System Metrics</span>
                <span style={{ color: '#3fb950', fontWeight: 'bold' }}>99.8%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Application Metrics</span>
                <span style={{ color: '#3fb950', fontWeight: 'bold' }}>99.2%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Custom Metrics</span>
                <span style={{ color: '#58a6ff', fontWeight: 'bold' }}>98.7%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Network Metrics</span>
                <span style={{ color: '#bb8009', fontWeight: 'bold' }}>97.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;