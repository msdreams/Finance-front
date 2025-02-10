import { useAppDispatch } from "../app/hooks";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "@nextui-org/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type Props = {
  setActiveEmailModal: (value: "LoginEm" | "LoginTg" | null) => void;
};

export const LoginTg: React.FC<Props> = ({ setActiveEmailModal }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.loading);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);

    const formData = {
      phoneNumber: String(data.userName),
      password: String(data.password),
    };

    dispatch(loginUser(formData)).then((response) => {
      if (response.payload) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <Form
      className="flex flex-col w-full max-w-xs gap-4 font-sans"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <div
        className="flex flex-row justify-center items-center gap-2 cursor-pointer text-primary-400 hover:text-white"
        onClick={() => setActiveEmailModal(null)}
      >
        <AiOutlineArrowLeft />
        <p>back</p>
      </div>
      <h3 className="text-lg">Log In with Telegram:</h3>
      <Input
        className="text-gray-500"
        isRequired
        errorMessage="Please enter a valid phone number"
        name="userName"
        placeholder="Enter your phone"
        type="phone"
      />
      <Input
        isRequired
        className="text-gray-500"
        errorMessage="Please enter a valid password"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <div className="flex flex-col space-y-4 w-full font-sans pt-2 pb-2">
        {error && (
          <div className="text-warning-300">
            {" "}
            Log In failed: <br /> {error}{" "}
          </div>
        )}

        <Button isLoading={isLoading} color="primary" size="md" type="submit">
          Log In
        </Button>
      </div>
    </Form>
  );
};
