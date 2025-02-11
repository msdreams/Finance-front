import { AiOutlineArrowLeft } from "react-icons/ai"; 
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { forgotPassword } from "../features/authSlice";


type Props = {
  setActiveEmailModal: React.Dispatch<
    React.SetStateAction<"LoginEm" | "LoginTg" | null>
  >;
};

export const LoginModal: React.FC<Props> = ({ setActiveEmailModal }) => {
  const [fPassword, setFPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);
  const successMessage = useSelector((state: RootState) => state.auth.message);
  const isLoading = useSelector((state: RootState) => state.auth.loading); 
  
  const forgotPasswordHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));   
    dispatch(forgotPassword({ email: String(data.email) }));
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
              className="p-2 font-sans text-sm text-primary-400 hover:text-white cursor-pointer"
              onClick={() => setFPassword(true)}
            >
              Forgot password?
            </p>
        </div>
      ) : (
          <>
          <Form
            className="flex flex-col w-full max-w-xs gap-4 font-sans"
            onSubmit={(e) => forgotPasswordHandle(e)}
            validationBehavior="native"
          >
            <div
              className="flex flex-row justify-center items-center gap-2 cursor-pointer text-primary-400 hover:text-white"
              onClick={() => setFPassword(false)}
            >
              <AiOutlineArrowLeft />
              <p>back</p>
            </div>
              {successMessage ? (
                <div>{ successMessage }</div>
              ) : (
              <>
                <h3 className="text-lg">Write your email to recover your password:</h3>
                <Input
                  className="text-gray-500"
                  isRequired
                  errorMessage="Please enter a valid email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
    
              {error && <div className="text-warning-300">{error} </div>}
    
                <div className="flex flex-col space-y-4 w-full font-sans pt-2 pb-2">
                <Button isLoading={isLoading} color="primary" size="md" type="submit">
                  Recover
                </Button>
                </div>
              </>
              )}

          </Form>
          </>
      )}

      <div className="flex flex-col justify-center items-center h-4">
        <div
          onClick={() => navigate("/register")}
          className="flex flex-row items-center justify-center cursor-pointer hover:border-b-1"
        >
          <img  className="pb-2 align-baseline" src="./img/work-email-button.svg" alt="Work email" />
          <span className="align-baseline font-sans pl-2">Register</span>
        </div>
      </div>
    </div>
  );
};
