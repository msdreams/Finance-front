export type BudgetAdd = {
  id: number;
  name: string;
  fromDate: string;
  toDate: string;
  categoryIds: number[];
  limitSum: number;
  currentSum: number;
  exceeded: boolean;
}