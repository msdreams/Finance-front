import { Tabs, Tab } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { CashFlowChart } from "./Charts/CashFlowChart";
import { Accounts } from "./Accounts";
import { useEffect, useMemo, useState } from "react";
import { Account } from "../types/account";
import { fetchGetAllAccounts } from "../features/accountSlice";
import { CategoriesCharts } from "./Charts/CategoriesCharts";
import { useMediaQuery } from "react-responsive";
import { fetchAllExpensesForChartsM, fetchAllExpensesForChartsY, fetchAllIncomesForChartsM, fetchAllIncomesForChartsY } from "../features/expenseIncomeTransactionSlice";
import { SingleSelect } from "./SingleSelect";
import { filteredAreaData } from "../Hendlers/FilterAreaData";
import { GetArrayOfYears } from "../Hendlers/GetArrayOfYears";
import { filterCategoriesData } from "../Hendlers/filterCategiryesData";

export const MainChartBlock = () => {
  const dispatch = useAppDispatch();
  const allAccounts = useAppSelector((state: RootState) => state.account.allAccounts);
  const [account, setAccount] = useState<Account | null>(null);
  const allExpensesM = useAppSelector((state) => state.expenseIncomeTransaction.allExpensesM);
  const allIncomesM = useAppSelector((state) => state.expenseIncomeTransaction.allIncomesM);
  const allExpensesY = useAppSelector((state) => state.expenseIncomeTransaction.allExpensesY);
  const allIncomesY = useAppSelector((state) => state.expenseIncomeTransaction.allIncomesY);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  const allYears = GetArrayOfYears(allExpensesY, allIncomesY)
  const [selectedYear, setSelectedYear] = useState(() => {
  return allYears.length > 0 ? allYears[allYears.length - 1] : new Date().getFullYear().toString();
  });

    useEffect(() => {
      dispatch(fetchGetAllAccounts());
    }, [dispatch]);
  
    useEffect(() => {
      if (account) {
        dispatch(fetchAllIncomesForChartsY({
          accountId: account.id,
          filterType: "YEAR",
        }));
        dispatch(fetchAllExpensesForChartsY({
          accountId: account.id,
          filterType: "YEAR",
        }));
      }
    }, [account, dispatch]);
  
    
    useEffect(() => {
      if (!account) return;
      
      dispatch(fetchAllIncomesForChartsM({
        accountId: account.id,
        filterType: "MONTH"
      }));
      
      dispatch(fetchAllExpensesForChartsM({
        accountId: account.id,
        filterType: "MONTH"
      }));
    }, [account, dispatch]);
    
    const CashFlowByMonth = useMemo(
      () => filteredAreaData(allIncomesM, allExpensesM), 
      [allIncomesM, allExpensesM]
    );
  
  const CategoriesIncomeByMonth = useMemo(() => filterCategoriesData(allIncomesM), [allIncomesM]);
  const CategoriesExpenseByMonth = useMemo(() => filterCategoriesData(allExpensesM),[allExpensesM]);
    
    const incomeFiltered = allIncomesY?.find(acc => acc.localDate.slice(0, 4) === selectedYear)?.sumsByCategory
    const expenseFiltered = allExpensesY?.find(acc => acc.localDate.slice(0, 4) === selectedYear)?.sumsByCategory
  
  return (
    <div
      aria-label="Tabs"
      className="relative flex flex-col text-white p-4 pt-6 lg:px-8 lg:pb-0"
    >
      {allAccounts && (
        <>
          <div className="mb:flex-row pb-4 md:absolute right-4 md:right-36 top-6">
            <Accounts
              allAccounts={allAccounts}
              setAccount={setAccount}
              account={account || allAccounts[0]}
            />
          </div>
          <div className="mb:flex-row pb-4 md:absolute right-4 md:right-8 top-6">
            <SingleSelect
              options={allYears}
              selectedValue={selectedYear}
              onChange={setSelectedYear}
              label=""
            />
          </div>
        <Tabs
          {...(isMobile ? { fullWidth: true } : {})}
          className="animate-fadeIn"
          aria-label="Charts area"
          color="primary"
          size={isMobile ? "sm" : "md"}
        >
          
            <Tab key="Cash Flow" aria-label="Cash Flow" title="Cash Flow">
              <CashFlowChart filteredData={CashFlowByMonth} currentAccount={account || allAccounts[0]} />
            </Tab>
          <Tab
            key="Categories"
            aria-label="Categories"
            title="Categories"
            >
              <div>
                <CategoriesCharts
                  currentAccount={account || allAccounts[0]}
                  incomeFiltered={incomeFiltered}
                  expenseFiltered={expenseFiltered}
                  CategoriesIncomeByMonth={CategoriesIncomeByMonth}
                  CategoriesExpenseByMonth={CategoriesExpenseByMonth}
                />
              </div>
          </Tab>
        </Tabs>
        </>
      )}
    </div>
  )
}