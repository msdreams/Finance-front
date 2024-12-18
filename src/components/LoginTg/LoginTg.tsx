import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../features/authSlice";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from "@nextui-org/react";


type FormData = {
  userName: string;
  password: string;
};

type Props = {
  setActiveEmailModal: (value:"LoginEm" | "RegisterEm" | "LoginTg" | null) => void;
}

export const LoginTg: React.FC<Props> = ({setActiveEmailModal}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerUser = async (formData: FormData) => {
    try {
      const response = await dispatch(loginUser(formData));
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data)


    const formData = {
      userName: String(data.userName),
      password: String(data.password),
    };

    registerUser(formData)
        .then(() => {
            navigate('/account');
        })
        .catch(error => {
            console.error("Navigation error:", error);
        });
  };

  return (
    <Form className="flex flex-col w-full max-w-xs gap-4 font-sans" validationBehavior="native" onSubmit={handleSubmit}>
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
      <Button  color="primary" size="md" type="submit" >Log In</Button>
        <Button  color="secondary" size="md" onPress={() => setActiveEmailModal(null)}>
          Go Back
        </Button>
      </div>
  </Form>
  );
};
