/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useProject.ts

import { useState, useEffect, createContext, useContext } from 'react';
import chartService from '../services/chartService';

interface Project {
  name: string;
  description?: string;
  config?: Record<string, any>;
}

interface ProjectContextType {
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  projects: Project[];
  loading: boolean;
  error: string | null;
  refreshProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const useProjectData = () => {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await chartService.getProjects();
      
      if (result.success) {
        const projectsData = result.data || [];
        setProjects([
          { name: 'all', description: 'All Projects' },
          ...projectsData.map((p: any) => ({
            name: p.name || p,
            description: p.description || '',
            config: p.config || {}
          }))
        ]);
      } else {
        setError(result.error || 'Failed to fetch projects');
        // Fallback to basic projects
        setProjects([
          { name: 'all', description: 'All Projects' },
          { name: 'default', description: 'Default Project' }
        ]);
      }
    } catch (err) {
      setError(`Network error: ${err}`);
      setProjects([
        { name: 'all', description: 'All Projects' },
        { name: 'default', description: 'Default Project' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    selectedProject,
    setSelectedProject,
    projects,
    loading,
    error,
    refreshProjects: fetchProjects
  };
};