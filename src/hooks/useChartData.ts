// src/hooks/useChartData.ts - New hook for chart data
import { useMemo } from 'react';
import type { EnhancedDashboardData } from './useDashboard';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
  }[];
}

export function useChartData(data: EnhancedDashboardData | null) {
  const instanceStatusData = useMemo(() => {
    if (!data?.metrics?.instances) return null;

    const { running, stopped, starting, error } = data.metrics.instances;
    
    return {
      labels: ['Running', 'Stopped', 'Starting', 'Error'],
      datasets: [{
        data: [running, stopped, starting, error],
        backgroundColor: ['#3fb950', '#8b949e', '#bb8009', '#f85149'],
        borderWidth: 0,
        cutout: '70%',
      }]
    };
  }, [data?.metrics?.instances]);

  const resourceTrendsData = useMemo(() => {
    if (!data?.timeSeriesData) return null;

    const labels = data.timeSeriesData.map(point => {
      const time = new Date(point.timestamp);
      return time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    });

    return {
      labels,
      datasets: [
        {
          label: 'CPU Usage (%)',
          data: data.timeSeriesData.map(point => point.cpu),
          borderColor: '#58a6ff',
          backgroundColor: 'rgba(88, 166, 255, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
        },
        {
          label: 'Memory Usage (%)',
          data: data.timeSeriesData.map(point => point.memory),
          borderColor: '#3fb950',
          backgroundColor: 'rgba(63, 185, 80, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
        },
        {
          label: 'Storage I/O (MB/s)',
          data: data.timeSeriesData.map(point => point.storage_io),
          borderColor: '#bb8009',
          backgroundColor: 'rgba(187, 128, 9, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          yAxisID: 'y1',
        },
      ]
    };
  }, [data?.timeSeriesData]);

  const performanceData = useMemo(() => {
    if (!data?.clusterResources) return null;

    return {
      labels: data.clusterResources.map(node => node.name),
      datasets: [{
        label: 'Load Average',
        data: data.clusterResources.map(node => node.load_average?.[0] || 0),
        backgroundColor: '#1f6feb',
        borderRadius: 6,
        maxBarThickness: 40,
      }]
    };
  }, [data?.clusterResources]);

  return {
    instanceStatusData,
    resourceTrendsData,
    performanceData,
  };
}