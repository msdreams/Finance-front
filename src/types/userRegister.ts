export type userRegister = {
  email: string,
  password: string,
  repeatPassword: string,
};

export type userLoginEmail =
  { email: string; password: string }

export type userLoginTelegramm =
{ phoneNumber: string; password: string };

export type userLoginType =
 | userLoginEmail
| userLoginTelegramm;

export type userChangePassword = {
  currentPassword: string,
  newPassword: string,
  repeatNewPassword: string,
}

export type ForgotPasswordType = {
  email: string,
}