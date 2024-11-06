import { TargetAdd } from "../types/target"
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

export const replenishTarget = (data: DataReplenishTarget, accessToken: string): Promise<TargetAdd> => {
  return client.post('/targets/replenish-target', data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const addTarget = (data: DataAddTarget, accessToken: string): Promise<TargetAdd> => {
  return client.post('/targets/add-target', data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAllTargets = (data: DataAllTarget, accessToken: string): Promise<TargetAdd> => {
  const { page, size } = data;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  return client.get(`/account/get-all-accounts?${queryParams.toString()}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const deleteBudget = (data: DataDeleteTarget, accessToken: string) => {
  return client.delete(`/targets/destroy-target`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}