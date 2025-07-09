/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/ProjectContext.tsx - Fixed version
import React, { createContext, useState, useEffect } from 'react';
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
  currentProject: 'default',
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

export function ProjectProvider({ children, defaultProject = 'default' }: ProjectProviderProps) {
  const [currentProject, setCurrentProject] = useState<string>(defaultProject);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Dynamically import to avoid circular dependencies
      const { ServiceFactory } = await import('../api/ServiceFactory');
      const serviceFactory = ServiceFactory.getInstance();
      const dashboardService = serviceFactory.getDashboardService();
      const projectList = await dashboardService.getProjects();
      
      setProjects(projectList);
      
      // If current project doesn't exist in the list, switch to the first available
      if (projectList.length > 0 && !projectList.find(p => p.name === currentProject)) {
        setCurrentProject(projectList[0].name);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const switchProject = (projectName: string) => {
    setCurrentProject(projectName);
  };

  const refreshProjects = async () => {
    await fetchProjects();
  };

  useEffect(() => {
    // Delay initial fetch to ensure services are initialized
    const timer = setTimeout(() => {
      fetchProjects();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

// export function useProject(): ProjectContextType {
//   const context = useContext(ProjectContext);
//   if (!context) {
//     console.warn('useProject called outside of ProjectProvider, using defaults');
//     return defaultContextValue;
//   }
//   return context;
// }