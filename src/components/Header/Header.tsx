import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import classnames from "classnames";
import { useAppSelector } from "../../app/hooks";

type Props = {
  activeBurger: boolean;
  setActiveBurger: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ activeBurger, setActiveBurger }) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <header className="header">
      {accessToken ? (
              <NavLink to='account' className="header__logo">
              <img src="./img/Logo(Nav).svg" alt="img" />
              <p className="header__logo--text">MONETA</p>
            </NavLink>
      ) : (
        <NavLink to='/' className="header__logo">
        <img src="./img/Logo(Nav).svg" alt="img" />
        <p className="header__logo--text">MONETA</p>
      </NavLink>
      )}


      <nav className="header__nav-burger">
        <img
          onClick={() => setActiveBurger(!activeBurger)}
          src="./img/Menu.png"
          alt=""
        />
      </nav>
      <nav className="header__nav">
        {accessToken ? (
          <>
            <NavLink
              className={({ isActive }) =>
                classnames({
                  "nav-item-is-active": isActive,
                  "nav-item": !isActive,
                })
              }
              to="account/plan"
            >
              Plan
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                classnames({
                  "nav-item-is-active": isActive,
                  "nav-item": !isActive,
                })
              }
              to="account/history"
            >
              History
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                classnames({
                  "nav-item-is-active": isActive,
                  "nav-item": !isActive,
                })
              }
              to="account/about"
            >
              About
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                classnames({
                  "nav-item-is-active": isActive,
                  "nav-item": !isActive,
                })
              }
              to="account/settings"
            >
              Settings
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className={({ isActive }) =>
                classnames({
                  "nav-item-is-active": isActive,
                  "nav-item": !isActive,
                })
              }
              to="account/about"
            >
              About
            </NavLink>

            <Link to="/login" className="header__nav--login-or-name">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
