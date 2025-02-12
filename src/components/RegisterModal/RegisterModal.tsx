import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

type Props = {
  setActiveEmailModal: React.Dispatch<React.SetStateAction< "RegisterEm" | null>>;
}

export const RegisterModal: React.FC<Props> = ({ setActiveEmailModal }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center w-full space-y-4">
        <div className="flex flex-col w-full max-w-xs gap-4">
          <h1 className=" text-2xl font-sans font-bold">
            Sign Up
          </h1>

          <Button
            className="font-sans"
            onPress={() => setActiveEmailModal("RegisterEm")}
            color="primary"
            size="md"
          >
            <img src="./img/email-button.svg" alt="Email login" />
            Sign Up with email
          </Button>

          <Button
            color="primary"
            size="md"
          >
          <Link
            className="font-sans flex flex-row gap-2"
              to='https://t.me/CoinBudgetAppBot'
              style={{ cursor: "pointer" }}
            >
              <img src="./img/telegram.svg" alt="Email login" />
              Sign Up with Telegram
          </Link>
          </Button>
        </div>

        <div className="flex flex-col justify-center items-center h-6 pt-4">
        <div
          onClick={() => navigate("/login")}
          className="flex flex-row items-center justify-center cursor-pointer hover:border-b-1"
        >
          <img  className="pb-2 align-baseline" src="./img/work-email-button.svg" alt="Work email" />
          <span className="align-baseline font-sans pl-2">Log In</span>
        </div>
      </div>
    </div>
  );
};
