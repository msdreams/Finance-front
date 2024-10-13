import React from "react";

type Props = {
  setActiveEmailModal: React.Dispatch<React.SetStateAction<"LoginEm" | "RegisterEm" | null>>
  setModal: React.Dispatch<React.SetStateAction<"Login" | "Register">>
}

export const LoginModal: React.FC<Props> = ({ setModal, setActiveEmailModal }) => {
  return (
    <>
      <h1 className="login__modal--text">
        Login <br /> in seconds
      </h1>
      <p className="login__modal--text-p">
        Use your email <br /> or other service to continue <br /> working with
        MONETA. It's free!
      </p>

      <div className="login__modal--buttons">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setActiveEmailModal('LoginEm')}
          className="login__modal--button"
        >
          <img src="./img/email-button.svg" alt="Email login" />
          Login with email
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => setActiveEmailModal('LoginEm')}
          className="login__modal--button"
        >
          <img src="./img/telegram.svg" alt="Email login" />
          Login with Telegram
        </div>
      </div>

      <div onClick={() => setModal('Register')} className="login__modal--button-work-email">
        <img src="./img/work-email-button.svg" alt="Work email" />
        Register
      </div>
    </>
  );
};
