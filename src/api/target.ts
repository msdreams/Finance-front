import { client } from "../utils/fetchClient"

export type DataAddTarget = {
  name: string,
  expectedSum: number,
  achievedBefore: string,
  currency: string,
}

export type DataReplenishTarget = {
  fromAccountId: number,
  toTargetId: number,
  sumOfReplenishment: number,
}

export type DataDeleteTarget = {
  targetId: number,
  accountId: number,
}

export type DataAllTarget = {
  page: number,
  size: number,
  sort: string[],
}

export const replenishTarget = (data: DataReplenishTarget, accessToken: string) => {
  return client.post('/targets/replenish-target', data, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const addTarget = (data: DataAddTarget, accessToken: string) => {
  return client.post('/targets/add-target', data, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAllTargets = (data: DataAllTarget, accessToken: string) => {
  return client.get(`/account/get-all-accounts?page=${data.page}&size=${data.size}`, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const deleteBudget = (data: DataDeleteTarget, accessToken: string) => {
  return client.delete(`/targets/destroy-target`, data, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}