import React from 'react';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import type { PageType } from '../App';

interface TopBarProps {
  currentPage: PageType;
}

const TopBar: React.FC<TopBarProps> = ({ currentPage }) => {
  const { currentProject, setCurrentProject, projects, loading } = useProject();

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
    setCurrentProject(event.target.value);
  };

  const handleGlobalRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="top-bar">
      <div className="breadcrumb">
        <span>MicroCloud</span>
        <ChevronRight style={{ width: '16px', height: '16px' }} />
        <span className="current">{getPageTitle(currentPage)}</span>
        <span className="project-badge">
          {currentProject === 'all' ? 'All Projects' : 
           currentProject === 'default' ? 'Default' : 
           currentProject}
        </span>
      </div>

      <div className="top-controls">
        <select 
          className="project-selector" 
          value={currentProject}
          onChange={handleProjectChange}
          disabled={loading}
        >
          <option value="default">Default Project</option>
          <option value="all">All Projects</option>
          {projects.map((project) => (
            <option key={project.name} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>

        <select className="time-range" defaultValue="24h">
          <option value="1h">Last 1 hour</option>
          <option value="6h">Last 6 hours</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>

        <div className="refresh-controls">
          <button className="auto-refresh">
            <div className="live-dot"></div>
            Auto: 30s
          </button>
          <button className="global-refresh" onClick={handleGlobalRefresh}>
            <RefreshCw style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;