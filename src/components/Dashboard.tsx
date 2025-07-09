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
} from 'lucide-react';
import ResourceTrendsChart from './charts/ResourceTrendsChart';
import InstanceStatusChart from './charts/InstanceStatusChart';
import PerformanceChart from './charts/PerformanceChart';

const Dashboard: React.FC = () => {
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
          <div className="metric-value">1,247</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +47 this week
          </div>
        </div>

        <div className="metric-card" data-metric="nodes">
          <div className="metric-header">
            <div className="metric-title">Cluster Health</div>
            <div className="metric-icon">
              <Server style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">98.7%</div>
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
          <div className="metric-value">73.2%</div>
          <div className="metric-change negative">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +12% from yesterday
          </div>
        </div>

        <div className="metric-card" data-metric="memory">
          <div className="metric-header">
            <div className="metric-title">Memory Usage</div>
            <div className="metric-icon">
              <MemoryStick style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">58.4%</div>
          <div className="metric-change positive">
            <TrendingDown style={{ width: '16px', height: '16px' }} />
            -4% from yesterday
          </div>
        </div>

        <div className="metric-card" data-metric="storage">
          <div className="metric-header">
            <div className="metric-title">Storage Capacity</div>
            <div className="metric-icon">
              <HardDrive style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">18.7TB</div>
          <div className="metric-change neutral">
            <Minus style={{ width: '16px', height: '16px' }} />
            of 32TB total (58%)
          </div>
        </div>

        <div className="metric-card" data-metric="network">
          <div className="metric-header">
            <div className="metric-title">Network Throughput</div>
            <div className="metric-icon">
              <Network style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">4.2GB/s</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            Peak: 8.9GB/s
          </div>
        </div>
      </div>

      {/* Enhanced Main Panels with Individual Refresh */}
      <div className="panel-grid">
        {/* Resource Trends */}
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
              <ResourceTrendsChart />
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
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content small">
            <div className="chart-container small">
              <InstanceStatusChart />
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
                <tr>
                  <td>
                    <strong>default-zfs</strong>
                  </td>
                  <td>ZFS</td>
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
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>ssd-cache</strong>
                  </td>
                  <td>Btrfs</td>
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
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>backup-lvm</strong>
                  </td>
                  <td>LVM</td>
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
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>nvme-fast</strong>
                  </td>
                  <td>ZFS</td>
                  <td>2.0TB</td>
                  <td>1.4TB</td>
                  <td>0.6TB</td>
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
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                </tr>
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
              <button className="panel-btn">
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
                <tr>
                  <td>
                    <strong>lxdbr0</strong>
                    <br />
                    <small>10.0.0.1/24</small>
                  </td>
                  <td>NAT</td>
                  <td>687</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>br-external</strong>
                    <br />
                    <small>192.168.1.0/24</small>
                  </td>
                  <td>Bridge</td>
                  <td>423</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>ovn-virtual</strong>
                    <br />
                    <small>172.16.0.0/16</small>
                  </td>
                  <td>OVN</td>
                  <td>137</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="status-dot"></span>Active
                    </span>
                  </td>
                </tr>
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
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
              <button className="panel-btn">
                <Settings style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="node-grid">
              <div className="node-card">
                <div className="node-header">
                  <div className="node-name">lxd-prod-01</div>
                  <div className="node-status" style={{ background: '#3fb950' }}></div>
                </div>
                <div className="node-metrics">
                  <div>CPU: 45%</div>
                  <div>RAM: 62%</div>
                  <div>Disk: 68%</div>
                  <div>Load: 1.23</div>
                  <div>Uptime: 47d</div>
                  <div>Instances: 142</div>
                </div>
              </div>

              <div className="node-card">
                <div className="node-header">
                  <div className="node-name">lxd-prod-02</div>
                  <div className="node-status" style={{ background: '#bb8009' }}></div>
                </div>
                <div className="node-metrics">
                  <div>CPU: 89%</div>
                  <div>RAM: 78%</div>
                  <div>Disk: 54%</div>
                  <div>Load: 3.45</div>
                  <div>Uptime: 52d</div>
                  <div>Instances: 198</div>
                </div>
              </div>

              <div className="node-card">
                <div className="node-header">
                  <div className="node-name">lxd-prod-03</div>
                  <div className="node-status" style={{ background: '#3fb950' }}></div>
                </div>
                <div className="node-metrics">
                  <div>CPU: 58%</div>
                  <div>RAM: 41%</div>
                  <div>Disk: 71%</div>
                  <div>Load: 2.01</div>
                  <div>Uptime: 38d</div>
                  <div>Instances: 156</div>
                </div>
              </div>

              <div className="node-card">
                <div className="node-header">
                  <div className="node-name">lxd-prod-04</div>
                  <div className="node-status" style={{ background: '#3fb950' }}></div>
                </div>
                <div className="node-metrics">
                  <div>CPU: 23%</div>
                  <div>RAM: 35%</div>
                  <div>Disk: 45%</div>
                  <div>Load: 0.87</div>
                  <div>Uptime: 61d</div>
                  <div>Instances: 98</div>
                </div>
              </div>

              <div className="node-card">
                <div className="node-header">
                  <div className="node-name">lxd-prod-05</div>
                  <div className="node-status" style={{ background: '#3fb950' }}></div>
                </div>
                <div className="node-metrics">
                  <div>CPU: 67%</div>
                  <div>RAM: 52%</div>
                  <div>Disk: 63%</div>
                  <div>Load: 2.34</div>
                  <div>Uptime: 29d</div>
                  <div>Instances: 174</div>
                </div>
              </div>

              <div className="node-card">
                <div className="node-header">
                  <div className="node-name">lxd-prod-06</div>
                  <div className="node-status" style={{ background: '#3fb950' }}></div>
                </div>
                <div className="node-metrics">
                  <div>CPU: 34%</div>
                  <div>RAM: 28%</div>
                  <div>Disk: 39%</div>
                  <div>Load: 1.12</div>
                  <div>Uptime: 73d</div>
                  <div>Instances: 89</div>
                </div>
              </div>
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
                <div className="activity-title">Instance deployment completed successfully</div>
                <div className="activity-desc">web-server-prod-247 deployed to lxd-prod-03 with 4 vCPU, 8GB RAM</div>
                <div className="activity-time">3 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-info">
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Live migration in progress</div>
                <div className="activity-desc">
                  database-prod-main migrating from lxd-prod-02 to lxd-prod-05 (68% complete)
                </div>
                <div className="activity-time">8 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <Check style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Storage pool expansion completed</div>
                <div className="activity-desc">default-zfs pool expanded by 8TB, total capacity now 16TB</div>
                <div className="activity-time">22 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-warning">
                <AlertTriangle style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">High CPU usage alert triggered</div>
                <div className="activity-desc">lxd-prod-02 CPU utilization at 89% for the last 20 minutes</div>
                <div className="activity-time">25 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-success">
                <Check style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Automated backup completed</div>
                <div className="activity-desc">Production project backup: 2.4GB, 147 instances, duration: 8m 34s</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-error">
                <X style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Instance start failed</div>
                <div className="activity-desc">test-container-84 failed to start on lxd-prod-04: insufficient memory</div>
                <div className="activity-time">3 hours ago</div>
              </div>
            </div>
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
              <button className="panel-btn">
                <RefreshCw style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="chart-container">
              <PerformanceChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;