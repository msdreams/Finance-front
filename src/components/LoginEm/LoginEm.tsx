import { useState } from "react";
import { LoginUser } from "../../api/users";

type FormData = {
  email: string;
  password: string;
};

export const LoginEm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (formData: FormData) => {
    try {
      const response = await LoginUser(formData);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email,
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
      <button type="submit">Login</button>
      {/* <button onClick={() => setActiveEmailModal(false)}>выйти</button> */}
    </form>
  );
};
