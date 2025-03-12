import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userChangePassword } from "../types/userRegister";
import { changePasswordUser } from "../features/authSlice";
import { Form, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../Components";

export const ChangePassword = () => {
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isRepeatNewPasswordVisible, setIsRepeatNewPasswordVisible] = useState(false);

  const toggleCurrentPasswordVisibility = () => setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
  const toggleRepeatNewPasswordVisibility = () => setIsRepeatNewPasswordVisible(!isRepeatNewPasswordVisible);

  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formData: userChangePassword = {
      currentPassword: String(data.currentPassword),
      newPassword: String(data.newPassword),
      repeatNewPassword: String(data.repeatNewPassword),
    };

    dispatch(changePasswordUser(formData))
      .unwrap()
      .then(() => setSuccessMessage("New password has been set successfully"));
  };

  return (
    <>
      <div className="flex flex-col w-full gap-2 max-w-xl font-sans">
        <h2>Change password</h2>
        <Form
          className="flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            className="text-gray-500"
            errorMessage="Please enter a valid current password"
            validationBehavior="native"
            name="currentPassword"
            placeholder="Enter your current password"
            type={isCurrentPasswordVisible ? "text" : "password"}
            endContent={
              <button
                aria-label="toggle current password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleCurrentPasswordVisibility}
              >
                {isCurrentPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Input
            isRequired
            className="text-gray-500"
            errorMessage="Please enter a new password"
            name="newPassword"
            placeholder="Enter your new password"
            type={isNewPasswordVisible ? "text" : "password"}
            endContent={
              <button
                aria-label="toggle new password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleNewPasswordVisibility}
              >
                {isNewPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Input
            isRequired
            className="text-gray-500"
            errorMessage="Please repeat a new password"
            name="repeatNewPassword"
            placeholder="Repeat your new password"
            type={isRepeatNewPasswordVisible ? "text" : "password"}
            endContent={
              <button
                aria-label="toggle repeat new password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleRepeatNewPasswordVisibility}
              >
                {isRepeatNewPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />

          <Button color="primary" type="submit">
            Change password
          </Button>
        </Form>
      </div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p className="text-warning-400 text-lg">{error}</p>}
    </>
  );
};

