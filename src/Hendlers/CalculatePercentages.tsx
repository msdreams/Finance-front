import { DataPieType } from "../types/expenseIncomeTransaction";

export const calculatePercentages = (data: DataPieType[]) => {
  const total = data.reduce((acc, entry) => acc + entry.sum, 0);
  return data.map(entry => ({
    ...entry,
    percentage: total > 0 ? ((entry.sum / total) * 100).toFixed(2) : 0,
  }));
};