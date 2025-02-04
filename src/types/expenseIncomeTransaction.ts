export type Transaction = {
  id: number;
  comment: string;
  amount: number;
  transactionDate: string; 
  accountId: number;
  categoryId: number;
  accountName: string;
  categoryName: string;
  currency: string;
};

export type SumByCategory = {
  sumByDateOrCategory: string;
  sum: number;
};

export type SumsByDate = {
  localDate: string;
  sumsByCategory: SumByCategory[];
};

export type Transactions = {
  "pageNumber": number,
  "pageSize": number,
  "elementsPresentOnPage": number,
  "totalElements": number,
  "totalPages": number,
  "transactionsPageDtoList": Transaction[] | [],
};

export type SumsByDateArray = SumsByDate[];
