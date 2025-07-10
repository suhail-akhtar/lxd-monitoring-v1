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

const PerformanceChart: React.FC = () => {
  const data = {
    labels: ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5', 'Node 6'],
    datasets: [
      {
        label: 'CPU Load Average',
        data: [1.23, 3.45, 2.01, 0.87, 2.34, 1.12],
        backgroundColor: '#1f6feb',
        borderRadius: 6,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
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

  return <Bar options={options} data={data} />;
};

export default PerformanceChart;