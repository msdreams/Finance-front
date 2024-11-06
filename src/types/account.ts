export type AccountPut = {
  id: number;
  name: string;
  balance: number;
  currency: string;
  byDefault: boolean;
}

export type AccountAddTransfer = {
  id: number;
  comment: string;
  amount: number;
  transactionDate: string;
  fromAccountId: number;
  toAccountId: number;
}

export type AccountAddAccount = {
  id: number;
  name: string;
  balance: number;
  currency: string;
  byDefault: boolean;
}

interface Transaction {
  id: number;
  comment: string;
  amount: number;
  transactionDate: string;
  fromAccountId: number;
  toAccountId: number;
}

export type GetAllTransfers = Transaction[];

interface Account {
  id: number;
  name: string;
  balance: number;
  currency: string;
  byDefault: boolean;
}

export type GetAllAccounts = Account[];