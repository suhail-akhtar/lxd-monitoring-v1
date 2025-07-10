import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InstanceStatusChart: React.FC = () => {
  const data = {
    labels: ['Running', 'Stopped', 'Starting', 'Error'],
    datasets: [
      {
        data: [1087, 134, 23, 3],
        backgroundColor: ['#3fb950', '#8b949e', '#bb8009', '#f85149'],
        borderWidth: 0,
        cutout: '70%',
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
          padding: 15,
          font: {
            family: 'Inter',
            size: 11,
            weight: 600,
          },
        },
      },
    },
  };

  return <Doughnut options={options} data={data} />;
};

export default InstanceStatusChart;