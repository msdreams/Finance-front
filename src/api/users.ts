import { userChangePassword, userLogin, userRegister } from "../types/userRegister"
import { client } from "../utils/fetchClient"

export type UserResponse = {
  accessToken: string,
  refreshToken: string,
}

export type UserResponseR = {
  message: string;
}

export const createUser = (data: userRegister): Promise<UserResponseR> => {
  return client.post('/auth/register', data)
}

export const LoginUser = (data: userLogin): Promise<UserResponse> => {
  return client.post('/auth/login', data)
}

export const changePassword = (data: userChangePassword, accessToken: string): Promise<UserResponseR> => {
  return client.post('/auth/change-password', data, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  });
};
