import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../features/authSlice";

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const RegisterEm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleRegisterUser = async (formData: FormData) => {
    try {
      const response = await dispatch(registerUser(formData));
      console.log(response)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      repeatPassword,
    };

    handleRegisterUser(formData);
  };

  return (
    <form className="reg--email" onSubmit={handleSubmit}>
      <div>
        <p>Print email</p>
        <input
          className="reg--email-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <p>Print password</p>
        <input
          className="reg--email-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <p>Please repeat password</p>
        <input
          className="reg--email-input"
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
      {/* <button onClick={() => setActiveEmailModal(false)}>выйти</button> */}
    </form>
  );
};
