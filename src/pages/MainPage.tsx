
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { Background } from "../components/Background";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen w-full" >
      <div className=" flex flex-col md:flex-row  w-full h-screen  max-w-screen-3xl" >
      <div className="flex-1 relative shadow-custom-direction overflow-visible">
        <div className="relative z-10 pt-24 lg:pt-36 p-10 xl:px-24">
          <span className="text-6xl lg:text-8xl text-primary-800 font-bold">MONETA</span>
          <p className="text-2xl font-sans mb-6 text-gray-900">
            Take control of your budgeting <br /> and make informed financial decisions
          </p>
          <p className="font-sans mb-2 font-bold">
            Sign Up for Free!
          </p>
          <div className="flex flex-row gap-4">
            <Button className="font-sans bg-primary-400">Learn More</Button>
            <Button
              onPress={() => navigate("login")}
              className="font-sans"
              color="primary"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

        <div className=" flex-1 bg-primary h-[500px] md:h-screen overflow-hidden">
          <div className="flex flex-col px-10 pt-24 lg:pt-36 relative">
            <div className=" left-72">
              <Background />
            </div>
            <div className="flex absolute flex-col gap-4 mt-6 text-white font-sans">
              <div className="p-6 bg-gray-500 w-96 h-24 rounded-lg shadow-lg">
              <span className="font-bold text-xl">EASILY</span> track your personal finances with detailed dashboards
              </div>
              <div className="p-6 bg-gray-500 w-96 h-24 rounded-lg shadow-lg">
              <span className="font-bold text-xl">VISUALIZE</span> your income and expenses with an intuitive scale
              </div>
              <div className=" p-6 bg-gray-500 w-96 h-24 rounded-lg shadow-lg">
              <span className="font-bold text-xl">LINK</span> multiple bank accounts, categorize your spending, and track various income
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
