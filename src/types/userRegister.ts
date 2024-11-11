export type userRegister = {
  email: string,
  password: string,
  repeatPassword: string,
};

export type userLogin = {
  userName: string,
  password: string,
};

export type userChangePassword = {
  currentPassword: string,
  newPassword: string,
  repeatNewPassword: string,
}

export type ForgotPasswordType = {
  email: string,
}