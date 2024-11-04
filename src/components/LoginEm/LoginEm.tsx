import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../features/authSlice";

type FormData = {
  userName: string;
  password: string;
};

export const LoginEm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

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

    const formData = {
      userName,
      password,
    };

    registerUser(formData);
  };

  return (
    <form className="reg--email" onSubmit={handleSubmit}>
      <div>
        <p>Print email</p>
        <input
          className="reg--email-input"
          placeholder="email"
          type="email"
          id="email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div>
        <p>Print password</p>
        <input
          className="reg--email-input"
          placeholder="password"

          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="button-s" type="submit">Login</button>
      {/* <button onClick={() => setActiveEmailModal(false)}>выйти</button> */}
    </form>
  );
};
