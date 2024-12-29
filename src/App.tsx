import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { logout, refreshAccessToken } from "./features/authSlice";
import { useAppDispatch } from "./app/hooks";
import { LoadingScreen } from "./components/LoadingScreen";
import { BurgerMenu } from "./components/BurgerMenu";
import { backgroundImage } from "./Components";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [activeBurger, setActiveBurger] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const interval = setInterval(() => {
      dispatch(refreshAccessToken())
        .unwrap()
        .catch((error) => {
          console.error("Failed to refresh token:", error);
            dispatch(logout());
        });
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative flex flex-col h-full items-center w-full">
      <Header activeBurger={activeBurger} setActiveBurger={setActiveBurger} />
      <div 
          className="absolute inset-0 bg-cover bg-left-top opacity-40 -z-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <BurgerMenu activeBurger={activeBurger} />
        <Outlet />
    </div>
  );
}

export default App;
