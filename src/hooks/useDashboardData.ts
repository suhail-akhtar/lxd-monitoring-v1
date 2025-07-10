import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

interface CardState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const useDashboardCard = <T>(
  apiCall: (project: string) => Promise<{ data?: T; error?: string }>,
  project: string = 'default',
  autoRefresh: boolean = true
) => {
  const [state, setState] = useState<CardState<T>>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const response = await apiCall(project);
    
    setState({
      data: response.data || null,
      loading: false,
      error: response.error || null,
      lastUpdated: new Date()
    });
  }, [apiCall, project]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchData, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [fetchData, autoRefresh]);

  return { ...state, refresh };
};

// Individual dashboard card hooks
export const useOverviewMetrics = (project: string = 'default') => {
  return useDashboardCard(
    async (proj) => {
      const response = await apiService.getOverview(proj);
      return { 
        data: response.data?.metrics || null, 
        error: response.error 
      };
    }, 
    project
  );
};

export const useInstances = (project: string = 'default') => {
  return useDashboardCard(
    (proj) => apiService.getInstances(proj),
    project
  );
};

export const useClusterNodes = () => {
  return useDashboardCard(
    () => apiService.getClusterNodes(),
    'default', // Cluster nodes are global
    true
  );
};

export const useNetworks = (project: string = 'default') => {
  return useDashboardCard(
    (proj) => apiService.getNetworks(proj),
    project
  );
};

export const useStoragePools = (project: string = 'default') => {
  return useDashboardCard(
    (proj) => apiService.getStorage(proj),
    project
  );
};

export const useOperations = (project: string = 'default') => {
  return useDashboardCard(
    (proj) => apiService.getOperations(proj),
    project
  );
};