import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../features/authSlice";

type FormData = {
  userName: string;
  password: string;
};

export const LoginTg = () => {
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
        <p>Print name</p>
        <input
          className="reg--email-input"
          type="text"
          id="email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div>
        <p>Print phone</p>
        <input
          className="reg--email-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {/* <button onClick={() => setActiveEmailModal(false)}>выйти</button> */}
    </form>
  );
};
