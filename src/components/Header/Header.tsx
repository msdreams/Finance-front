import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import classnames from "classnames";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src="./img/Logo(Nav).svg" alt="img" />
        <p className="header__logo--text">MONETA</p>
      </Link>

      <nav className="header__nav">
        <NavLink
          className={({ isActive }) =>
            classnames({
              "nav-item-is-active": isActive,
              "nav-item": !isActive,
            })
          }
          to="/plan"
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
          to="/history"
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
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classnames({
              "nav-item-is-active": isActive,
              "nav-item": !isActive,
            })
          }
          to="/about"
        >
          About
        </NavLink>
        <Link to="/login" className="header__nav--login-or-name">
          Login
        </Link>
      </nav>
    </header>
  );
};
