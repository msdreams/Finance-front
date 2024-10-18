import { ForgotPasswordType, userChangePassword, userLogin, userRegister } from "../types/userRegister"
import { client } from "../utils/fetchClient"

export type UserResponse = {
  accessToken: string,
  refreshToken: string,
}

export type UserResponseR = {
  message: string;
}
export type UserResponseF = {
  response: string;
}

export const createUser = (data: userRegister): Promise<UserResponseR> => {
  return client.post('/auth/register', data)
}

export const LoginUser = (data: userLogin): Promise<UserResponse> => {
  return client.post('/auth/login', data)
}

export const ForgotPassword = (data: ForgotPasswordType): Promise<UserResponseF> => {
  return client.post('/auth/forgot-password', data)
}

export const changePassword = (data: userChangePassword, accessToken: string): Promise<UserResponseR> => {
  return client.post('/auth/change-password', data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  });
};