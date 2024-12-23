import { NavLink } from "react-router-dom";
import "./Header.scss";
import classnames from "classnames";
import { useAppSelector } from "../../app/hooks";
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


type Props = {
  activeBurger: boolean;
  setActiveBurger: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ activeBurger, setActiveBurger }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="absolute w-full flex flex-col justify-center z-50">
      <div className="flex flex-row items-center justify-between py-2 p-10 xl:px-24 max-w-screen-2xl">
          {accessToken ? (
                <NavLink to='account' className="flex flex-row items-center">
                <img src="./img/Logo(Nav).svg" alt="img" />
                <p className="text-2xl font-bold pt-1.5">MONETA</p>
              </NavLink>
        ) : (
          <NavLink to='/' className="flex flex-row items-center">
          <img src="./img/Logo(Nav).svg" alt="img" />
          <p className="text-2xl font-bold pt-1.5">MONETA</p>
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
                to="account/settings"
              >
                Settings
              </NavLink>
            </>
          ) : (
              <>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-serif text-gray-900 font-bold border-b-1.5 border-gray-900" 
                    : "text-gray-900 font-bold border-b-1.5 border-transparent hover:border-gray-900"
                }
                to="login"
                >
                  Log In
                
                </NavLink>

                <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-serif text-gray-900 font-bold border-b-1.5 border-gray-900" 
                    : "text-gray-900 font-bold border-b-1.5 border-transparent hover:border-gray-900"
                }
                to="register"
                >
                  Sign Up
                
                </NavLink>
                
                <Button
                  onPress={() => navigate('about')}
                  className="font-sans bg-primary-400"
                >
                  Contact us
                </Button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};
