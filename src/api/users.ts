import { Data } from "../types/userRegister"
import { client } from "../utils/fetchClient"

export type UserResponse = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
}

export const createUser = (data: Data): Promise<UserResponse> => {
  return client.post('/auth/register', data)
}