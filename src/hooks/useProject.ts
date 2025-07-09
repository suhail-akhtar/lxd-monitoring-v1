/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

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

export function useProject(): ProjectContextType {
  const context = useContext(ProjectContext);
  if (!context) {
    console.warn('useProject called outside of ProjectProvider, using defaults');
    return defaultContextValue;
  }
  return context;
}