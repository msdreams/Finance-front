import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { logout, refreshAccessToken } from "./features/authSlice";
import { useAppDispatch } from "./app/hooks";
import { LoadingScreen } from "./components/LoadingScreen";
import { BurgerMenu } from "./components/BurgerMenu";

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
    <div className="App">
      <div className="container">
        <Header activeBurger={activeBurger} setActiveBurger={setActiveBurger} />
        <BurgerMenu activeBurger={activeBurger} />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
