import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { logout, refreshAccessToken } from "./features/authSlice";
import { useAppDispatch } from "./app/hooks";
import { LoadingScreen } from "./components/LoadingScreen";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();

    const interval = setInterval(() => {
      dispatch(refreshAccessToken())
        .unwrap() // Разворачиваем результат, чтобы catch отработал
        .catch((error) => {
          console.error("Failed to refresh token:", error);

          dispatch(logout()); // Логаут, если refresh токен недействителен
        });
    }, 15 * 60 * 10);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
