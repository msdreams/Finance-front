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
import {DateRangePicker} from "@nextui-org/date-picker";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGetAllAccounts } from "../features/accountSlice";
import type {Selection} from "@nextui-org/react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

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
      label: "Income",
      data: [30, 50, 40, 60, 70, 80],
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
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
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Cashflow Data",
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

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.account.loading);
  const { allAccounts } = useAppSelector((state: RootState) => state.account);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (allAccounts && allAccounts.length > 0) {
      setSelectedKeys(new Set([allAccounts[0].name]));
    }
  }, [allAccounts]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  if (isLoading || !allAccounts) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full bg-primary-600">
      <div className="p-10 xl:px-24 pt-24 w-full">
        <div className="flex flex-col text-white gap-10 font-sans bg-primary-800 rounded-lg p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="text-4xl">
              Balance: {allAccounts[0].balance + "$"}
            </div>

        {/* accounts */}
            <div className="flex flex-row gap-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize text-white" variant="bordered">
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Single selection example"
                  selectedKeys={selectedKeys}
                  selectionMode="single"
                  variant="flat"
                  onSelectionChange={setSelectedKeys}
                >
                  {allAccounts.map((account) => (
                    <DropdownItem key={account.name}>{account.name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button isLoading={isLoading} color="primary" size="md" type="submit">
                Add account
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:justify-between gap-6 md:flex-row items-end">
            <div className="flex flex-col gap-6">
              <Button
                onPress={() => navigate("add-transaction")}
                className="font-sans bg-primary-400"
              >
                Add Income
              </Button>

              <Button
                onPress={() => navigate("add-transaction")}
                className="font-sans bg-primary-400"
              >
                Add Expense
              </Button>
            </div>

            <DateRangePicker className="max-w-xs" label="Time Range" variant="faded" />
          </div>
        </div>

        {/* Charts */}
        <div className="mt-10">
          <div className="flex-1 flex-col">
            <Line
              data={lineData}
              options={lineOptions}
              plugins={[backgroundPlugin]}
              className="flex"
            />
          </div>

          <div className="flex flex-col bg-primary-700 pt-10 w-full lg:flex-row gap-10">
            <div className="flex-1 flex-col overflow-hidden">
              <Pie data={pieData} options={pieOptions} plugins={[backgroundPlugin]} />
            </div>

            <div className="flex-1 flex-col overflow-hidden">
              <Pie data={pieData} options={pieOptions} plugins={[backgroundPlugin]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

