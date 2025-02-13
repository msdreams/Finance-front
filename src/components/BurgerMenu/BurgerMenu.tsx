import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/authSlice";

type Props = {
  activeBurger: boolean;
  setActiveBurger: (value: boolean) => void
};

export const BurgerMenu: React.FC<Props> = ({ activeBurger, setActiveBurger }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
  
    const handleUnlogin = () => {
      dispatch(logout());
      setActiveBurger(false)
    };
  return (
    <div
      className={classNames(
        "absolute z-40 text-lg font-sans right-0 flex flex-col-reverse items-end justify-end pt-24 pr-4 gap-5 bg-primary-300 h-[60vh] w-[100px] transition-transform duration-500",
        {
          "translate-x-full": !activeBurger,
          "translate-x-0": activeBurger,
        }
      )}
    >
      {accessToken ? (
        <>
          <NavLink
            className={({ isActive }) =>
              classNames("nav-item", { "nav-item-is-active": isActive })
            }
            to="/home"
            onClick={() => setActiveBurger(false)}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames("nav-item", { "nav-item-is-active": isActive })
            }
            to="/about"
            onClick={() => setActiveBurger(false)}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames("nav-item", { "nav-item-is-active": isActive })
            }
            to="/settings"
            onClick={() => setActiveBurger(false)}
          >
            Settings
          </NavLink>
          <NavLink
                className= "border-b-1.5 border-transparent hover:border-gray-900"
                to="#"
                onClick={() => handleUnlogin()}
              >
                log Out
              </NavLink>
        </>
      ) : (
        <>
          <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " border-b-1.5 border-gray-900"
                    : "border-b-1.5 border-transparent hover:border-gray-900"
                }
              to="register"
              onClick={() => setActiveBurger(false)}
              >
                Sign Up
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " border-b-1.5 border-gray-900"
                : "border-b-1.5 border-transparent hover:border-gray-900"
            }
              to="login"
              onClick={() => setActiveBurger(false)}
          >
            Log In
          </NavLink>
          <NavLink
             className={({ isActive }) =>
              isActive
                ? " border-b-1.5 border-gray-900"
                : "border-b-1.5 border-transparent hover:border-gray-900"
            }
              to="about"
              onClick={() => setActiveBurger(false)}
          >
            About
          </NavLink>
          <NavLink
             className={({ isActive }) =>
              isActive
                ? " border-b-1.5 border-gray-900"
                : "border-b-1.5 border-transparent hover:border-gray-900"
            }
              to="/"
              onClick={() => setActiveBurger(false)}
            >
            Home
          </NavLink>
        </>
      )}
    </div>
  );
};

