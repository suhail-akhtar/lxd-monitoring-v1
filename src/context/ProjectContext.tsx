/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/ProjectContext.tsx - Fixed project loading with better error handling
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface ProjectInfo {
  name: string;
  description: string;
  config: Record<string, any>;
  used_by: string[];
}

interface ProjectContextType {
  currentProject: string;
  projects: ProjectInfo[];
  loading: boolean;
  error: string | null;
  switchProject: (projectName: string) => void;
  refreshProjects: () => Promise<void>;
}

const defaultContextValue: ProjectContextType = {
  currentProject: '',
  projects: [],
  loading: false,
  error: null,
  switchProject: () => {},
  refreshProjects: async () => {},
};

const ProjectContext = createContext<ProjectContextType>(defaultContextValue);

interface ProjectProviderProps {
  children: ReactNode;
  defaultProject?: string;
}

export function ProjectProvider({ children, defaultProject = '' }: ProjectProviderProps) {
  const [currentProject, setCurrentProject] = useState<string>(defaultProject);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    console.log('🔄 ProjectContext: Starting to fetch projects...');
    setLoading(true);
    setError(null);
    
    try {
      // Dynamically import to avoid circular dependencies
      const { ServiceFactory } = await import('../api/ServiceFactory');
      const serviceFactory = ServiceFactory.getInstance();
      const dashboardService = serviceFactory.getDashboardService();
      
      console.log('🔄 ProjectContext: Calling getProjects()...');
      const projectList = await dashboardService.getProjects();
      
      console.log('✅ ProjectContext: Projects fetched successfully:', projectList);
      setProjects(projectList);
      
      // If we have projects and no current project is set, set to first project
      if (projectList.length > 0 && !currentProject) {
        console.log(`🔄 ProjectContext: Setting current project to: ${projectList[0].name}`);
        setCurrentProject(projectList[0].name);
      }
      
      // If current project doesn't exist in the list, switch to the first available
      if (projectList.length > 0 && currentProject && !projectList.find(p => p.name === currentProject)) {
        console.log(`⚠️ ProjectContext: Current project "${currentProject}" not found, switching to "${projectList[0].name}"`);
        setCurrentProject(projectList[0].name);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      console.error('❌ ProjectContext: Failed to fetch projects:', err);
      
      // Set a default project list if fetch fails
      const fallbackProjects = [
        { name: 'default', description: 'Default Project', config: {}, used_by: [] }
      ];
      console.log('🔄 ProjectContext: Using fallback projects:', fallbackProjects);
      setProjects(fallbackProjects);
      
      if (!currentProject) {
        setCurrentProject('default');
      }
    } finally {
      setLoading(false);
    }
  };

  const switchProject = (projectName: string) => {
    console.log(`🔄 ProjectContext: Switching project from "${currentProject}" to "${projectName}"`);
    setCurrentProject(projectName);
  };

  const refreshProjects = async () => {
    console.log('🔄 ProjectContext: Manual refresh requested');
    await fetchProjects();
  };

  useEffect(() => {
    console.log('🔄 ProjectContext: Component mounted, scheduling project fetch...');
    
    // Delay initial fetch to ensure services are initialized
    const timer = setTimeout(() => {
      console.log('🔄 ProjectContext: Timer fired, fetching projects...');
      fetchProjects();
    }, 2000); // Increased delay to ensure API is ready

    return () => {
      console.log('🔄 ProjectContext: Cleaning up timer');
      clearTimeout(timer);
    };
  }, []);

  // Log current state for debugging
  useEffect(() => {
    console.log('🔍 ProjectContext State:', {
      currentProject,
      projectCount: projects.length,
      projectNames: projects.map(p => p.name),
      loading,
      error
    });
  }, [currentProject, projects, loading, error]);

  const value: ProjectContextType = {
    currentProject,
    projects,
    loading,
    error,
    switchProject,
    refreshProjects,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextType {
  const context = useContext(ProjectContext);
  if (!context) {
    console.warn('useProject called outside of ProjectProvider, using defaults');
    return defaultContextValue;
  }
  return context;
}