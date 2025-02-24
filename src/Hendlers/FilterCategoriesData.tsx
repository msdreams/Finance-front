import { DataPieType, SumByCategory } from "../types/expenseIncomeTransaction";

export const processData = (
  data: SumByCategory[] | undefined,
  type: "Income" | "Expense",
  currency: string,
): DataPieType[] => {
  if (!data) {
    return [];
  }
  return data
    .filter(d => d.sumByDateOrCategory !== "Sum")
    .map(item => {
      let category = item.sumByDateOrCategory;

      if (category === "Target Replenishment") {
        category = category.slice(0,6);
      }

      return {
        ...item,
        sumByDateOrCategory: category,
        type,
        currency,
      };
    });
};
