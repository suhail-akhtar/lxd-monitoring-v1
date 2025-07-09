// src/components/TopBar.tsx - Clean version
import React from 'react';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { useProject } from '../hooks/useProject';
import type { PageType } from '../App';

interface TopBarProps {
  currentPage: PageType;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ currentPage, onRefresh, refreshing = false }) => {
  const { currentProject, projects, loading, switchProject } = useProject();

  const getPageTitle = (page: PageType) => {
    const titles = {
      'overview': 'Overview Dashboard',
      'instances': 'Instances',
      'cluster-nodes': 'Cluster Nodes',
      'networks': 'Networks',
      'storage': 'Storage',
      'operations': 'Operations',
      'events': 'Events & Logs',
      'metrics': 'Metrics',
      'projects': 'Projects'
    };
    return titles[page] || 'Dashboard';
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProject = event.target.value;
    switchProject(selectedProject);
  };

  return (
    <div className="top-bar">
      <div className="breadcrumb">
        <span>MicroCloud</span>
        <ChevronRight style={{ width: '16px', height: '16px' }} />
        <span className="current">{getPageTitle(currentPage)}</span>
        <span className="project-badge" id="current-project">
          {currentProject || 'Default'}
        </span>
      </div>

      <div className="top-controls">
        <select 
          className="project-selector" 
          value={currentProject || 'default'} 
          onChange={handleProjectChange}
          disabled={loading}
        >
          {loading ? (
            <option value="default">Loading projects...</option>
          ) : projects.length === 0 ? (
            <option value="default">Default Project</option>
          ) : (
            <>
              <option value="">All Projects</option>
              {projects.map((project) => (
                <option key={project.name} value={project.name}>
                  {project.name}
                  {project.description && ` - ${project.description}`}
                </option>
              ))}
            </>
          )}
        </select>

        <select className="time-range">
          <option value="1h">Last 1 hour</option>
          <option value="6h">Last 6 hours</option>
          <option value="24h" selected>Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>

        <div className="refresh-controls">
          <button className="auto-refresh">
            <div className="live-dot"></div>
            Auto: 30s
          </button>
          <button 
            className="global-refresh" 
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw 
              style={{ 
                width: '16px', 
                height: '16px',
                animation: refreshing ? 'spin 1s linear infinite' : 'none'
              }} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;