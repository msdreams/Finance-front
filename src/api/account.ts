import { AccountAddAccount, AccountAddTransfer, AccountPut, GetAllAccounts, GetAllTransfers } from "../types/account";
import { client } from "../utils/fetchClient";
import { DataAllTarget } from "./target";

export type AccountResponse = {
  userId: number;
  name: string;
  balance: number;
  currency: string;
  byDefault: boolean;
}

export type DataAddAccount = {
  name: string,
  balance: number,
  currency: string
}

export type DataAddTransfer = {
  comment: string,
  amount: number,
  transactionDate: string,
  fromAccountId: number,
  toAccountId: number,
}

export const UpdateAccount = (id: string, accessToken: string): Promise<AccountPut> => {
  return client.put(`/account/update-account/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const SetAccountByDefault = (id: string, accessToken: string): Promise<AccountPut> => {
  return client.put(`/account/set-account-by-default/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const addTransfer = (data: DataAddTransfer, accessToken: string): Promise<AccountAddTransfer> => {
  return client.post('/transfer/add-transfer', data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}
export const addAccount = (data: DataAddAccount, accessToken: string): Promise<AccountAddAccount> => {
  return client.post('/account/add-account', data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAllTransfers = (data: DataAllTarget, accessToken: string): Promise<GetAllTransfers> => {
  const { page, size } = data;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  return client.get(`/transfer/get-all-transfers?${queryParams.toString()}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAllAccounts = (accessToken: string): Promise<GetAllAccounts> => {
  return client.get('/account/get-all-accounts', {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAccountById = (id: string, accessToken: string): Promise<AccountAddAccount> => {
  return client.get(`/account/get-account-by-id/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAccountByDefault = (accessToken: string): Promise<AccountAddAccount> => {
  return client.get('/account/get-account-by-default', {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}
