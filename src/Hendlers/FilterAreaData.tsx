import { MonthChartDataType, SumsByDateArray } from "../types/expenseIncomeTransaction";

export const filteredAreaData = (allIncomesMY: SumsByDateArray | null, allExpensesMY: SumsByDateArray | null) => {
  const mergedData: Record<string, MonthChartDataType> = {};

  allIncomesMY?.forEach(({ localDate, sumsByCategory }) => {
    const date = localDate.slice(0, 7);
    const income = sumsByCategory[0]?.sum || 0;
    if (!mergedData[date]) {
      mergedData[date] = { date, income, expense: 0 };
    } else {
      mergedData[date].income += income;
    }
  });

  allExpensesMY?.forEach(({ localDate, sumsByCategory }) => {
    const date = localDate.slice(0, 7);
    const expense = sumsByCategory[0]?.sum || 0;
    if (!mergedData[date]) {
      mergedData[date] = { date, income: 0, expense };
    } else {
      mergedData[date].expense += expense;
    }
  });

  return Object.values(mergedData);
};
