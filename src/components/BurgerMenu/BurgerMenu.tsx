import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

type Props = {
  activeBurger: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ activeBurger }) => {
  return (
    <div
      className={classNames({
        "burger": !activeBurger,
        "burger burger-is-active": activeBurger,
      })}
    >
      <NavLink
        className={({ isActive }) =>
          classNames({
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
          classNames({
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
          classNames({
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
          classNames({
            "nav-item-is-active": isActive,
            "nav-item": !isActive,
          })
        }
        to="/about"
      >
        About
      </NavLink>

      <Link to="/settings" className="header__nav--login-or-name">
        name
      </Link>
    </div>
  );
};
