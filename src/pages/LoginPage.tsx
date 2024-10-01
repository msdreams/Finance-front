export const LoginPage = () => {
  return (
    <>
      <div className="modal-container">
        <div className="login__modal">
          <h1>Login or register in seconds</h1>
          <p>Use your email or other service to continue working with MONETA. It's free!</p>

          <button>Login with Google</button>
          <button>Login with Facebook</button>
          <button>Continue with email</button>

          <p>View other options..</p>

          <p>Register with your work email</p>
        </div>
        <img className="triagle" src="./img/triagle.svg" />
      </div>

    </>
  );
};
