import { useState } from "react";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";
import { LoginEm } from "../components/LoginEm";
import { RegisterEm } from "../components/RegisterEm";
import { LoginTg } from "../components/LoginTg";

export const LoginPage = () => {
  const [activeEmailModal, setActiveEmailModal] = useState<
    "LoginEm" | "RegisterEm" | "LoginTg" | null
  >(null);
  const [modal, setModal] = useState<"Login" | "Register">("Login");

  return (
    <>
      <div className="login__modal">
        {modal === "Login" && activeEmailModal === null && (
          <LoginModal
            setModal={setModal}
            setActiveEmailModal={setActiveEmailModal}
          />
        )}

        {modal === "Register" && activeEmailModal === null && (
          <RegisterModal
            setModal={setModal}
            setActiveEmailModal={setActiveEmailModal}
          />
        )}

        {activeEmailModal === "LoginEm" && activeEmailModal !== null && (
          <LoginEm />
        )}

        {activeEmailModal === "RegisterEm" && activeEmailModal !== null && (
          <RegisterEm />
        )}

        {activeEmailModal === "LoginTg" && activeEmailModal !== null && (
          <LoginTg />
        )}
      </div>
    </>
  );
};
