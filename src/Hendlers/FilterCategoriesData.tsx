import { DataPieType, SumByCategory } from "../types/expenseIncomeTransaction";

export const processData = (
  data: SumByCategory[] | undefined,
  type: "Income" | "Expense",
  currency: string,
): DataPieType[] => {
  if (!data) {
    return [];
  }
  return (
    data?.filter(d => d.sumByDateOrCategory !== "Sum")).map(item => ({
    ...item,
    type,
    currency
  }));
};
