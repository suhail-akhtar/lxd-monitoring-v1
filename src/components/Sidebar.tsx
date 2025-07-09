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
import type { PageType } from '../App';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'overview' as PageType, icon: LayoutDashboard, label: 'Overview' },
    { id: 'instances' as PageType, icon: Box, label: 'Instances' },
    { id: 'cluster-nodes' as PageType, icon: Server, label: 'Cluster Nodes' },
    { id: 'networks' as PageType, icon: Network, label: 'Networks' },
    { id: 'storage' as PageType, icon: HardDrive, label: 'Storage' },
    { id: 'operations' as PageType, icon: Activity, label: 'Operations' },
    { id: 'events' as PageType, icon: ScrollText, label: 'Events & Logs' },
    { id: 'metrics' as PageType, icon: BarChart3, label: 'Metrics' },
    { id: 'projects' as PageType, icon: Folder, label: 'Projects' },
  ];

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
        <button 
          onClick={() => onPageChange('overview')}
          className={`nav-item ${currentPage === 'overview' ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </button>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Resources</div>
        {navItems.slice(1, 5).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Operations</div>
        {navItems.slice(5, 8).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Management</div>
        <button
          onClick={() => onPageChange('projects')}
          className={`nav-item ${currentPage === 'projects' ? 'active' : ''}`}
        >
          <Folder size={18} />
          <span>Projects</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;