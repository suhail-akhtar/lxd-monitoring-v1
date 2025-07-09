/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  ScrollText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Filter,
  Search,
  Download,
  RefreshCw,
  Maximize2,
  Settings,
  Clock,
  Server,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Eye,
  FileText,
  Calendar,
  Zap,
  Shield,
} from 'lucide-react';

const EventsLogs: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Events & Logs Dashboard</h1>
        <p className="page-subtitle">
          Centralized logging, system events, audit trails, and troubleshooting insights
        </p>
      </div>

      {/* Events Overview Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Events (24h)</div>
            <div className="metric-icon">
              <ScrollText style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">2,847</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +234 from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Error Events</div>
            <div className="metric-icon">
              <XCircle style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">12</div>
          <div className="metric-change positive">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            -8 from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Warning Events</div>
            <div className="metric-icon">
              <AlertTriangle style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">89</div>
          <div className="metric-change negative">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +23 from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Success Rate</div>
            <div className="metric-icon">
              <CheckCircle style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">96.4%</div>
          <div className="metric-change positive">
            <Zap style={{ width: '16px', height: '16px' }} />
            Excellent
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Log Files</div>
            <div className="metric-icon">
              <FileText style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">156</div>
          <div className="metric-change neutral">
            <Activity style={{ width: '16px', height: '16px' }} />
            Active logs
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Security Events</div>
            <div className="metric-icon">
              <Shield style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">3</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            All resolved
          </div>
        </div>
      </div>

      {/* Main Dashboard Panels */}
      <div className="panel-grid">
        {/* Event Timeline */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <BarChart3 style={{ width: '16px', height: '16px' }} />
              Event Timeline (24h)
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
                Event Timeline Chart
                <br />
                <small>Events by severity over time</small>
              </div>
            </div>
          </div>
        </div>

        {/* Event Severity Distribution */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <AlertTriangle style={{ width: '16px', height: '16px' }} />
              Event Severity
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
                <span style={{ color: '#3fb950' }}>Info</span>
                <span style={{ color: '#3fb950', fontWeight: 'bold' }}>2,746</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#bb8009' }}>Warning</span>
                <span style={{ color: '#bb8009', fontWeight: 'bold' }}>89</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#f85149' }}>Error</span>
                <span style={{ color: '#f85149', fontWeight: 'bold' }}>12</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8b949e' }}>Debug</span>
                <span style={{ color: '#8b949e', fontWeight: 'bold' }}>0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events Stream */}
        <div className="panel panel-full">
          <div className="panel-header">
            <div className="panel-title">
              <ScrollText style={{ width: '16px', height: '16px' }} />
              Live Event Stream
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
                  <th>Timestamp</th>
                  <th>Level</th>
                  <th>Source</th>
                  <th>Event</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>2024-01-15 14:23:45</strong>
                    <br />
                    <small>2 minutes ago</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <Info style={{ width: '12px', height: '12px' }} />
                      Info
                    </span>
                  </td>
                  <td>lxd-prod-01</td>
                  <td>instance.started</td>
                  <td>Instance 'web-server-prod-247' started successfully</td>
                  <td>
                    <button className="panel-btn" style={{ padding: '0.25rem' }}>
                      <Eye style={{ width: '12px', height: '12px' }} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>2024-01-15 14:20:12</strong>
                    <br />
                    <small>5 minutes ago</small>
                  </td>
                  <td>
                    <span className="status-badge status-warning">
                      <AlertTriangle style={{ width: '12px', height: '12px' }} />
                      Warning
                    </span>
                  </td>
                  <td>lxd-prod-02</td>
                  <td>resource.high_cpu</td>
                  <td>High CPU usage detected: 89% for 20 minutes</td>
                  <td>
                    <button className="panel-btn" style={{ padding: '0.25rem' }}>
                      <Eye style={{ width: '12px', height: '12px' }} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>2024-01-15 14:18:33</strong>
                    <br />
                    <small>7 minutes ago</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <Info style={{ width: '12px', height: '12px' }} />
                      Info
                    </span>
                  </td>
                  <td>lxd-cluster</td>
                  <td>migration.started</td>
                  <td>Instance migration started: database-prod-main → lxd-prod-05</td>
                  <td>
                    <button className="panel-btn" style={{ padding: '0.25rem' }}>
                      <Eye style={{ width: '12px', height: '12px' }} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>2024-01-15 14:15:07</strong>
                    <br />
                    <small>10 minutes ago</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <CheckCircle style={{ width: '12px', height: '12px' }} />
                      Success
                    </span>
                  </td>
                  <td>lxd-prod-01</td>
                  <td>backup.completed</td>
                  <td>Daily backup completed: 147 instances, 2.4GB</td>
                  <td>
                    <button className="panel-btn" style={{ padding: '0.25rem' }}>
                      <Eye style={{ width: '12px', height: '12px' }} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>2024-01-15 14:12:44</strong>
                    <br />
                    <small>13 minutes ago</small>
                  </td>
                  <td>
                    <span className="status-badge status-error">
                      <XCircle style={{ width: '12px', height: '12px' }} />
                      Error
                    </span>
                  </td>
                  <td>lxd-prod-04</td>
                  <td>instance.start_failed</td>
                  <td>Failed to start 'test-container-84': insufficient memory</td>
                  <td>
                    <button className="panel-btn" style={{ padding: '0.25rem' }}>
                      <Eye style={{ width: '12px', height: '12px' }} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>2024-01-15 14:08:21</strong>
                    <br />
                    <small>17 minutes ago</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <Info style={{ width: '12px', height: '12px' }} />
                      Info
                    </span>
                  </td>
                  <td>lxd-cluster</td>
                  <td>storage.expanded</td>
                  <td>Storage pool 'default-zfs' expanded by 8TB</td>
                  <td>
                    <button className="panel-btn" style={{ padding: '0.25rem' }}>
                      <Eye style={{ width: '12px', height: '12px' }} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>2024-01-15 14:05:15</strong>
                    <br />
                    <small>20 minutes ago</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <Info style={{ width: '12px', height: '12px' }} />
                      Info
                    </span>
                  </td>
                  <td>lxd-prod-03</td>
                  <td>network.bridge_created</td>
                  <td>Network bridge 'br-testing' created successfully</td>
                  <td>
                    <button className="panel-btn" style={{ padding: '0.25rem' }}>
                      <Eye style={{ width: '12px', height: '12px' }} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Log File Status */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <FileText style={{ width: '16px', height: '16px' }} />
              Log Files Status
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
                  <th>Log File</th>
                  <th>Size</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>lxd.log</strong>
                    <br />
                    <small>Main daemon log</small>
                  </td>
                  <td>234MB</td>
                  <td>2 min ago</td>
                </tr>
                <tr>
                  <td>
                    <strong>operations.log</strong>
                    <br />
                    <small>Operation tracking</small>
                  </td>
                  <td>89MB</td>
                  <td>5 min ago</td>
                </tr>
                <tr>
                  <td>
                    <strong>audit.log</strong>
                    <br />
                    <small>Security audit trail</small>
                  </td>
                  <td>45MB</td>
                  <td>1 min ago</td>
                </tr>
                <tr>
                  <td>
                    <strong>network.log</strong>
                    <br />
                    <small>Network events</small>
                  </td>
                  <td>67MB</td>
                  <td>3 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Event Sources */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Server style={{ width: '16px', height: '16px' }} />
              Top Event Sources
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
                <span style={{ color: '#e6edf3' }}>lxd-prod-02</span>
                <span style={{ color: '#3fb950', fontWeight: 'bold' }}>891</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>lxd-prod-01</span>
                <span style={{ color: '#58a6ff', fontWeight: 'bold' }}>567</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>lxd-cluster</span>
                <span style={{ color: '#bb8009', fontWeight: 'bold' }}>432</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>lxd-prod-03</span>
                <span style={{ color: '#8b949e', fontWeight: 'bold' }}>289</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsLogs;