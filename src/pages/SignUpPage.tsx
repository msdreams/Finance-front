import { RegisterEm } from "../components/RegisterEm";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { RegisterModal } from "../components/RegisterModal";

export const SignUpPage = () => {
  const [activeEmailModal, setActiveEmailModal] = useState< | "RegisterEm" | null>(null);

  return (
    <div className="flex items-start justify-center min-h-screen w-full mt-32 bg-gradient-to-b from-gray-400/0 to-gray-400/100 z-10">
    <div className="flex flex-col p-8 rounded-lg bg-primary-900 w-96 mt-10 text-white shadow-2xl relative">
        <div className="absolute right-8">
          <a href="#">
            <AiFillCloseCircle className="opacity-40 hover:opacity-80" size={'28px'}/>
          </a>
        </div>

        {activeEmailModal === null && (
          <RegisterModal
            setActiveEmailModal={setActiveEmailModal}
          />
        )}
        {activeEmailModal === "RegisterEm" && activeEmailModal !== null && (
          <RegisterEm setActiveEmailModal={setActiveEmailModal} />
        )}
      </div>
    </div>
  );
};