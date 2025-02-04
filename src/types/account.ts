export type AccountPut = {
  id: number;
  name: string;
  balance: number;
  currency: string;
  byDefault: boolean;
}

export type AccountApdadte = {
  newName: string;
}

export type AccountApdadteData = {
  id: string;
  data: AccountApdadte;
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

export interface Transfer {
  id: number;
  comment: string;
  amount: number;
  transactionDate: string;
  fromAccountId: number;
  toAccountId: number;
}

export type GetAllTransfers = {
  "pageNumber": number,
  "pageSize": number,
  "elementsPresentOnPage": number,
  "totalElements": number,
  "totalPages": number,
  "transactionsPageDtoList": Transfer[] | []
}

export type Account = {
  id: number;
  name: string;
  balance: number;
  currency: string;
  byDefault: boolean;
}

export type GetAllAccounts = Account[];