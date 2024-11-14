import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./NameSettings.scss";
import { logout } from "../../features/authSlice";
import { Link } from "react-router-dom";

export const NameSettingsA = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();


  const handleUnlogin = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1>NameSettings</h1>

      <div className="name__set">
        <Link to="/all-categories" className="name__set-but">
          check category
        </Link>
        <Link to="/new-account" className="name__set-but">
          Add Account
        </Link>
        <Link to="/change-password-page" className="name__set-but">
          Change password
        </Link>
      </div>

      {accessToken && <button style={{marginTop: '15px', marginBottom: '15px'}} className="name__set-but" onClick={() => handleUnlogin()}>Unlogin</button>}

      
    </>
  );
};
