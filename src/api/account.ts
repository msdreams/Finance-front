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

export const UpdateAccount = (id: string, accessToken: string) => {
  return client.put(`/account/update-account/${id}`, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const SetAccountByDefault = (id: string, accessToken: string) => {
  return client.put(`/account/set-account-by-default/${id}`, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const addTransfer = (data: DataAddTransfer, accessToken: string) => {
  return client.post('/transfer/add-transfer', data, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}
export const addAccount = (data: DataAddAccount, accessToken: string) => {
  return client.post('/account/add-account', data, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAllTransfers = (data: DataAllTarget, accessToken: string) => {
  return client.get(`/transfer/get-all-transfers?page=${data.page}&size=${data.size}`, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAllAccounts = (accessToken: string) => {
  return client.get('/account/get-all-accounts', {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAccountById = (id: string, accessToken: string) => {
  return client.get(`/account/get-account-by-id/${id}`, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAccountByDefault = (accessToken: string) => {
  return client.get('/account/get-account-by-default', {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}
