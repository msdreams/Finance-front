import { Outlet } from "react-router-dom";
import "./App.scss";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { BurgerMenu } from "./components/BurgerMenu";
import { backgroundImage } from "./Components";
import { Header } from "./components/Header";

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
    <div className="relative flex flex-col h-full items-center w-full overflow-x-hidden">
      <Header activeBurger={activeBurger} setActiveBurger={setActiveBurger} />
      <div
        className="hidden md:block absolute h-full inset-0 md:bg-cover md:top-0 md:bg-left-top -z-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <BurgerMenu activeBurger={activeBurger} setActiveBurger={setActiveBurger} />
      <Outlet />
    </div>
  );
}

export default App;
