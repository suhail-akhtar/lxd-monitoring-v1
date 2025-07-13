/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
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
  project?: string;
  refreshTrigger?: number;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
    maxBarThickness: number;
  }>;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  project = 'all', 
  refreshTrigger = 0 
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = project === 'all' 
        ? '/api/lxd/charts/performance'
        : `/api/lxd/charts/performance/${project}`;
      
      const response = await fetch(endpoint);
      const result = await response.json();
      
      if (result.success) {
        setChartData(result.data);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(`Network error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [project, refreshTrigger]);

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
            return `Load Average: ${context.parsed.y}`;
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
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
      }}>
        <div className="spinner" style={{ width: '32px', height: '32px' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        color: '#f85149',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Failed to load performance</p>
        <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>{error}</p>
        <button 
          onClick={fetchData}
          style={{
            marginTop: '0.5rem',
            padding: '0.25rem 0.5rem',
            background: '#1f6feb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return <Bar options={options} data={chartData} />;
};

export default PerformanceChart;