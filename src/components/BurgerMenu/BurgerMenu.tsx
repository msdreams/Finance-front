import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector } from "../../app/hooks";

type Props = {
  activeBurger: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ activeBurger }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  return (
    <div
      className={classNames(
        "absolute z-40 right-0 top-20 flex flex-col-reverse items-center justify-center gap-5 bg-gray-400 h-[60vh] w-[50vw] transition-transform duration-500",
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
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames("nav-item", { "nav-item-is-active": isActive })
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames("nav-item", { "nav-item-is-active": isActive })
            }
            to="/settings" >
            Settings
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) =>
              classNames("nav-item", { "nav-item-is-active": isActive })
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames("nav-item", { "nav-item-is-active": isActive })
            }
            to="/settings" >
            Settings
          </NavLink>
        </>
      )}
    </div>
  );
};

