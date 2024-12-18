import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { forgorPassword } from "../../features/authSlice";
import { Button } from "@nextui-org/react";

type Props = {
  setActiveEmailModal: React.Dispatch<
    React.SetStateAction<"LoginEm" | "RegisterEm" | "LoginTg" | null>
  >;
  setModal: React.Dispatch<React.SetStateAction<"Login" | "Register">>;
};

export const LoginModal: React.FC<Props> = ({
  setModal,
  setActiveEmailModal,
}) => {
  const [inputFPassword, setInputFPassword] = useState("");
  const [fPassword, setFPassword] = useState(false);
  const dispatch = useAppDispatch();

  const forgotPasswordHandle = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(forgorPassword({ email: inputFPassword }));
  };
  return (
    <div className="flex flex-col justify-center w-full space-y-4">
      {!fPassword ? (
        <div className="flex flex-col w-full max-w-xs gap-4">
          <h1 className=" text-2xl font-sans font-bold">
            Log In
          </h1>

          <Button
            className="font-sans"
            onPress={() => setActiveEmailModal("LoginEm")}
            color="primary"
            size="md"
          >
            <img src="./img/email-button.svg" alt="Email login" />
            Log in with Email
          </Button>

          <Button
            className="font-sans"
            onPress={() => setActiveEmailModal("LoginTg")}
            color="primary"
            size="md"
          >
              <img src="./img/telegram.svg" alt="Telegram login" />
              Log in with Telegram
          </Button>
            <p
              className="login__modal--forgot"
              onClick={() => setFPassword(true)}
            >
              Forgot password
            </p>
        </div>
      ) : (
        <form className="reg--email" onSubmit={forgotPasswordHandle}>
          <input
            className="reg--email-input"
            value={inputFPassword}
            onChange={(e) => setInputFPassword(e.target.value)}
            type="email"
            placeholder="email"
            required
          />
          <button className="button-s" style={{ marginBottom: "20px" }} type="submit">
            Recover
          </button>
        </form>
      )}

      <div className="flex flex-col justify-center items-center h-4">
        <div
          onClick={() => setModal("Register")}
          className="flex flex-row items-center justify-center cursor-pointer hover:border-b-1"
        >
          <img  className="pb-2 align-baseline" src="./img/work-email-button.svg" alt="Work email" />
          <span className="align-baseline">Register</span>
        </div>
      </div>
    </div>
  );
};
