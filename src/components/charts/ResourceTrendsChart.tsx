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

const ResourceTrendsChart: React.FC = () => {
  const data = {
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [45, 48, 52, 58, 65, 72, 78, 82, 87, 84, 79, 73],
        borderColor: '#58a6ff',
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointBackgroundColor: '#58a6ff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'Memory Usage (%)',
        data: [38, 40, 41, 43, 45, 47, 48, 50, 52, 51, 49, 46],
        borderColor: '#3fb950',
        backgroundColor: 'rgba(63, 185, 80, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointBackgroundColor: '#3fb950',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'Storage I/O (MB/s)',
        data: [125, 138, 145, 167, 189, 234, 267, 289, 312, 298, 276, 251],
        borderColor: '#bb8009',
        backgroundColor: 'rgba(187, 128, 9, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointBackgroundColor: '#bb8009',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        yAxisID: 'y1',
      },
    ],
  };

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

  return <Line options={options} data={data} />;
};

export default ResourceTrendsChart;