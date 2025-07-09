import React from 'react';
import {
  Activity,
  LayoutDashboard,
  Box,
  Server,
  Network,
  HardDrive,
  ScrollText,
  BarChart3,
  Folder,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Activity style={{ width: '22px', height: '22px', color: 'white' }} />
          </div>
          <div>
            <h1>MicroCloud</h1>
            <p>Monitoring & Troubleshooting</p>
          </div>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Dashboard</div>
        <a href="#" className="nav-item active">
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </a>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Resources</div>
        <a href="#" className="nav-item">
          <Box size={18} />
          <span>Instances</span>
        </a>
        <a href="/cluster-nodes" className="nav-item">
          <Server size={18} />
          <span>Cluster Nodes</span>
        </a>
        <a href="/networks" className="nav-item">
          <Network size={18} />
          <span>Networks</span>
        </a>
        <a href="/storage" className="nav-item">
          <HardDrive size={18} />
          <span>Storage</span>
        </a>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Operations</div>
        <a href="#" className="nav-item">
          <Activity size={18} />
          <span>Operations</span>
        </a>
        <a href="#" className="nav-item">
          <ScrollText size={18} />
          <span>Events & Logs</span>
        </a>
        <a href="#" className="nav-item">
          <BarChart3 size={18} />
          <span>Metrics</span>
        </a>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Management</div>
        <a href="#" className="nav-item">
          <Folder size={18} />
          <span>Projects</span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;