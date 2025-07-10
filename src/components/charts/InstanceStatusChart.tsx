/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/charts/InstanceStatusChart.tsx - Updated with real data
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InstanceStatusChartProps {
  data?: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
      cutout: string;
    }[];
  } | null;
  loading?: boolean;
}

const InstanceStatusChart: React.FC<InstanceStatusChartProps> = ({ data, loading = false }) => {
  // Fallback data when no real data is available
  const fallbackData = {
    labels: ['Running', 'Stopped', 'Starting', 'Error'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#3fb950', '#8b949e', '#bb8009', '#f85149'],
        borderWidth: 0,
        cutout: '70%',
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
          padding: 15,
          font: {
            family: 'Inter',
            size: 11,
            weight: 600,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
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
        <span style={{ marginLeft: '0.5rem' }}>Loading...</span>
      </div>
    );
  }

  return <Doughnut options={options} data={chartData} />;
};

export default InstanceStatusChart;



