import { useState } from "react";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";
import { LoginEm } from "../components/LoginEm";
import { RegisterEm } from "../components/RegisterEm";

export const LoginPage = () => {
  const [activeEmailModal, setActiveEmailModal] = useState<
    "LoginEm" | "RegisterEm" | null
  >(null);
  const [modal, setModal] = useState<"Login" | "Register">("Login");

  return (
    <>
      <div className="modal-container">
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
        </div>
      </div>
    </>
  );
};
