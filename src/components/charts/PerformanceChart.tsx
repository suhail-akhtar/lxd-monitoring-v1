/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/charts/PerformanceChart.tsx - Updated with real data
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceChartProps {
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderRadius: number;
      maxBarThickness: number;
    }[];
  } | null;
  loading?: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, loading = false }) => {
  // Fallback data when no real data is available
  const fallbackData = {
    labels: ['No Data'],
    datasets: [
      {
        label: 'Load Average',
        data: [0],
        backgroundColor: '#1f6feb',
        borderRadius: 6,
        maxBarThickness: 40,
      },
    ],
  };

  const chartData = data || fallbackData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
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
        grid: {
          color: '#30363d',
          drawBorder: false,
        },
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Inter',
            size: 11,
            weight: 500,
          },
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
        <span style={{ marginLeft: '0.5rem' }}>Loading performance...</span>
      </div>
    );
  }

  return <Bar options={options} data={chartData} />;
};

export default PerformanceChart;