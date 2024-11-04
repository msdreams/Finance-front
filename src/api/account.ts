import { client } from "../utils/fetchClient";

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

export type DataSetAccountByDefault = {
  name: string,
}

export const UpdateAccount = (id: string, accessToken: string) => {
  return client.put(`/account/update-account/${id}`, {
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

export const SetAccountByDefault = (data: DataSetAccountByDefault, accessToken: string) => {
  return client.put('/account/set-account-by-default', data, {
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

export const getAccountByDefault = (accessToken: string) => {
  return client.get('/account/get-account-by-default', {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}
