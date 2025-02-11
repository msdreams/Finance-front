import { Tabs, Tab } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AllSpendingChart } from "./Charts/AreaChart";

export const MainChart = () => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector((state: RootState) => state.account.loading);
  const allAccounts = useAppSelector((state: RootState) => state.account.allAccounts);
  
  return (
    <div
      aria-label="Tabs"
      className="flex flex-col text-white p-4 md:px-8 md:pt-6 md:pb-0"
    >
      <Tabs
        className="animate-fadeIn"
        aria-label="Charts area"
        color="primary"
        size="md"
      >
        
          <Tab key="Spendings" aria-label="Spendings" title="Spendings">
            <AllSpendingChart />
          </Tab>
        <Tab key="Edit Account" aria-label="Edit Account" title="Accounts">
        </Tab>
        <Tab
          key="Edit Categories"
          aria-label="Edit Categories"
          title="Categories"
        >
        </Tab>
      </Tabs>
    </div>
  )
}