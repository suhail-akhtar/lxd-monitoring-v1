import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiService, type Project } from '../services/api';

interface ProjectContextType {
  currentProject: string;
  setCurrentProject: (project: string) => void;
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<string>('default');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const response = await apiService.getProjects();
      
      if (response.error) {
        setError(response.error);
      } else {
        setProjects(response.data || []);
        setError(null);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const value = {
    currentProject,
    setCurrentProject,
    projects,
    loading,
    error
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};