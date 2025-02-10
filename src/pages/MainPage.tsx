
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { Background } from "../components/Background";
import { Description } from "../components/Description";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-auto md:min-h-screen w-full" >
      <div className=" flex flex-col md:flex-row-reverse w-full h-screen max-w-screen-3xl" >
        <div className="flex-1 bg-background shadow-custom-direction overflow-visible z-10">
          <div className="flex flex-col px-4 md:px-10 xl:px-24 pt-24 md:pt-24 lg:pt-36">
              <span className=" text-6xl md:text-8xl lg:text-9xl text-primary-600 font-bold">
                MONETA
              </span>
            <p className="text-xl md:text-2xl lg:text-3xl font-sans pt-4 md:pt-10 mb-6 text-gray-800 px-1">
              Take control of your budgeting <br /> and make informed financial decisions
            </p>
            <p className="font-sans text-xl mb-6 px-1 font-bold text-primary-900">
              Sign Up for Free!
            </p>
            <div className="flex w-full flex-col md:flex-row gap-4 pb-6">
                <Button
                  onPress={() => navigate("login")}
                  className="font-sans bg-primary-300 md:w-32"
                >Log In
                </Button>
              <Button
                onPress={() => navigate("register")}
                className="font-sans md:w-32"
                color="primary"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        <div className=" flex-1 md:max-h-screen bg-[#3890ca2b]">
          <div className="relative flex flex-col items-center mx-4 md:mx-8 xl:mx-24 pt-6 md:pt-14 lg:pt-32">
            <div>
              <Background />
            </div>
            <div className="absolute flex flex-col gap-4 min-w-52 max-w-96  mt-6 text-white font-sans z-10">
              <Description
                header="EASILY"
                text="track your personal finances with detailed dashboards"
              />
              <Description
                header="VISUALIZE"
                text="your income and expenses with an intuitive scale"
              />
              <Description
                header="YUOR SPENDING"
                text="is easily categorized, with multiple bank accounts and tracked income sources"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
