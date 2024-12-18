import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userChangePassword } from "../types/userRegister";
import { changePasswordUser } from "../features/authSlice";

export const ChangePasswordPage = () => {
  const { accessToken, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    <div className="h-screen mt-36">
      {accessToken && (
        <>
          <div>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
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
                className="new-target__input-name"
                placeholder="currentPassword"
              />
              <input
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                type="text"
                className="new-target__input-name"
                placeholder="newPassword"
              />
              <input
                value={repeatNewPassword}
                onChange={(e) => {
                  setRepeatNewPassword(e.target.value);
                }}
                type="text"
                className="new-target__input-name"
                placeholder="repeatNewPassword"
              />

              <button className="new-target__button" type="submit">
                Change password
              </button>
            </form>
          </div>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};
