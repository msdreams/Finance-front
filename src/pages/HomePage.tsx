import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { logout, refreshAccessToken } from "../features/authSlice";
import { TransactionHistory } from "../components/TransactionHistory";
import { MainChart } from "../components/MainLineChart";
import { TransactionBlock } from "../components/TransactionBlock";



export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshAccessToken())
        .unwrap()
        .catch((error) => {
          console.error("Failed to refresh token:", error);
            dispatch(logout());
        });
    }, 45 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full bg-gray-400 min-h-screen">
      {/* dashboard */}
      <div className="flex flex-col w-[100%] p-4 md:p-10 gap-6 ">
        <div className="flex flex-col lg:flex-row gap-6 font-sans pt-16 animate-fadeIn">
          <div className="flex-2 md:min-w-[450px] bg-gray-600 rounded-lg shadow-lg">
            <TransactionBlock />
          </div>
          <div className="flex-1 flex flex-col bg-gray-600 rounded-lg p-t-4 md:p-8 md:pt-6 shadow-lg">
            <MainChart />
          </div>
        </div>
        <div className=" flex flex-col bg-gray-600 rounded-lg p-t-4 md:p-8 md:pt-6 shadow-lg">
            <TransactionHistory />
        </div>
      </div>
    </div>
  );
};
