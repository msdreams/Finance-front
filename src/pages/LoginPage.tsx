import { AiFillCloseCircle } from "react-icons/ai"; 
import { useState } from "react";
import { LoginEm } from "../components/LoginEm";
import { LoginTg } from "../components/LoginTg";
import { LoginModal } from "../components/LoginModal";

export const LoginPage = () => {
  const [activeEmailModal, setActiveEmailModal] = useState<"LoginEm" | "LoginTg" | null>(null);

  return (
    <div className="flex items-start bg-background justify-center min-h-screen w-full">
      <div className="flex flex-col mt-32 p-8 rounded-lg bg-primary-800 w-96 text-white shadow-2xl relative">
        <div className="absolute right-8">
          <a href="#">
            <AiFillCloseCircle className="opacity-40 hover:opacity-80" size={'28px'}/>
          </a>
        </div>
        
        {activeEmailModal === null && (
          <LoginModal
            setActiveEmailModal={setActiveEmailModal}
          />
        )}

        {activeEmailModal === "LoginEm" && activeEmailModal !== null && (
          <LoginEm setActiveEmailModal={setActiveEmailModal } />
        )}

        {activeEmailModal === "LoginTg" && activeEmailModal !== null && (
          <LoginTg setActiveEmailModal={setActiveEmailModal} />
        )}
      </div>
    </div>
  );
};
