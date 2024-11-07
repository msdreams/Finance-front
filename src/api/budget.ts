import { BudgetAdd } from "../types/budget"
import { client } from "../utils/fetchClient"

export type DataAddBudget = {
  name: string,
  fromDate: string,
  toDate: string,
  categoryIds: string,
  limitSum: string,
}

export const addBudget = (data: DataAddBudget, accessToken: string): Promise<BudgetAdd> => {
  return client.post('/budgets/add-budget', data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getTopLvlBudget = (accessToken: string): Promise<BudgetAdd> => {
  return client.get('/budgets/get-top-level-budget', {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const getAllBudget = (accessToken: string): Promise<BudgetAdd[]> => {
  return client.get('/budgets/get-all-budgets', {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}

export const deleteBudget = (id: string, accessToken: string) => {
  return client.delete(`/budgets/delete-budget/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  })
}