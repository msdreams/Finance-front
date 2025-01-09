import { SumsByDateArray, Transaction, Transactions }
  from "../types/expenseIncomeTransaction";
import { client } from "../utils/fetchClient"

export type DataUpdate = {
  comment: string;
  amount: number;
  transactionDate: string;
  accountId: number;
  categoryId: number;
}
export type DataAllIncome = {
  page: number;
  size: number;
  filterTransactionsDto?: {
    accountId?: string;
    fromDate?: string; // Дата в формате строки, например "2024-10-29"
    toDate?: string;   // Дата в формате строки
    categoryIds?: string[]; // Массив строковых идентификаторов категорий
  };
};
export type DataAllIncomeForChartsMY = {
  accountId: number,
  categoryIds: number[],
  filterType: string;
};
export type DataAllIncomeForChartsDays = {
  fromDate: string;
  toDate: string;
};

export const TransactionsUpdateIncome = (id: string,
  data: DataUpdate, accessToken: string
): Promise<Transaction> => {
  return client.put(`/income-transactions/update-income/${id}`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const TransactionsUpdateExpense = (id: string, data: DataUpdate, accessToken: string): Promise<Transaction> => {
  return client.put(`/expense-transactions/update-expense/${id}`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const TransactionsAddIncome = (data: DataUpdate, accessToken: string): Promise<Transaction> => {
  return client.post(`/income-transactions/add-income`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const TransactionsAddExpense = (data: DataUpdate, accessToken: string): Promise<Transaction> => {
  return client.post(`/expense-transactions/add-expense`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const TransactionsAllIncome = (accessToken: string, data?: DataAllIncome): Promise<Transactions> => {
  if (data) {
    const { accountId = '', fromDate = '', toDate = '', categoryIds = [] } = data.filterTransactionsDto || {};

  const queryParams = new URLSearchParams({
    accountId,
    fromDate,
    toDate,
    categoryIds: categoryIds.length ? categoryIds.join(',') : '', // Пустая строка, если массив пуст
    page: data.page.toString(),
    size: data.size.toString()
  });

  return client.get(`/income-transactions/get-all-incomes?${queryParams.toString()}`, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  });
  } else {
    return client.get(`/income-transactions/get-all-incomes`, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  });
  }
};

export const TransactionsAllIncomeForChartsMY = (data: DataAllIncomeForChartsMY, accessToken: string): Promise<SumsByDateArray> => {
  const { accountId, categoryIds, filterType } = data;
  
  const queryParams = new URLSearchParams({
    accountId: accountId.toString(),
    categoryIds: categoryIds.length ? categoryIds.join(',') : '',
    filterType,
  })

  return client.get( `/income-transactions/get-all-incomes-for-charts-months-years?${queryParams.toString()}`, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  });
};

export const TransactionsAllIncomeForChartsDays = (data: DataAllIncomeForChartsDays, accessToken: string): Promise<SumsByDateArray> => {
  const { fromDate, toDate } = data;

  const queryParams = new URLSearchParams({
    fromDate,
    toDate,
  })

  return client.get(`/income-transactions/get-all-incomes-for-charts-months-days?${queryParams.toString()}`, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  });
};

export const TransactionsAllExpense = (accessToken: string, data?: DataAllIncome): Promise<Transactions> => {
  if (data) {
    const { accountId = '', fromDate = '', toDate = '', categoryIds = [] } = data.filterTransactionsDto || {};

  const queryParams = new URLSearchParams({
    accountId,
    fromDate,
    toDate,
    categoryIds: categoryIds.length ? categoryIds.join(',') : '',
    page: data.page.toString(),
    size: data.size.toString()
  });

  return client.get(`/expense-transactions/get-all-expenses?${queryParams.toString()}`, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  });
  } else {
    return client.get(`/expense-transactions/get-all-expenses`, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  });
  }
};

export const TransactionsAllExpenseForChartsMY = (data: DataAllIncomeForChartsMY, accessToken: string): Promise<SumsByDateArray> => {
  const { filterType } = data;
  const queryParams = new URLSearchParams({
    filterType
  });

  return client.get(`/expense-transactions/get-all-expenses-for-charts-months-years?${queryParams.toString()}`, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  });
};

export const TransactionsAllExpenseForChartsDays = (data: DataAllIncomeForChartsDays, accessToken: string): Promise<SumsByDateArray> => {
  const { fromDate, toDate } = data;

  const queryParams = new URLSearchParams({
    fromDate,
    toDate,
  });
  return client.get(`/expense-transactions/get-all-expenses-for-charts-months-days?${queryParams.toString()}`, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
  });
};

export const TransactionsDeleteIncome = (id: string, accessToken: string) => {

  return client.delete(`/income-transactions/delete-income/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  });
};


export const TransactionsDeleteExpense = (id: string, accessToken: string) => {

  return client.delete(`/expense-transactions/delete-expense/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  });
};