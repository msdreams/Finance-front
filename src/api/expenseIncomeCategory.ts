import { AddCategory, AllCategories } from "../types/expenseIncomeCategory";
import { client } from "../utils/fetchClient"
import { DataAllTarget } from "./target";

export type DataNewName = {
  newName: string;
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

export const IncomeAddCategory = (data: DataNewName, accessToken: string): Promise<AddCategory> => {
  return client.post(`/income-categories/add-category`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const ExpenseAddCategory = (data: DataNewName, accessToken: string): Promise<AddCategory> => {
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
  return client.delete(`/income-categories/delete-category/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const expenseDeleteCategory = (id: string, accessToken: string) => {
  return client.delete(`/expense-categories/delete-category/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}
