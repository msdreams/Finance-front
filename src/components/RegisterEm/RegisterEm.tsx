import { useState } from "react";
import { createUser } from "../../api/users";

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
};

export const RegisterEm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const registerUser = async (formData: FormData) => {
    try {
      const response = await createUser(formData);
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
      repeatPassword,
      firstName,
      lastName,
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
      <div>
        <p>Print name</p>
        <input
          className="reg--email-input"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <p>Print lastname</p>
        <input
          className="reg--email-input"
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
      {/* <button onClick={() => setActiveEmailModal(false)}>выйти</button> */}
    </form>
  );
};
