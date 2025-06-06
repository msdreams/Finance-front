import { AddCategory, AllCategories } from "../types/expenseIncomeCategory";
import { client } from "../utils/fetchClient"

export type DataNewName = {
  newName: string;
}
export type DataName = {
  name: string;
}

export const incomeUpdateCategory = (id: string, data: DataNewName, accessToken: string): Promise<AddCategory> => {
  return client.put(`/income-categories/update-category/${id}`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const expenseUpdateCategory = (id: string, data: DataNewName, accessToken: string): Promise<AddCategory> => {
  return client.put(`/expense-categories/update-category/${id}`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const IncomeAddCategory = (data: DataName, accessToken: string): Promise<AddCategory> => {
  return client.post(`/income-categories/add-category`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const ExpenseAddCategory = (data: DataName, accessToken: string): Promise<AddCategory> => {
  return client.post(`/expense-categories/add-category`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const incomeGetAllCategories = (accessToken: string): Promise<AllCategories> => {

  return client.get(`/income-categories/get-all-categories`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const expenseGetAllCategories = (accessToken: string): Promise<AllCategories> => {

  return client.get(`/expense-categories/get-all-categories`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const incomeDeleteCategory = (id: string, accessToken: string) => {
  return client.deleteById(`/income-categories/delete-category/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const expenseDeleteCategory = (id: string, accessToken: string) => {
  return client.deleteById(`/expense-categories/delete-category/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}
