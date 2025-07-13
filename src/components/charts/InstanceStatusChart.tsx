/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InstanceStatusChartProps {
  project?: string;
  refreshTrigger?: number;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
    cutout: string;
  }>;
}

const InstanceStatusChart: React.FC<InstanceStatusChartProps> = ({ 
  project = 'all', 
  refreshTrigger = 0 
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: ['Running', 'Stopped', 'Starting', 'Error'],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ['#3fb950', '#8b949e', '#bb8009', '#f85149'],
      borderWidth: 0,
      cutout: '70%',
    }]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = project === 'all' 
        ? '/api/lxd/charts/instance-status'
        : `/api/lxd/charts/instance-status/${project}`;
      
      const response = await fetch(endpoint);
      const result = await response.json();
      
      if (result.success) {
        setChartData(result.data);
      } else {
        setError(result.error || 'Failed to fetch data');
        // Keep existing data on error
      }
    } catch (err) {
      setError(`Network error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [project, refreshTrigger]);

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
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
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
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Failed to load chart</p>
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

  return <Doughnut options={options} data={chartData} />;
};

export default InstanceStatusChart;