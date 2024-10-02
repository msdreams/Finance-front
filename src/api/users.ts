import { Data } from "../types/userRegister"
import { client } from "../utils/fetchClient"

export const createUser = (data: Data) => {
  return client.post('/auth/register', data)
}