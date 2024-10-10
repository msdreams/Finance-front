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
} from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [30, 50, 40, 60, 70, 80],
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Monthly Sales Data',
    },
  },
};

export const HistoryPage = () => {
  return (
    <>
    <h1>HistoryPage</h1>

    <div>
      <Line data={data} options={options} />
    </div>
    </>
  )
}