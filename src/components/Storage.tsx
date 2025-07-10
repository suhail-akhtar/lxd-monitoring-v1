/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  HardDrive,
  Database,
  Folder,
  Zap,
  TrendingUp,
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
  Plus,
  Archive,
  FileText,
} from 'lucide-react';

const Storage: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Storage Dashboard</h1>
        <p className="page-subtitle">
          Complete visibility into storage pools, volumes, usage patterns, and I/O performance
        </p>
      </div>

      {/* Storage Overview Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Storage Pools</div>
            <div className="metric-icon">
              <Database style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">4</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            All healthy
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Capacity</div>
            <div className="metric-icon">
              <HardDrive style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">32TB</div>
          <div className="metric-change neutral">
            <Activity style={{ width: '16px', height: '16px' }} />
            68% utilized
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Used Storage</div>
            <div className="metric-icon">
              <Archive style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">21.8TB</div>
          <div className="metric-change negative">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +2.4TB this week
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Available Space</div>
            <div className="metric-icon">
              <Folder style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">10.2TB</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            32% free
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">I/O Operations</div>
            <div className="metric-icon">
              <Zap style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">45.2K</div>
          <div className="metric-change positive">
            <Activity style={{ width: '16px', height: '16px' }} />
            IOPS average
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Storage Volumes</div>
            <div className="metric-icon">
              <FileText style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">1,247</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +47 this week
          </div>
        </div>
      </div>

      {/* Main Dashboard Panels */}
      <div className="panel-grid">
        {/* Storage I/O Performance */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <BarChart3 style={{ width: '16px', height: '16px' }} />
              Storage I/O Performance (24h)
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
                Storage I/O Performance Chart
                <br />
                <small>Read/Write operations per second</small>
              </div>
            </div>
          </div>
        </div>

        {/* Pool Health Status */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Database style={{ width: '16px', height: '16px' }} />
              Pool Health
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
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3fb950' }}>4</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Healthy</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#bb8009' }}>0</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Warning</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f85149' }}>0</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Critical</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b949e' }}>0</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Offline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Storage Consumers */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <Archive style={{ width: '16px', height: '16px' }} />
              Top Storage Consumers
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
                  <th>Pool</th>
                  <th>Used Space</th>
                  <th>Read I/O</th>
                  <th>Write I/O</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>database-prod-main</strong>
                    <br />
                    <small>PostgreSQL Database</small>
                  </td>
                  <td>default-zfs</td>
                  <td>1.2TB</td>
                  <td>450 MB/s</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill high" style={{ width: '89%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>340 MB/s</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>backup-server-01</strong>
                    <br />
                    <small>Backup Storage</small>
                  </td>
                  <td>backup-lvm</td>
                  <td>856GB</td>
                  <td>89 MB/s</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '67%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>234 MB/s</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>analytics-worker-03</strong>
                    <br />
                    <small>Data Processing</small>
                  </td>
                  <td>nvme-fast</td>
                  <td>567GB</td>
                  <td>167 MB/s</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '45%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>156 MB/s</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Storage Events */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Clock style={{ width: '16px', height: '16px' }} />
              Storage Events
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
                <div className="activity-title">Pool expansion completed</div>
                <div className="activity-desc">default-zfs expanded by +8TB</div>
                <div className="activity-time">22 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-warning">
                <AlertTriangle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">High disk usage</div>
                <div className="activity-desc">nvme-fast pool at 90% capacity</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-info">
                <Archive style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Snapshot created</div>
                <div className="activity-desc">Backup snapshot: prod-backup-2024</div>
                <div className="activity-time">6 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Pool Details */}
        <div className="panel panel-full">
          <div className="panel-header">
            <div className="panel-title">
              <Database style={{ width: '16px', height: '16px' }} />
              Storage Pools Management
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
          <div className="panel-content large">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pool Name</th>
                  <th>Type</th>
                  <th>Total Size</th>
                  <th>Used</th>
                  <th>Available</th>
                  <th>Usage %</th>
                  <th>I/O Load</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>default-zfs</strong>
                    <br />
                    <small>Primary storage pool</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(31, 111, 235, 0.15)', color: '#58a6ff', border: '1px solid rgba(31, 111, 235, 0.3)' }}>
                      ZFS
                    </span>
                  </td>
                  <td>16.0TB</td>
                  <td>11.2TB</td>
                  <td>4.8TB</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill high" style={{ width: '70%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>70%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div>R: 450 MB/s</div>
                      <div>W: 340 MB/s</div>
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
                    <strong>ssd-cache</strong>
                    <br />
                    <small>High-speed cache</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', border: '1px solid rgba(63, 185, 80, 0.3)' }}>
                      Btrfs
                    </span>
                  </td>
                  <td>6.0TB</td>
                  <td>2.7TB</td>
                  <td>3.3TB</td>
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
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div>R: 167 MB/s</div>
                      <div>W: 156 MB/s</div>
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
                    <strong>backup-lvm</strong>
                    <br />
                    <small>Backup storage</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(187, 128, 9, 0.15)', color: '#bb8009', border: '1px solid rgba(187, 128, 9, 0.3)' }}>
                      LVM
                    </span>
                  </td>
                  <td>8.0TB</td>
                  <td>3.4TB</td>
                  <td>4.6TB</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '42.5%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>42.5%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div>R: 89 MB/s</div>
                      <div>W: 234 MB/s</div>
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
                    <strong>nvme-fast</strong>
                    <br />
                    <small>NVMe high-performance</small>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(31, 111, 235, 0.15)', color: '#58a6ff', border: '1px solid rgba(31, 111, 235, 0.3)' }}>
                      ZFS
                    </span>
                  </td>
                  <td>2.0TB</td>
                  <td>1.8TB</td>
                  <td>0.2TB</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill high" style={{ width: '90%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>90%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div>R: 890 MB/s</div>
                      <div>W: 567 MB/s</div>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge status-warning">
                      <span className="status-dot"></span>Near Full
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

export default Storage;