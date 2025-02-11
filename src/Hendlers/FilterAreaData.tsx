import { SumsByDateArray } from "../types/expenseIncomeTransaction";

export const filteredAreaData = (allIncomesMY: SumsByDateArray | null, allExpensesMY: SumsByDateArray | null) => {
  const filteredIncome = allIncomesMY?.map(data => ({
    date: data.localDate.slice(0, 7),
    income: data.sumsByCategory[0].sum
  })) || [];

  const filteredExpense = allExpensesMY?.map(data => ({
    date: data.localDate.slice(0, 7),
    expense: data.sumsByCategory[0].sum
  })) || [];

  const mergedData: any = {};

  filteredIncome.forEach(({ date, income }) => {
    if (!mergedData[date]) {
      mergedData[date] = { date, income, expense: 0 };
    } else {
      mergedData[date].income = income;
    }
  });

  filteredExpense.forEach(({ date, expense }) => {
    if (!mergedData[date]) {
      mergedData[date] = { date, income: 0, expense };
    } else {
      mergedData[date].expense = expense;
    }
  });

  return Object.values(mergedData);
};
