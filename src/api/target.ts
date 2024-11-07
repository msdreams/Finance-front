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

export const getAllTargets = (accessToken: string): Promise<TargetAdd> => {

  return client.get(`/targets/get-all-targets`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const deleteTarget = (data: DataDeleteTarget, accessToken: string) => {
  return client.delete(`/targets/destroy-target`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}