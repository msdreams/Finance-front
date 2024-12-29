import { FiSettings } from "react-icons/fi"; 
import { NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
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
  const location = useLocation();
  console.log(location.pathname)

  return (
    <div className="absolute w-full flex flex-col justify-center z-50">
      <div className="flex text-lg flex-row items-center justify-between py-2 p-10 xl:px-24 max-w-screen-2xl">
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

        <nav className="font-sans text-lg border-b-1.5 border-transparent text-gray-900 flex flex-row justify-center items-center gap-10">
          {accessToken ? (
            <>
              <NavLink
                className={
                  location.pathname === '/account'
                    ? " border-b-1.5 border-gray-900" 
                    : " border-b-1.5 border-transparent hover:border-gray-900"      
                }
                to="account"
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " border-b-1.5 border-gray-900" 
                    : " border-b-1.5 border-transparent hover:border-gray-900"
                }
                to="account/plan"
              >
                Plan
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "border-b-1.5 border-gray-900" 
                    : "border-b-1.5 border-transparent hover:border-gray-900"
                }
                to="account/history"
              >
                History
              </NavLink>

              <Button
                  onPress={() => navigate('about')}
                  className="font-sans bg-primary-400"
                >
                  Contact us
              </Button>
              
              <NavLink
                to="account/settings"
              >
                <FiSettings size={28} color="black" />
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
                to="login"
                >
                  Log In
                </NavLink>

                <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " border-b-1.5 border-gray-900" 
                    : "border-b-1.5 border-transparent hover:border-gray-900"
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
