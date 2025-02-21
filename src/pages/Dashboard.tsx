import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, refreshAccessToken } from "../features/authSlice";
import { TransactionHistory } from "../components/TransactionHistory";
import { MainChartBlock } from "../components/MainChartBlock";
import { TransactionBlock } from "../components/TransactionBlock";
import { ModalWindow } from "../components/Modals/ModalWindow";
import { useDisclosure } from "@nextui-org/react";
import { SettingsBlock } from "../components/SettingsBlock";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(() => {
      dispatch(refreshAccessToken())
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, onOpen, accessToken]);

  if (!accessToken) {
    dispatch(logout());
  }

  return (
    <div className="flex flex-col items-center w-full bg-background min-h-screen">
      {/* dashboard */}
      <div className="flex flex-col w-[100%] p-2 md:p-10 gap-6 ">
        <div className="flex flex-col lg:flex-row gap-6 font-sans pt-16 animate-fadeIn">
          <div className="flex-2 md:min-w-[450px] bg-gray-600 rounded-lg shadow-lg">
            <TransactionBlock />
          </div>
          <div className="flex-1 flex flex-col bg-gray-600 rounded-lg shadow-lg">
            <MainChartBlock />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 font-sans pt-16 animate-fadeIn">
          <div
            aria-label="SettingsBlock"
            className="flex-2 md:min-w-[450px] bg-gray-600 rounded-lg shadow-lg"
          >
            <SettingsBlock />
          </div>
          <div className=" flex flex-1 flex-col bg-gray-600 rounded-lg shadow-lg">
            <TransactionHistory />
          </div>
        </div>
      </div>

      <ModalWindow
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        header="Failed to refresh token"
        body="Please log in agan"
      />
    </div>
  );
};
