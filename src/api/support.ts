import { mailToSupportType } from "../types/userRegister"
import { client } from "../utils/fetchClient"
import { UserResponseF } from "./users"

export const mailToSupport = (data: mailToSupportType): Promise<UserResponseF> => {
  return client.post('/support/send-request-to-email', data)
}