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
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGetAllAccounts } from "../features/accountSlice";
import type {Selection} from "@nextui-org/react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { logout, refreshAccessToken } from "../features/authSlice";
import { Account } from "../types/account";
import { Transactions } from "../components/Transactions";
import { TransactionHistory } from "../components/TransactionHistory";

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
  const { allIncomesMY } = useAppSelector((state: RootState) => state.expenseIncomeTransaction);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [account, setAccount] = useState<Account | null>(null);

  const selectedValue = useMemo(() => {
    if (!allAccounts || allAccounts.length === 0) return "Default account";
    const value = Array.from(selectedKeys).join(", ").replace(/_/g, "");
    return value.split("-")[1] || "Default account";
  }, [selectedKeys, allAccounts]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshAccessToken())
        .unwrap()
        .catch((error) => {
          console.error("Failed to refresh token:", error);
            dispatch(logout());
        });
    }, 45 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (allAccounts && allAccounts.length > 0) {
      setSelectedKeys(new Set([allAccounts[0].name]));
      setAccount(allAccounts[0]);
    }
  }, [allAccounts]);

  useEffect(() => {
    if (allAccounts && allAccounts.length > 0) {
      const selectedAccountIndex = +Array.from(selectedKeys).join(", ").split("-")[0];
      setAccount(allAccounts[selectedAccountIndex] || allAccounts[0]);
    }
  }, [selectedKeys, allAccounts]);

  return (
    <>
    {isLoading || !allAccounts || !account ? (
     <div className="flex items-center justify-center  bg-gray-200 h-[1200px] w-full"></div>
    ): (
    <div className="flex flex-col items-center w-full bg-gray-200 min-h-screen">
        {/* dashboard */}
      <div className="flex flex-col lg:flex-row gap-6 mt-10 p-4 md:p-10 font-sans xl:px-24 pt-24 w-full animate-fadeIn">
        <div className="flex-2 md:min-w-[450px]">
          <div className="flex flex-col text-white gap-6 bg-gray-600 rounded-lg p-4 md:p-8 shadow-lg">
            <div className="flex gap-4 flex-row flex-wrap justify-between ">
              <div className="flex flex-row gap-4">
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="capitalize text-white min-w-[140px]" variant="bordered" >
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
                    {allAccounts.map((account, i) => (
                      <DropdownItem key={`${i}-${account.name}`}>{account.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              
              <div className="text-2xl min-w-[210px]">
                Balance: {account.balance + "$"}
              </div>
            </div>
            <div className="flex flex-col gap-1 lg:max-w-[400px] pt-2">
                  <Transactions
                    selectedAccount={account}
                    setAccount={setAccount}
                  />
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col bg-gray-300 rounded-lg p-t-4 md:p-8 md:pt-6 shadow-lg">
          <TransactionHistory />
        </div>
        </div>
    </div>
    )}
  </>
  );
};
