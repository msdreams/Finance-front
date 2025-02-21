import { TbCashOff } from "react-icons/tb"; 
import { TbCash } from "react-icons/tb"; 
import { Account } from "../../types/account"
import { CategoriesChartIncome } from "./CategoriesChartIncome"
import { useCallback, useMemo, useState } from "react";
import { processData } from "../../Hendlers/FilterCategoriesData";
import { CategoriesChartExpense } from "./CategoriesChartExpense";
import { SumByCategory } from "../../types/expenseIncomeTransaction";
import { ChartSelector } from "../ChartSelector";
import { MonthCategoryType } from "../../Hendlers/filterCategiryesData";

type Props = {
  currentAccount: Account,
  incomeFiltered: SumByCategory[] | undefined,
  expenseFiltered: SumByCategory[] | undefined,
  CategoriesExpenseByMonth: MonthCategoryType[],
  CategoriesIncomeByMonth:  MonthCategoryType[],
}

export const CategoriesCharts: React.FC<Props> = ({
  currentAccount, 
  incomeFiltered, 
  expenseFiltered, 
  CategoriesExpenseByMonth,
  CategoriesIncomeByMonth
}) => {
  const [selectedChart, setSelectedChart] = useState<"INCOME" | "EXPENSE">("INCOME");


  const handleChartSelect = useCallback((chart: "INCOME" | "EXPENSE") => {
    setSelectedChart(chart);
  }, []);

  const incomeData = useMemo(() => processData(incomeFiltered, "Income", currentAccount.currency), [
    incomeFiltered,
    currentAccount.currency,
  ]);

  const expenseData = useMemo(() => processData(expenseFiltered, "Expense", currentAccount.currency), [
    expenseFiltered,
    currentAccount.currency,
  ]);

  return (
    <div className="flex pt-4 flex-col items-start gap-4 xl:flex-row">
      <div className="w-full flex flex-col">
        <div className="flex flex-row gap-8">
        <div className="flex flex-row gap-4">
          <ChartSelector
            label="INCOME"
            icon={<TbCash size={24} />}
            selectedChart={selectedChart}
            onSelect={handleChartSelect}
          />
          <ChartSelector
            label="EXPENSE"
            icon={<TbCashOff size={22} />}
            selectedChart={selectedChart}
            onSelect={handleChartSelect}
          />
        </div>
      </div>
        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-0">
        {selectedChart === "INCOME" ? (
            <CategoriesChartIncome incomeData={incomeData} filteredIncomeData={CategoriesIncomeByMonth} />
          ) : (
            <div className="w-full">
                <CategoriesChartExpense
                  currentAccount={currentAccount}
                  filteredExpenseData={CategoriesExpenseByMonth}
                  expenseData={expenseData}
                />
            </div>
        )}
        </div>
      </div>
  </div>
  )
}