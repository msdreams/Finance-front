import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const backgroundPlugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart: any) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgb(75, 85, 99)"; 
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Income",
      data: [30, 50, 40, 60, 70, 80],
      fill: false,
      borderColor: "rgba(175, 222, 222, 1)",
      tension: 0.1,
    },
    {
      label: "Expence",
      data: [50, 30, 10, 50, 60, 60],
      fill: false,
      borderColor: "red",
      tension: 0.1,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "white", 
        font: {
          size: 14, 
          family: "Arial", 
        },
      },
    },
    title: {
      display: true,
      text: "Monthly Cashflow Data",
      color: "#fff",
      font: {
        size: 24, 
        weight: 700, 
      },
    },
    customCanvasBackgroundColor: {
      color: "black",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      ticks: {
        color: "white",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      ticks: {
        color: "white",
      },
    },
  },
};

const pieData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Votes Distribution",
      font: {
        size: 24, 
        weight: 700, 
      },
    },
    customCanvasBackgroundColor: {
      color: "black",
    },
  },
};

export const MainChart = () => {
  return (
    <div className="w-4/5" style={{ height: '400px' }}>
      <Line
            data={lineData}
            options={lineOptions}
            plugins={[backgroundPlugin]}
            className="flex rounded-lg shadow-lg"
         />
            
      {/* <div className="mt-10">
        <div className="flex flex-col bg-primary-700 pt-10 w-full lg:flex-row gap-10">
          <div className="flex-1 flex-col overflow-hidden">
            <Pie data={pieData} options={pieOptions} plugins={[backgroundPlugin]} />
          </div>

          <div className="flex-1 flex-col overflow-hidden">
            <Pie data={pieData} options={pieOptions} plugins={[backgroundPlugin]} />
          </div>
        </div>
      </div> */}
    </div>
  )
}