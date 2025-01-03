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
import { DateRangePicker } from "@nextui-org/date-picker";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGetAllAccounts } from "../features/accountSlice";
import type {Selection} from "@nextui-org/react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { FormMoneyTransfer } from "../components/FormMoneyTransfer";
import {Tabs, Tab} from "@nextui-org/react";
import { ExpenseGetAllCategories, IncomeGetAllCategories } from "../features/expenseIncomeCategorySlice";
import { logout, refreshAccessToken } from "../features/authSlice";

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
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector(
    (state) => state.expenseIncomeCategory
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshAccessToken())
        .unwrap()
        .catch((error) => {
          console.error("Failed to refresh token:", error);
            dispatch(logout());
        });
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
    dispatch(IncomeGetAllCategories());
  }, []);

  useEffect(() => {
    if (allAccounts && allAccounts.length > 0) {
      setSelectedKeys(new Set([allAccounts[0].name]));
    }
  }, [allAccounts]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  const selectedIndex = useMemo(() => {
    const key = Array.from(selectedKeys).join(", ");
    return key.split("-")[0] || ""; // Индекс до `-`
  }, [selectedKeys]);

  console.log(selectedIndex)

  return (
    <>
    {isLoading || !allAccounts ? (
     <div className="flex items-center justify-center bg-primary-600 h-[1200px] w-full"></div>
    ): (
    <div className="flex flex-col items-center w-full bg-primary-600 min-h-screen">
        {/* dashboard */}
      <div className="flex flex-col lg:flex-row gap-6 p-10 font-sans xl:px-24 pt-24 w-full animate-fadeIn">
        
           {/* account data */}
        <div className="flex-2 ">
          <div className="flex flex-col text-white gap-6 bg-gray-700 rounded-lg p-6 md:p-10 shadow-lg">
            <div className="flex flex-col gap-6 md:flex-row md:justify-between">
              <div className="text-3xl min-w-[240px]">
                Balance: {allAccounts[1].balance + "$"}
              </div>

              <div className="flex flex-row gap-4">
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="capitalize text-white" variant="bordered" >
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
            </div>
                  {/* transactions */}
              <div className="flex flex-col gap-1 lg:max-w-[400px] pt-2">
                <Tabs aria-label="Options" color="primary" radius="full" size="md">
                  <Tab key="Add Income" title="Add Income">
                    <FormMoneyTransfer
                        allAccounts={allAccounts}
                        category={incomeCategoryAll}
                      />
                  </Tab>
                  <Tab key="Add Expense" title="Add Expense">
                    <FormMoneyTransfer
                        allAccounts={allAccounts}
                        category={expenseCategoryAll}
                      />
                  </Tab>
                </Tabs>
              </div>
          </div>
        </div>

              {/* Main Chart with filter */}
        <div className="flex-1 flex flex-col gap-6 bg-gray-700 rounded-lg p-6 md:p-10 shadow-lg">
          <Line
            data={lineData}
            options={lineOptions}
            plugins={[backgroundPlugin]}
            className="flex rounded-lg shadow-lg"
         />
           
          <DateRangePicker className="max-w-xs" label="Time Range" variant="flat" />

        </div>
  
      </div>
            
        {/* Charts */}
      {/* <div className="mt-10">
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
      </div> */}
    </div>
    )}
  </>
  );
};
