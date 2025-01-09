import { Transaction, Transactions } from "../types/expenseIncomeTransaction";

export const sortData = <T extends keyof Transaction>(data: Transactions, key: T, direction: string, statusFilter: string) => {
  const sorteData = [...data].sort((a, b) => {
    if (key === "transactionDate") {
      const dateA = new Date(a[key]);
      const dateB = new Date(b[key]);
      return direction === "ascending" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }

    const valueA = a[key];
    const valueB = b[key];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return direction === "ascending" ? valueA - valueB : valueB - valueA;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return direction === "ascending"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return 0;
  })

  if (statusFilter === "all") {
    return sorteData;
  } else {
    return sorteData.filter(data => Array.from(statusFilter).includes(data.categoryId.toString()))
    }
};
