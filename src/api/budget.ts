import { client } from "../utils/fetchClient"

export type DataAddBudget = {
  name: string,
  fromDate: string,
  toDate: string,
  categoryIds: number[],
  limitSum: string,
}

export const addBudget = (data: DataAddBudget, accessToken: string) => {
  return client.post('/budgets/add-budget', data, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getTopLvlBudget = (accessToken: string) => {
  return client.get('/budgets/get-top-level-budget', {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAllBudget = (accessToken: string) => {
  return client.get('/budgets/get-all-budgets', {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const deleteBudget = (id: string, accessToken: string) => {
  return client.delete(`/budgets/delete-budget/${id}`, {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}