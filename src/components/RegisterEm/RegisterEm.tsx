import { useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../features/authSlice";
import { Form, Input, Button } from "@nextui-org/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

type Props = {
  setActiveEmailModal: (value: "RegisterEm"| null) => void;
}

export const RegisterEm:React.FC<Props> = ({setActiveEmailModal}) => {
  const dispatch = useAppDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const successMessage = useSelector((state: RootState) => state.auth.message);
  const isLoading = useSelector((state: RootState) => state.auth.loading); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formData: FormData = {
      email: String(data.email),
      password: String(data.password),
      repeatPassword: String(data.repeatPassword),
    };
  
    dispatch(registerUser(formData))
  };
  

  return (
    <Form className="flex flex-col w-full max-w-xs gap-4 font-sans" validationBehavior="native" onSubmit={handleSubmit}>
        <div
          className="flex flex-row justify-center items-center gap-2 cursor-pointer text-primary-400 hover:text-white"
          onClick={() => setActiveEmailModal(null)}
        >
          <AiOutlineArrowLeft />
          <p>back</p>
        </div>
      <h3 className="text-lg">Sign Up with Email:</h3>
      {!successMessage ? (
          <>
          <Input
              className="text-gray-500"
              isRequired
              errorMessage="Please enter a valid email"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              isRequired
              className="text-gray-500"
              errorMessage="Please enter a valid password"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            <Input
              isRequired
              className="text-gray-500"
              errorMessage="Please enter a valid password"
              name="repeatPassword"
              placeholder="Enter your password"
              type="password"
            />
            <div className="flex flex-col space-y-4 w-full font-sans pt-2 pb-2">
              {error && <div className="text-warning-300"> Sign Up failed <br /> {error} </div>}
              <Button isLoading={isLoading} color="primary" size="md" type="submit" >Sign Up</Button>
            </div>
          </>
      ) : (
        <div className="text-warning-300"> You are successfully registered! <br /> {successMessage} </div>
      )}
    </Form>
  );
};
