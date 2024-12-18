
import { Button, DatePicker, Form, Input, TimeInput } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { Background } from "../components/Background";
import { backgroundImage } from "../Components";

export const MainPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data)

    const formData = {
      email: String(data.email),
      name: String(data.password),
      data: String(data.data),
    };

    // handleSendEmail(formData);
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Отключаем стандартное поведение
    e.currentTarget.reset(); // Сбрасываем все поля формы
  };

  return (

    <div className="flex flex-col items-center min-h-screen w-full" >
      <div className=" flex flex-col md:flex-row  w-full h-screen  max-w-screen-3xl" >
      <div className="flex-1 relative bg-gray-300 shadow-custom-direction overflow-visible">
        {/* background */}
        <div 
          className="absolute inset-0 bg-cover bg-left-top opacity-40"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        
        {/* text */}
        <div className="relative z-10 pt-24 lg:pt-36 p-10 xl:px-24">
          <span className="text-6xl lg:text-8xl text-primary font-bold">MONETA</span>
          <p className="text-2xl font-sans mb-6 text-gray-700">
            Take control of your budgeting and make informed financial decisions
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
            <div className="absolute opacity-40 left-72">
              <Background />
            </div>
            <div className="flex flex-col gap-4 mt-6 text-gray-50 font-sans">
              <div className="p-6 bg-gray-500 w-96 h-24 rounded-lg opacity-75 shadow-lg">
              <span className="font-bold text-xl">EASILY</span> track your personal finances with detailed dashboards
              </div>
              <div className="p-6 bg-gray-500 w-96 h-24 rounded-lg opacity-75 shadow-lg">
              <span className="font-bold text-xl">VISUALIZE</span> your income and expenses with an intuitive scale
              </div>
              <div className=" p-6 bg-gray-500 w-96 h-24 rounded-lg opacity-75 shadow-lg">
              <span className="font-bold text-xl">LINK</span> multiple bank accounts, categorize your spending, and track various income
              </div>
            </div>

            {/* <span className=" text-2xl lg:text-4xl text-gray-200 font-bold mb-8">
              Plan Your Consultation
            </span>
            <Form
              className="w-full max-w-xs flex flex-col font-sans"
              validationBehavior="native"
              onSubmit={(e) => handleSubmit(e)}
              onReset={handleReset}
            >
              <Input
                className="font-sans h-[64px]"
                isRequired
                errorMessage="Please enter your name"
                name="Name"
                placeholder="Enter your name"
                type="text"
              />

              <Input
                className="font-sans h-[64px]"
                isRequired
                errorMessage="Please enter a valid email"
                name="email"
                placeholder="Enter your email"
                type="email"
              />
              <div className="flex flex-row wrap gap-2 w-full mb-6">
              <DatePicker  label="Choose date" variant="faded" />
              <TimeInput label="Event Time" className="w-28" />
              </div>

              <div className="flex gap-2">
                <Button className="border-gray-300 text-gray-300" type="reset" variant="bordered">
                  Reset
                </Button>
                <Button className="bg-primary-400" type="submit">
                  Submit
                </Button>
              </div>
            </Form> */}
          </div>
        </div>
      </div>
    </div>
  )
}
