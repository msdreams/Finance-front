import { useState } from "react";
import { createUser } from "../api/users";

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async (formData: any) => {
    try {
      const response = await createUser(formData);
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      repeatPassword,
      firstName,
      lastName,
    };

    registerUser(formData)
  };
  return (
    <>
      <div className="modal-container">
        <div className="login__modal">
          <h1 className="login__modal--text">Login or <br /> register in <br /> seconds</h1>
          <p className="login__modal--text-p">Use your email <br /> or other service to continue <br /> working with MONETA. It's free!</p>

          <div className="login__modal--buttons">
            <div className="login__modal--button">
              <img src="./img/google-button.svg" alt="Google login" />
              Login with Google
            </div>
            <div className="login__modal--button">
              <img src="./img/facebook-button.svg" alt="Facebook login" />
              Login with Facebook
            </div>
            <div className="login__modal--button">
              <img src="./img/email-button.svg" alt="Email login" />
              Continue with email
            </div>
          </div>

          <div className="login__modal--button-outher">View other options..</div>

          <div className="triangle-bg"></div>
          <div className="login__modal--button-work-email">
            <img src="./img/work-email-button.svg" alt="Work email" />
            Register with your work email
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="repeatPassword">Повторите пароль:</label>
        <input
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="firstName">Имя:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
    </>
  );
};
