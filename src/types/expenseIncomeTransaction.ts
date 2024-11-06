export type Transaction = {
  id: number;
  comment: string;
  amount: number;
  transactionDate: string; 
  accountId: number;
  categoryId: number;
};

export type SumByCategory = {
  sumByDateOrCategory: string;
  sum: number;
};

export type SumsByDate = {
  localDate: string;
  sumsByCategory: SumByCategory[];
};

export type Transactions = Transaction[];

export type SumsByDateArray = SumsByDate[];
