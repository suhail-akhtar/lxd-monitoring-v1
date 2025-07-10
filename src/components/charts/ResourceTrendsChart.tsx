/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/charts/ResourceTrendsChart.tsx - Updated with real data
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ResourceTrendsChartProps {
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
      fill: boolean;
      borderWidth: number;
      yAxisID?: string;
    }[];
  } | null;
  loading?: boolean;
}

const ResourceTrendsChart: React.FC<ResourceTrendsChartProps> = ({ data, loading = false }) => {
  // Fallback data when no real data is available
  const fallbackData = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const now = new Date();
      const time = new Date(now.getTime() - (11 - i) * 5 * 60 * 1000);
      return time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: Array.from({ length: 12 }, () => 0),
        borderColor: '#58a6ff',
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
      {
        label: 'Memory Usage (%)',
        data: Array.from({ length: 12 }, () => 0),
        borderColor: '#3fb950',
        backgroundColor: 'rgba(63, 185, 80, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
      {
        label: 'Storage I/O (MB/s)',
        data: Array.from({ length: 12 }, () => 0),
        borderColor: '#bb8009',
        backgroundColor: 'rgba(187, 128, 9, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        yAxisID: 'y1',
      },
    ],
  };

  const chartData = data || fallbackData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter',
            size: 12,
            weight: 600,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.dataset.yAxisID === 'y1') {
                label += Math.round(context.parsed.y) + ' MB/s';
              } else {
                label += Math.round(context.parsed.y) + '%';
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#30363d',
          drawBorder: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 11,
            weight: 500,
          },
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: '#30363d',
          drawBorder: false,
        },
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            family: 'Inter',
            size: 11,
            weight: 500,
          },
          callback: function(value: any) {
            return value + '%';
          }
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Inter',
            size: 11,
            weight: 500,
          },
          callback: function(value: any) {
            return value + ' MB/s';
          }
        },
      },
    },
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        color: '#8b949e' 
      }}>
        <div className="spinner" style={{ width: '24px', height: '24px' }}></div>
        <span style={{ marginLeft: '0.5rem' }}>Loading trends...</span>
      </div>
    );
  }

  return <Line options={options} data={chartData} />;
};

export default ResourceTrendsChart;