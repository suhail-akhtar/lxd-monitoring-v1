import React, { useState, useEffect } from 'react';
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
  project?: string;
  refreshTrigger?: number;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
    borderWidth: number;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointBorderWidth: number;
    pointRadius: number;
    yAxisID?: string;
  }>;
}

const ResourceTrendsChart: React.FC<ResourceTrendsChartProps> = ({ 
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
        ? '/api/lxd/charts/resource-trends'
        : `/api/lxd/charts/resource-trends/${project}`;
      
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
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [project, refreshTrigger]);

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
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Failed to load trends</p>
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

  return <Line options={options} data={chartData} />;
};

export default ResourceTrendsChart;