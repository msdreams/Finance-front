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
  sort: string;
  filterTransactionsDto?: {
    accountId?: string;
    fromDate?: string;
    toDate?: string;
    categoryIds?: string[];
  };
};

export type DataAllIncomeForChartsMY = {
  accountId: number,
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
  const queryParams = new URLSearchParams({
    page: data.page.toString(),
    size: data.size.toString(),
    sort: data.sort
  });
  if (data.filterTransactionsDto) {
    const { accountId, fromDate, toDate, categoryIds } = data.filterTransactionsDto;
      if (accountId) queryParams.append('accountId', accountId);
      if (fromDate) queryParams.append('fromDate', fromDate);
      if (toDate) queryParams.append('toDate', toDate);
      if (categoryIds && categoryIds.length > 0) queryParams.append('categoryIds', categoryIds.join(','));
  }

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
  const { accountId, filterType } = data;
  
  const queryParams = new URLSearchParams({
    accountId: accountId.toString(),
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
    const queryParams = new URLSearchParams({
      page: data.page.toString(),
      size: data.size.toString(),
      sort: data.sort
    });
    if (data.filterTransactionsDto) {
      const { accountId, fromDate, toDate, categoryIds } = data.filterTransactionsDto;
        if (accountId) queryParams.append('accountId', accountId);
        if (fromDate) queryParams.append('fromDate', fromDate);
        if (toDate) queryParams.append('toDate', toDate);
        if (categoryIds && categoryIds.length > 0) queryParams.append('categoryIds', categoryIds.join(','));
    }

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

  return client.deleteById(`/income-transactions/delete-income/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  });
};

export const TransactionsDeleteExpense = (id: string, accessToken: string) => {

  return client.deleteById(`/expense-transactions/delete-expense/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  });
};