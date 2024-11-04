import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./NameSettings.scss";
import { changePasswordUser, logout } from "../../features/authSlice";
import { userChangePassword } from "../../types/userRegister";

export const NameSettingsA = () => {
  const { accessToken, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUnlogin = () => {
    dispatch(logout());
  };

  const handleChange = async (data: userChangePassword) => {
    try {
      await dispatch(changePasswordUser(data)).unwrap();
      setSuccessMessage("New password has been set successfully");
      setCurrentPassword("");
      setNewPassword("");
      setRepeatNewPassword("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h1>NameSettings</h1>

      <div className="name__set">
        <div className="name__set-but">main currency: USD</div>
        <div className="name__set-but">check category</div>
        <div className="name__set-but">Your name: name</div>
      </div>

      {accessToken && <button onClick={() => handleUnlogin()}>Unlogin</button>}

      {accessToken && (
        <>
          <div>
            <form
              onSubmit={() =>
                handleChange({
                  currentPassword,
                  newPassword,
                  repeatNewPassword,
                })
              }
            >
              <input
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                type="text"
                placeholder="currentPassword"
              />
              <input
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                type="text"
                placeholder="newPassword"
              />
              <input
                value={repeatNewPassword}
                onChange={(e) => {
                  setRepeatNewPassword(e.target.value);
                }}
                type="text"
                placeholder="repeatNewPassword"
              />

              <button className="button-s" type="submit">Change password</button>
            </form>
          </div>
          {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
          {error && (<p style={{color: 'red'}}>{error}</p>)}
        </>
      )}
    </>
  );
};
