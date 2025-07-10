/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Folder,
  Users,
  Settings,
  Shield,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Maximize2,
  Plus,
  Eye,
  Edit,
  Unlock,
  Clock,
  BarChart3,
  PieChart,
  Target,
} from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Projects Dashboard</h1>
        <p className="page-subtitle">
          Project management, resource allocation, access control, and organizational insights
        </p>
      </div>

      {/* Projects Overview Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Projects</div>
            <div className="metric-icon">
              <Folder style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">12</div>
          <div className="metric-change positive">
            <Plus style={{ width: '16px', height: '16px' }} />
            2 added this month
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Active Projects</div>
            <div className="metric-icon">
              <Activity style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">9</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            75% active
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Total Users</div>
            <div className="metric-icon">
              <Users style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">47</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +8 this month
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Resource Usage</div>
            <div className="metric-icon">
              <BarChart3 style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">68.4%</div>
          <div className="metric-change negative">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            +5% this week
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Security Policies</div>
            <div className="metric-icon">
              <Shield style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">23</div>
          <div className="metric-change positive">
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            All enforced
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-title">Quota Compliance</div>
            <div className="metric-icon">
              <Target style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="metric-value">91.7%</div>
          <div className="metric-change positive">
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            Within limits
          </div>
        </div>
      </div>

      {/* Main Dashboard Panels */}
      <div className="panel-grid">
        {/* Project Resource Distribution */}
        <div className="panel panel-lg">
          <div className="panel-header">
            <div className="panel-title">
              <PieChart style={{ width: '16px', height: '16px' }} />
              Resource Distribution by Project
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
                <small>CPU, Memory, Storage by project</small>
              </div>
            </div>
          </div>
        </div>

        {/* Project Status Overview */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Folder style={{ width: '16px', height: '16px' }} />
              Project Status
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
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3fb950' }}>9</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Active</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#bb8009' }}>2</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Suspended</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b949e' }}>1</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Archived</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f85149' }}>0</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Errors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Management */}
        <div className="panel panel-full">
          <div className="panel-header">
            <div className="panel-title">
              <Settings style={{ width: '16px', height: '16px' }} />
              Project Management
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
                  <th>Project</th>
                  <th>Status</th>
                  <th>Instances</th>
                  <th>Users</th>
                  <th>CPU Quota</th>
                  <th>Memory Quota</th>
                  <th>Storage Quota</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>production</strong>
                    <br />
                    <small>Main production environment</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <CheckCircle style={{ width: '12px', height: '12px' }} />
                      Active
                    </span>
                  </td>
                  <td>687</td>
                  <td>12</td>
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
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '65%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>65%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill high" style={{ width: '82%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>82%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Edit style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>staging</strong>
                    <br />
                    <small>Pre-production testing</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <CheckCircle style={{ width: '12px', height: '12px' }} />
                      Active
                    </span>
                  </td>
                  <td>234</td>
                  <td>8</td>
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
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '52%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>52%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill medium" style={{ width: '38%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>38%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Edit style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>development</strong>
                    <br />
                    <small>Development environment</small>
                  </td>
                  <td>
                    <span className="status-badge status-running">
                      <CheckCircle style={{ width: '12px', height: '12px' }} />
                      Active
                    </span>
                  </td>
                  <td>156</td>
                  <td>15</td>
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
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill low" style={{ width: '29%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>29%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Edit style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Settings style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>testing</strong>
                    <br />
                    <small>QA testing environment</small>
                  </td>
                  <td>
                    <span className="status-badge status-warning">
                      <AlertTriangle style={{ width: '12px', height: '12px' }} />
                      Suspended
                    </span>
                  </td>
                  <td>89</td>
                  <td>6</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill low" style={{ width: '0%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>0%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill low" style={{ width: '0%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>0%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill low" style={{ width: '12%' }}></div>
                      </div>
                      <div className="progress-text">
                        <span>12%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Edit style={{ width: '12px', height: '12px' }} />
                      </button>
                      <button className="panel-btn" style={{ padding: '0.25rem' }}>
                        <Unlock style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Projects by Resource Usage */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <BarChart3 style={{ width: '16px', height: '16px' }} />
              Top Resource Consumers
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
                  <span style={{ color: '#e6edf3', fontWeight: 'bold' }}>Production</span>
                  <br />
                  <small style={{ color: '#8b949e' }}>687 instances</small>
                </div>
                <span style={{ color: '#f85149', fontWeight: 'bold' }}>78%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#e6edf3', fontWeight: 'bold' }}>Staging</span>
                  <br />
                  <small style={{ color: '#8b949e' }}>234 instances</small>
                </div>
                <span style={{ color: '#bb8009', fontWeight: 'bold' }}>45%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#e6edf3', fontWeight: 'bold' }}>Development</span>
                  <br />
                  <small style={{ color: '#8b949e' }}>156 instances</small>
                </div>
                <span style={{ color: '#3fb950', fontWeight: 'bold' }}>23%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#e6edf3', fontWeight: 'bold' }}>Testing</span>
                  <br />
                  <small style={{ color: '#8b949e' }}>89 instances</small>
                </div>
                <span style={{ color: '#8b949e', fontWeight: 'bold' }}>0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Access Overview */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Users style={{ width: '16px', height: '16px' }} />
              User Access
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
                <span style={{ color: '#e6edf3' }}>Administrators</span>
                <span style={{ color: '#f85149', fontWeight: 'bold' }}>5</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Project Managers</span>
                <span style={{ color: '#bb8009', fontWeight: 'bold' }}>8</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Developers</span>
                <span style={{ color: '#3fb950', fontWeight: 'bold' }}>28</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e6edf3' }}>Read-only Users</span>
                <span style={{ color: '#58a6ff', fontWeight: 'bold' }}>6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Project Activity */}
        <div className="panel panel-md">
          <div className="panel-header">
            <div className="panel-title">
              <Clock style={{ width: '16px', height: '16px' }} />
              Recent Activity
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
                <Plus style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">New project created</div>
                <div className="activity-desc">Project 'ml-training' created by admin</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-warning">
                <Settings style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">Quota limits updated</div>
                <div className="activity-desc">Production project CPU quota increased</div>
                <div className="activity-time">6 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-info">
                <Users style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="activity-content">
                <div className="activity-title">User access granted</div>
                <div className="activity-desc">3 users added to staging project</div>
                <div className="activity-time">1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;