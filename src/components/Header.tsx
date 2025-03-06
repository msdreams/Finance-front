import { GiHamburgerMenu } from "react-icons/gi"; 
import { FiSettings } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

type Props = {
  activeBurger: boolean;
  setActiveBurger: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ activeBurger, setActiveBurger }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleUnlogin = () => {
    dispatch(logout());
  };
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="absolute w-full flex justify-center z-50">
      <div className="flex w-full text-lg flex-row items-center justify-between p-2 md:px-10  xl:px-24">
      {!accessToken ? (
          <NavLink to="/" className="flex flex-row items-center">
          <img className="w-9 pr-2" src="./img/Logo2.svg" alt="img" />
            <p className="text-2xl text-primary-900 font-bold pt-1.5">MONETA</p>
          </NavLink>
        ) : (
          <NavLink to="dashboard" className="flex flex-row items-center">
          <img className="w-9 pr-2" src="./img/Logo2.svg" alt="img" />
          <p className="text-2xl font-bold  text-primary-900 pt-1.5">MONETA</p>
        </NavLink>
        )}

        <nav className="md:hidden">
          <GiHamburgerMenu
            color="primary"
            size={28}
            onClick={() => setActiveBurger(!activeBurger)}
          />
        </nav>

        <nav className=" hidden md:flex font-sans text-base text-gray-900 flex-row justify-center items-center gap-10">
          {accessToken ? (
            <>
              <NavLink
                className= "border-b-1.5 border-transparent hover:border-gray-900"
                to="#"
                onClick={() => handleUnlogin()}
              >
                log out
              </NavLink>

              <Button
                onPress={() => navigate("about")}
                className="font-sans bg-primary-300"
              >
                Contact us
              </Button>

              <NavLink to="dashboard/settings">
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
                Log in
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " border-b-1.5 border-gray-900"
                    : "border-b-1.5 border-transparent hover:border-gray-900"
                }
                to="register"
              >
                Sign up
              </NavLink>
              

              <Button
                onPress={() => navigate("about")}
                className="font-sans bg-primary-300"
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
