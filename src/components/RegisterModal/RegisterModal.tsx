import React from "react";
import { Link } from "react-router-dom";

type Props = {
  setActiveEmailModal: React.Dispatch<React.SetStateAction<"LoginEm" | "RegisterEm" | 'LoginTg' | null>>;
  setModal: React.Dispatch<React.SetStateAction<"Login" | "Register">>
}

export const RegisterModal: React.FC<Props> = ({ setModal, setActiveEmailModal }) => {
  return (
    <>
      <h1 className="login__modal--text">
        Register <br /> in seconds
      </h1>
      <p className="login__modal--text-p">
        Use your email <br /> or other service to continue <br /> working with
        MONETA. It's free!
      </p>

      <div className="login__modal--buttons">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setActiveEmailModal('RegisterEm')}
          className="login__modal--button"
        >
          <img src="./img/email-button.svg" alt="Email login" />
          Register with email
        </div>

        <Link
          to='https://t.me/BudgetApplicationBot'
          style={{ cursor: "pointer" }}
          className="login__modal--button"
        >
          <img src="./img/telegram.svg" alt="Email login" />
          Register with Telegram
        </Link>
      </div>

      <div onClick={() => setModal('Login')} className="login__modal--button-work-email">
        <img src="./img/work-email-button.svg" alt="Work email" />
        Login
      </div>
    </>
  );
};