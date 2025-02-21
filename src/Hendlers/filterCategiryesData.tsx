import { SumsByDateArray } from "../types/expenseIncomeTransaction";
export interface MonthCategoryType {
  date: string;
  [key: string]: number | string; // Allow `date` to be a string, others to be numbers
}

export const filterCategoriesData = (data: SumsByDateArray | null): MonthCategoryType[] => {
  if (!data) return [];

  return data.map((entry) => {
    const transformedEntry: Partial<MonthCategoryType> = { date: entry.localDate }; // date is a string

    entry.sumsByCategory.forEach(({ sumByDateOrCategory, sum }) => {
      if (sumByDateOrCategory !== "Sum") {
        (transformedEntry as Record<string, number>)[sumByDateOrCategory] = sum;
      }
    });

    return transformedEntry as MonthCategoryType; // Casting to MonthCategoryType
  });
};
