// src/components/TopBar.tsx - Fixed project dropdown with better debugging
import React, { useEffect } from 'react';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import type { PageType } from '../App';

interface TopBarProps {
  currentPage: PageType;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ currentPage, onRefresh, refreshing = false }) => {
  const { currentProject, projects, loading, error, switchProject, refreshProjects } = useProject();

  // Debug logging
  useEffect(() => {
    console.log('🔍 TopBar: Project state updated:', {
      currentProject,
      projectCount: projects.length,
      projects: projects.map(p => ({ name: p.name, description: p.description })),
      loading,
      error
    });
  }, [currentProject, projects, loading, error]);

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
    console.log(`🔄 TopBar: Project selection changed to: "${selectedProject}"`);
    switchProject(selectedProject);
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('🔄 TopBar: Time range changed:', event.target.value);
  };

  const handleRefreshProjects = async () => {
    console.log('🔄 TopBar: Manual project refresh requested');
    await refreshProjects();
  };

  // Show current project in badge
  const displayProject = currentProject || (projects.length > 0 ? projects[0].name : 'Default');

  return (
    <div className="top-bar">
      <div className="breadcrumb">
        <span>MicroCloud</span>
        <ChevronRight style={{ width: '16px', height: '16px' }} />
        <span className="current">{getPageTitle(currentPage)}</span>
        <span className="project-badge" id="current-project">
          {displayProject}
          {loading && ' (Loading...)'}
        </span>
      </div>

      <div className="top-controls">
        <select 
          className="project-selector" 
          value={currentProject || ''} 
          onChange={handleProjectChange}
          disabled={loading}
          title={error ? `Error: ${error}` : `${projects.length} projects available`}
        >
          {loading ? (
            <option value="">Loading projects...</option>
          ) : error ? (
            <option value="">Error loading projects</option>
          ) : projects.length === 0 ? (
            <option value="">No projects found</option>
          ) : (
            <>
              {/* Show "All Projects" option only if we have multiple projects */}
              {projects.length > 1 && (
                <option value="">All Projects</option>
              )}
              {projects.map((project) => (
                <option key={project.name} value={project.name}>
                  {project.name}
                  {project.description && project.description !== project.name && ` - ${project.description}`}
                </option>
              ))}
            </>
          )}
        </select>

        {/* Add refresh button for projects if there's an error */}
        {error && (
          <button 
            className="panel-btn" 
            onClick={handleRefreshProjects}
            disabled={loading}
            title="Refresh projects"
            style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
          >
            <RefreshCw style={{ width: '14px', height: '14px' }} />
          </button>
        )}

        <select 
          className="time-range" 
          defaultValue="24h"
          onChange={handleTimeRangeChange}
        >
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