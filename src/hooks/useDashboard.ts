/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useDashboard.ts - Enhanced version
import { useState, useEffect, useCallback, useRef } from 'react';
import { ServiceFactory } from '../api/ServiceFactory';
import type { DashboardData } from '../api/types/dashboard';
import { useProject } from '../hooks/useProject';

export interface UseDashboardOptions {
    project?: string; 
  autoRefresh?: boolean;
  refreshInterval?: number;
  includeStates?: boolean;
}

export interface EnhancedDashboardData extends DashboardData {
  projects: any[];
  clusterResources: any[];
  timeSeriesData: any[];
}

export interface UseDashboardResult {
  data: EnhancedDashboardData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
  refreshMetricsOnly: () => Promise<void>;
}

export function useDashboard(options: UseDashboardOptions = {}): UseDashboardResult {
  const {
    autoRefresh = true,
    refreshInterval = 30000,
    includeStates = true,
  } = options;

  const { currentProject } = useProject();
  const [data, setData] = useState<EnhancedDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const serviceFactory = useRef(ServiceFactory.getInstance());
  const dashboardService = useRef(
    serviceFactory.current.getDashboardService({
      project: currentProject,
      includeStates,
    })
  );

  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setError(null);

    try {
      // Update service with current project
      await dashboardService.current.switchProject(currentProject);
      
      const dashboardData = await dashboardService.current.getDashboardData();
      setData(dashboardData as EnhancedDashboardData);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
      console.error('Dashboard data fetch error:', err);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, [currentProject]);

  const refreshMetricsOnly = useCallback(async () => {
    if (!data) return;

    try {
      // Cast to any as refreshMetrics is not in the current type definition
      const metrics = await (dashboardService.current as any).refreshMetrics();
      setData(prevData => prevData ? { ...prevData, metrics } : null);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Metrics refresh error:', err);
    }
  }, [data]);

  const refresh = useCallback(async () => {
    await fetchData(false);
  }, [fetchData]);

  const scheduleNextRefresh = useCallback(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refresh();
        scheduleNextRefresh();
      }, refreshInterval);
    }
  }, [autoRefresh, refreshInterval, refresh]);

  // Refresh when project changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && !loading && !error) {
      scheduleNextRefresh();
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [autoRefresh, loading, error, scheduleNextRefresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    refreshMetricsOnly,
  };
}