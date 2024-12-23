import { ForgotPasswordType, userChangePassword, userLoginType, userRegister } from "../types/userRegister"
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

export const LoginUser = (data: userLoginType): Promise<UserResponse> => {
  if ('email' in data && 'password' in data) {
    return client.post('/auth/login-email', data);
  } else {
    return client.post('/auth/login-telegram', data);
  }
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
