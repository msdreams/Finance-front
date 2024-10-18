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
import { useState } from "react";

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
    ctx.fillStyle = "#383636"; // Черный фон
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      data: [30, 50, 40, 60, 70, 80],
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.1,
    },
    {
      label: "Sales",
      data: [50, 30, 10, 50, 60, 60],
      fill: false,
      borderColor: "red",
      tension: 0.1,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Sales Data",
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
    },
    customCanvasBackgroundColor: {
      color: "black",
    },
  },
};

export const HomePage = () => {
  const [schedule, setSchedule] = useState<"Pie" | "Line">("Line");

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
          <div style={{ display: "flex", alignItems: 'center'}}>
            <img src="./img/Logo(Nav).svg" alt="img" />
            <div className="animated-button">Filter</div>
          </div>

          <div style={{ display: "flex", alignItems: 'center'}}>
            <img
              style={{ opacity: "40%" }}
              src="./img/Logo(Nav).svg"
              alt="img"
            />
            <div className="animated-button">Select period</div>
          </div>
        </div>

        <div className="animated-button">Filter</div>
      </div>

      {schedule === "Line" ? (
        <div style={{ width: "100%", margin: "0 auto" , marginBottom: '30px'}}>
          <Line
            data={lineData}
            options={lineOptions}
            plugins={[backgroundPlugin]}
          />
        </div>
      ) : (
        <div style={{ width: "500px", margin: "0 auto" }}>
          <Pie
            data={pieData}
            options={pieOptions}
            plugins={[backgroundPlugin]}
          />
        </div>
      )}

      <div className="home__change">
        <img
          onClick={() => setSchedule("Pie")}
          src="./img/change-pie.svg"
          alt="img"
        />
        <img
          onClick={() => setSchedule("Line")}
          src="./img/change-line.svg"
          alt="img"
        />
      </div>
    </>
  );
};
