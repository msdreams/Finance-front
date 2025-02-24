import { SumsByDateArray } from "../types/expenseIncomeTransaction";
export interface MonthCategoryType {
  date: string;
  [key: string]: number | string;
}

export const filterCategoriesData = (data: SumsByDateArray | null, year: number): MonthCategoryType[] => {
  if (!data) return [];

  return data
    .filter((entry) => new Date(entry.localDate).getFullYear() === year)
    .map((entry) => {
    const transformedEntry: Partial<MonthCategoryType> = { date: entry.localDate };

      entry.sumsByCategory.forEach(({ sumByDateOrCategory, sum }) => {
        let category = sumByDateOrCategory;

        if (category === "Target Replenishment") {
          category = category.slice(0,6);
        }

        if (category !== "Sum") {
          (transformedEntry as Record<string, number>)[category] = sum;
        }
    });

    return transformedEntry as MonthCategoryType;
  });
};
