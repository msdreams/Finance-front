import { client } from "../utils/fetchClient"
import { DataAllTarget } from "./target";

export type DataNewName = {
  newName: string;
}

export const IncomeUpdateCategory = (id: string, data: DataNewName, accessToken: string) => {
  return client.put(`/income-categories/update-category/${id}`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const ExpenseUpdateCategory = (id: string, data: DataNewName, accessToken: string) => {
  return client.put(`/expense-categories/update-category/${id}`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const IncomeAddCategory = (data: DataNewName, accessToken: string) => {
  return client.post(`/income-categories/add-category`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const ExpenseAddCategory = (data: DataNewName, accessToken: string) => {
  return client.post(`/expense-categories/add-category`, data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const IncomeGetAllCategories = (data: DataAllTarget, accessToken: string) => {
  const { page, size } = data;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  return client.get(`/income-categories/get-all-categories?${queryParams.toString()}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const ExpenseGetAllCategories = (data: DataAllTarget, accessToken: string) => {
  const { page, size } = data;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  return client.get(`/expense-categories/get-all-categories?${queryParams.toString()}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const IncomeDeleteCategory = (id: string, accessToken: string) => {
  return client.delete(`/income-categories/delete-category/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}

export const ExpenseDeleteCategory = (id: string, accessToken: string) => {
  return client.delete(`/expense-categories/delete-category/${id}`, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
}
