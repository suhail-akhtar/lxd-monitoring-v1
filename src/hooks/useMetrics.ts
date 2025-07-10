// src/hooks/useMetrics.ts
import { useState, useEffect, useCallback } from 'react';
import type { DashboardMetrics } from '../api/types/dashboard';
import { useDashboard } from './useDashboard';

export interface UseMetricsOptions {
  project?: string;
  fastRefresh?: boolean;
  fastRefreshInterval?: number;
}

export interface UseMetricsResult {
  metrics: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useMetrics(options: UseMetricsOptions = {}): UseMetricsResult {
  const {
    project,
    fastRefresh = false,
    fastRefreshInterval = 10000, // 10 seconds for fast refresh
  } = options;

  const { data, loading, error, lastUpdated, refreshMetricsOnly } = useDashboard({
    project,
    autoRefresh: !fastRefresh, // Disable auto-refresh if using fast refresh
    includeStates: false, // Don't include states for metrics-only mode
  });

  const [fastRefreshLoading, setFastRefreshLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (fastRefresh) {
      setFastRefreshLoading(true);
      try {
        await refreshMetricsOnly();
      } finally {
        setFastRefreshLoading(false);
      }
    } else {
      await refreshMetricsOnly();
    }
  }, [fastRefresh, refreshMetricsOnly]);

  // Fast refresh setup
  useEffect(() => {
    if (fastRefresh && fastRefreshInterval > 0 && data) {
      const interval = setInterval(refresh, fastRefreshInterval);
      return () => clearInterval(interval);
    }
  }, [fastRefresh, fastRefreshInterval, data, refresh]);

  return {
    metrics: data?.metrics || null,
    loading: loading || fastRefreshLoading,
    error,
    lastUpdated,
    refresh,
  };
}