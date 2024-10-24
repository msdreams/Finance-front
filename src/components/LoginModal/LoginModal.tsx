import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { forgorPassword } from "../../features/authSlice";

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
    <>
      {!fPassword ? (
        <>
          <h1 className="login__modal--text">
            Login <br /> in seconds
          </h1>
          <p className="login__modal--text-p">
            Use your email <br /> or other service to continue <br /> working
            with MONETA. It's free!
          </p>

          <div className="login__modal--buttons">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setActiveEmailModal("LoginEm")}
              className="login__modal--button"
            >
              <img src="./img/email-button.svg" alt="Email login" />
              Login with email
            </div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => setActiveEmailModal("LoginTg")}
              className="login__modal--button"
            >
              <img src="./img/telegram.svg" alt="Email login" />
              Login with Telegram
            </div>
            <p
              className="login__modal--forgot"
              onClick={() => setFPassword(true)}
            >
              Forgot password
            </p>
          </div>
        </>
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
          <button style={{ marginBottom: "20px" }} type="submit">
            Recover password
          </button>
        </form>
      )}

      <div
        onClick={() => setModal("Register")}
        className="login__modal--button-work-email"
      >
        <img src="./img/work-email-button.svg" alt="Work email" />
        Register
      </div>
    </>
  );
};
