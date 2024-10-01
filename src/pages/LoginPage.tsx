export const LoginPage = () => {
  return (
    <>
      <div className="modal-container">
        <div className="login__modal">
          <h1 className="login__modal--text">Login or <br /> register in <br /> seconds</h1>
          <p className="login__modal--text-p">Use your email <br /> or other service to continue <br /> working with MONETA. It's free!</p>

          <div className="login__modal--buttons">
            <div className="login__modal--button">
              <img src="./img/google-button.svg" alt="" />
              Login with Google
            </div>
            <div className="login__modal--button">
              <img src="./img/facebook-button.svg" alt="" />
              Login with Facebook
            </div>
            <div className="login__modal--button">
              <img src="./img/email-button.svg" alt="" />
              Continue with email
            </div>
          </div>

          <div className="login__modal--button-outher">View other options..</div>

          <div className="login__modal--button-work-email">
            <img src="./img/work-email-button.svg" alt="" />
            Register with your work email
            </div>
        </div>
        <img className="triagle" src="./img/triagle.svg" />
      </div>

    </>
  );
};
