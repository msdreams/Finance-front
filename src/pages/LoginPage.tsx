import { AiFillCloseCircle } from "react-icons/ai"; 
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
    <div className="flex items-start justify-center min-h-screen w-full mt-32">
      <div className="flex flex-col p-8 rounded-lg bg-primary-900 w-96 mt-10 text-white shadow-2xl relative">
        <div className="absolute right-8">
          <a href="#">
            <AiFillCloseCircle className="opacity-40 hover:opacity-80" size={'28px'}/>
          </a>
        </div>
        
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
          <LoginEm setActiveEmailModal={setActiveEmailModal } />
        )}

        {activeEmailModal === "RegisterEm" && activeEmailModal !== null && (
          <RegisterEm setActiveEmailModal={setActiveEmailModal} />
        )}

        {activeEmailModal === "LoginTg" && activeEmailModal !== null && (
          <LoginTg setActiveEmailModal={setActiveEmailModal} />
        )}
      </div>
    </div>
  );
};
