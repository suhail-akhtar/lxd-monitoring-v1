/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Activity,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Maximize2,
  Settings,
  Server,
  BarChart3,
  Eye,
  StopCircle,
  RotateCcw,
  Download,
  Upload,
  Copy,
  Trash2,
  Calendar,
  Timer,
} from 'lucide-react';

const Operations: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Operations Dashboard</h1>
        <p className="page-subtitle">
          Monitor and manage all LXD operations, background tasks, and administrative workflows
        </p>
      </div>

      {/* Operations Overview Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Active Operations</div>
            <div className="metric-icon">
              <Activity style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">23</div>
          <div className="metric-change positive">
            <Play style={{ width: '16px', height: '16px' }} />
            8 running now
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Completed Today</div>
            <div className="metric-icon">
              <CheckCircle style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">157</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +12% from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Failed Operations</div>
            <div className="metric-icon">
              <XCircle style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">3</div>
          <div className="metric-change positive">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            -2 from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Success Rate</div>
            <div className="metric-icon">
              <Zap style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">98.1%</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            Excellent
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Queued Tasks</div>
            <div className="metric-icon">
              <Clock style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">7</div>
          <div className="metric-change neutral">
            <Timer style={{ width: '16px', height: '16px' }} />
            Waiting execution
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Avg Duration</div>
            <div className="metric-icon">
              <BarChart3 style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">2.4m</div>
          <div className="metric-change positive">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            -15% faster
          </div>
        </div>
      </div>

      {/* Main Dashboard Panels */}
      <div className="panel-grid">
        {/* Active Operations */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <Play style={{ width: '16px', height: '16px' }} />
              Active Operations
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
            <table className="data-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Type</th>
                  <th>Target</th>
                  <th>Progress</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Instance Migration</strong>
                    <br />
                    <small>database-prod-main</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(31, 111, 235, 0.15)', color: '#58a6ff', border: '1px solid rgba(31, 111, 235, 0.3)' }}>
                      Migration
                    </span>
                  </td>
                  <td>lxd-prod-02 → lxd-prod-05</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '68%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>68%</span>
                      </div>
                    </div>
                  </td>
                  <td>8m 34s</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <StopCircle style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Backup Creation</strong>
                    <br />
                    <small>production-backup-daily</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', border: '1px solid rgba(63, 185, 80, 0.3)' }}>
                      Backup
                    </span>
                  </td>
                  <td>147 instances</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '23%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>23%</span>
                      </div>
                    </div>
                  </td>
                  <td>12m 18s</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Pause style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Image Download</strong>
                    <br />
                    <small>ubuntu/22.04/cloud</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(187, 128, 9, 0.15)', color: '#bb8009', border: '1px solid rgba(187, 128, 9, 0.3)' }}>
                      Download
                    </span>
                  </td>
                  <td>images.linuxcontainers.org</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill high" style={{ width: '91%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>91%</span>
                      </div>
                    </div>
                  </td>
                  <td>3m 45s</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <StopCircle style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Operation Types */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <BarChart3 style={{ width: '16px', height: '16px' }} />
              Operation Types (24h)
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
                <span style={{ color: '#e6edf3' }}>Instance Start/Stop</span>
                <span style={{ color: '#3fb950', fontWeight: 'bold' }}>89</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Migrations</span>
                <span style={{ color: '#58a6ff', fontWeight: 'bold' }}>23</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Backups</span>
                <span style={{ color: '#bb8009', fontWeight: 'bold' }}>34</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Image Operations</span>
                <span style={{ color: '#8b949e', fontWeight: 'bold' }}>12</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Storage Operations</span>
                <span style={{ color: '#f85149', fontWeight: 'bold' }}>6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Operations */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <Calendar style={{ width: '16px', height: '16px' }} />
              Scheduled Operations
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
                  <th>Schedule</th>
                  <th>Operation</th>
                  <th>Target</th>
                  <th>Next Run</th>
                  <th>Last Result</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Daily Backup</strong>
                    <br />
                    <small>Every day at 02:00</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', border: '1px solid rgba(63, 185, 80, 0.3)' }}>
                      Backup
                    </span>
                  </td>
                  <td>Production instances</td>
                  <td>Tomorrow 02:00</td>
                  <td>
                    <span className="status-badge status-running">
                      <CheckCircle style={{ width: '12px', height: '12px' }} />
                      Success
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Weekly Cleanup</strong>
                    <br />
                    <small>Every Sunday at 03:00</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(139, 148, 158, 0.15)', color: '#8b949e', border: '1px solid rgba(139, 148, 158, 0.3)' }}>
                      Cleanup
                    </span>
                  </td>
                  <td>Unused images & logs</td>
                  <td>Sunday 03:00</td>
                  <td>
                    <span className="status-badge status-running">
                      <CheckCircle style={{ width: '12px', height: '12px' }} />
                      Success
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Health Check</strong>
                    <br />
                    <small>Every hour</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(31, 111, 235, 0.15)', color: '#58a6ff', border: '1px solid rgba(31, 111, 235, 0.3)' }}>
                      Monitor
                    </span>
                  </td>
                  <td>All nodes</td>
                  <td>In 34 minutes</td>
                  <td>
                    <span className="status-badge status-running">
                      <CheckCircle style={{ width: '12px', height: '12px' }} />
                      Success
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Operation History */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Clock style={{ width: '16px', height: '16px' }} />
              Recent Operations
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
                <CheckCircle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Instance deployment completed</div>
                <div className="activity-desc">web-server-prod-247 deployed successfully</div>
                <div className="activity-time">3 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <CheckCircle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Backup completed</div>
                <div className="activity-desc">Daily backup: 147 instances, 2.4GB</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-error">
                <XCircle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Migration failed</div>
                <div className="activity-desc">test-container-84: insufficient resources</div>
                <div className="activity-time">4 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <CheckCircle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Image download completed</div>
                <div className="activity-desc">Ubuntu 22.04 LTS downloaded</div>
                <div className="activity-time">6 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Zap style={{ width: '16px', height: '16px' }} />
              Quick Operations
            </div>
          </div>
          <div className="panel-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem' }}>
              <button className="panel-btn" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
                <Copy style={{ width: '20px', height: '20px' }} />
                <span>Clone Instance</span>
              </button>
              <button className="panel-btn" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
                <Download style={{ width: '20px', height: '20px' }} />
                <span>Import Image</span>
              </button>
              <button className="panel-btn" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
                <Upload style={{ width: '20px', height: '20px' }} />
                <span>Export Backup</span>
              </button>
              <button className="panel-btn" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
                <RotateCcw style={{ width: '20px', height: '20px' }} />
                <span>Restore Instance</span>
              </button>
              <button className="panel-btn" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
                <Server style={{ width: '20px', height: '20px' }} />
                <span>Migrate Instance</span>
              </button>
              <button className="panel-btn" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
                <Trash2 style={{ width: '20px', height: '20px' }} />
                <span>Cleanup Unused</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;