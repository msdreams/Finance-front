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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGetAllAccounts } from "../features/accountSlice";

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
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState<"Pie" | "Line">("Line");
  const [modalFilter, setModalFilter] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [modalFirst, setModalFirst] = useState(false);
  const [modalBalance, setModalBalance] = useState(false);
  const [modalAccount, setModalAccount] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useAppDispatch();
  const { allAccounts } = useAppSelector((state) => state.account);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const isEndDateValid = endDate === "" || endDate >= startDate;

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
  }, []);

  return (
    <>
      <div className="triangle-bg"></div>
      <div className="triangle-bg-up"></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ height: "38px" }}
              src="./img/Logo(Nav).svg"
              alt="img"
            />
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setModalFirst(!modalFirst)}
                style={{ height: "38px" }}
                className="animated-button"
              >
                Filter
              </button>

              {modalFirst && (
                <div className="home__modal-filter">
                  <p>Expense</p>
                  <p>Income</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ opacity: "40%", height: "38px" }}
              src="./img/Logo(Nav).svg"
              alt="img"
            />

            <div style={{ position: "relative" }}>
              <button
                onClick={() => setModalData(!modalData)}
                style={{ height: "38px" }}
                className="animated-button"
              >
                Period
              </button>

              {modalData && (
                <div className="home__modal-data">
                  <div>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </div>

                  <div>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={handleEndDateChange}
                      min={startDate} // Ограничение, чтобы конец диапазона не был меньше начала
                    />
                    {!isEndDateValid && (
                      <p style={{ color: "red" }}>
                        End date cannot be before start date
                      </p>
                    )}
                  </div>

                  <div>
                    <p>From: {startDate || "Not selected"} </p>
                    <p>To: {endDate || "Not selected"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            columnGap: "3px",
            position: "relative",
            marginBottom: "14px",
            marginTop: "14px",
          }}
        >
          <p onClick={() => setModalAccount(!modalAccount)} className="home__modal-balance">
            Balance: {allAccounts ? allAccounts[0].balance + "$" : 0} ∨
          </p>
          {modalAccount && (
            <div className="home__modal-account">
              {allAccounts?.map(account => (
                <p>{account.name}</p>
              ))}
            </div>
          )}

          {modalBalance && (
            <div className="home__modal-balance-r">
              <p>Expense</p>
              <p>Income</p>
            </div>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setModalFilter(!modalFilter)}
            style={{ height: "38px" }}
            className="animated-button"
          >
            Filter
          </button>

          {modalFilter && (
            <div className="home__modal-filter">
              <p>Expense</p>
              <p>Income</p>
            </div>
          )}
        </div>
      </div>

      {schedule === "Line" ? (
        <div style={{ width: "100%", margin: "0 auto", marginBottom: "30px" }}>
          <Line
            data={lineData}
            options={lineOptions}
            plugins={[backgroundPlugin]}
          />
        </div>
      ) : (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <Pie
            data={pieData}
            options={pieOptions}
            plugins={[backgroundPlugin]}
          />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="home__change">
          <img
            onClick={() => setSchedule("Pie")}
            src="./img/change-pie.svg"
            alt="img"
            className="change-pie-img"
          />
          <img
            onClick={() => setSchedule("Line")}
            src="./img/change-line.svg"
            alt="img"
            className="change-line-img"
          />
        </div>

        <div
          onClick={() => navigate("/add-transaction")}
          className="transaction__button"
        >
          Add transaction
        </div>
      </div>
    </>
  );
};
