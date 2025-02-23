import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { BurgerMenu } from "./components/BurgerMenu";
import { backgroundImage } from "./Components";

function App() {
  const [loading, setLoading] = useState(true);
  const [activeBurger, setActiveBurger] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative flex flex-col h-full items-center w-full overflow-hidden">
      <Header activeBurger={activeBurger} setActiveBurger={setActiveBurger} />
      <div
        className="absolute inset-0 bg-cover bg-left-top -z-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <BurgerMenu activeBurger={activeBurger} />
      <Outlet />
    </div>
  );
}

export default App;
