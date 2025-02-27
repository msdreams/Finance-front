import { SumsByDateArray } from "../types/expenseIncomeTransaction";

export const GetArrayOfYears = (expenses: SumsByDateArray | null, incomes: SumsByDateArray | null): string[] => {
  const expenseYears = expenses?.map(item => item.localDate.slice(0, 4)) || [];
  const incomeYears = incomes?.map(item => item.localDate.slice(0, 4)) || [];

  const uniqueYears = Array.from(new Set([...expenseYears, ...incomeYears]));
  
  return uniqueYears.sort((a, b) => Number(b) - Number(a));
}