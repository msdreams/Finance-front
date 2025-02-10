import { useAppSelector } from "../app/hooks";
import { ChangePassword } from "../components/ChangePassword";

export const SettingsPage = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <div className=" w-full h-screen bg-background font-sans">
      <div className="flex flex-col justify-center items-center gap-6 mt-36 ">
        <h1 className="text-lg md:text-2xl lg:text-3xl">
          Account Settings
        </h1>
        {accessToken && (
          <ChangePassword />
        )}
      </div>
    </div>
  );
};
