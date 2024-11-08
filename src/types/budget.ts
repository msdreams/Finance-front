export type BudgetAdd = {
  id: number;
  name: string;
  fromDate: string;
  toDate: string;
  categoryId: number;
  limitSum: number;
  currentSum: number;
  exceeded: boolean;
}