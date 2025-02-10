import { Button, Form, Input, Link, Textarea, User } from "@nextui-org/react";
import { Background } from "../components/Background";
import { AdamPhoto, MariaPhoto } from "../Components";
import { mailToSupport } from "../api/support";
import { useState } from "react";

export const AboutPage = () => {
  const [isSend, setIsSend] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data)

    const formData = {
      email: String(data.email),
      name: String(data.password),
      message: String(data.repeatPassword),
    };

    mailToSupport(formData)
      .then(() => setIsSend(true))
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    e.currentTarget.reset(); 
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full" >
      <div className=" flex flex-col md:flex-row w-full max-w-screen-3xl" >
        <div className="flex-1 flex flex-col bg-primary h-[500px] md:h-screen  ">
          <div className="flex flex-col px-8 md:px-10 xl:px-24 py-24 lg:pt-36 relative">
            <div className="relative opacity-10 left-60 overflow-hidden">
            <Background />
            </div>

            <span className=" text-2xl lg:text-4xl text-gray-200 font-bold mb-8">
              Contact Us
            </span>

            {isSend ? (
              <div className="text-2xl lg:text-xl text-gray-200 p-6 border-small rounded-lg">Your message has been sent, please wait for a response from our support team. Thank you! </div>
            ) : (
              <Form
              className="w-full max-w-sm flex flex-col space-y-6 font-sans"
              validationBehavior="native"
              onSubmit={(e) => handleSubmit(e)}
              onReset={handleReset}
            >
              <Input
                className="font-sans"
                isRequired
                errorMessage="Please enter your name"
                name="Name"
                placeholder="Enter your name"
                type="text"
              />

              <Input
                isRequired
                errorMessage="Please enter a valid email"
                name="email"
                placeholder="Enter your email"
                type="email"
              />

              <Textarea className=" max-w-lg" placeholder="Enter your message" />

              <div className="flex w-full flex-col md:flex-row gap-2 ">
                <Button className="border-gray-300 text-gray-300" type="reset" variant="bordered">
                  Reset
                </Button>
                <Button className="bg-primary-400" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            )}
          </div>
        </div>
        <div className="flex-1 shadow-custom-direction overflow-visible bg-background">
          <div className="flex flex-col gap-4 md:pt-24 lg:pt-36 p-8 font-sans max-w-[600px]">
              <p className=" text-2xl mb-6">
              MONETA is a collaborative project developed by two developers:
              Adam and
              Maria.
            </p>
            
            <div className="flex flex-col items-start gap-2" >
            <User
              avatarProps={{
                src: `${AdamPhoto}`,
                className: "w-20 h-20"
              }}
              description={
                <div className="">
                  JAVA DEVELOPER
                <Link isExternal href="https://github.com/AdamMudrak" size="sm">
                  ~GIT
                </Link>
                </div>
              }
              name={<span className="font-bold">Adam Mudrak</span>}
            />
            <p className="font-sans mb-2">
              Adam specializes in Java backend development with a strong command
              of the Hibernate and Spring frameworks. He has the technical expertise
              to deploy secure HTTPS servers on DigitalOcean, leveraging Docker for
              efficient containerization and managing both database and application
              droplets seamlessly.
            </p>
            </div>

            <div className="flex flex-col items-start gap-2" >
            <User
              avatarProps={{
                src: `${MariaPhoto}`,
                className: "w-20 h-20"
              }}
              description={
                <div className="">
                  FRONTEND DEVELOPER
                <Link isExternal href="https://github.com/msdreams" size="sm">
                  ~GIT
                </Link>
                </div>
              }
              name={<span className="font-bold">Maria Shmakova</span>}
            />
            <p className="font-sans mb-2">
                Hi there! I'm a frontend developer passionate about creative coding and data visualization.
                Crafting beautiful and functional interfaces using React, TypeScript, and modern technologies.
                I'm always eager to learn new things and stay ahead in the ever-evolving tech world!
            </p>
            </div>


            <div className="flex flex-row gap-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
