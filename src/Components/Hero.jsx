import React, { useEffect, useState } from "react";
import Scene from "./Scene";
import CircularText from "../Partials/CircularText";
import ScrollVelocity from "../Partials/ScrollVelocity";


const Hero = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  // Component to display the formatted date
  const DateDisplay = () => (
    <div className="leading-[0.7rem] text-left text-[9px] uppercase ">
      {new Date().getFullYear()} /{" "}
      {new Date().getMonth().toString().padStart(2, "0")} /{" "}
      {new Date().getDate().toString().padStart(2, "0")}
      <br />
      {new Date().toLocaleDateString("en-Us", { weekday: "long" })}
    </div>
  );

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="home"
      className="relative h-screen  max-h-[100svh] w-full overflow-y-auto overflow-x-clip scroll-container "
    >
      {/* // <div className="relative h-screen min-h-[100dvh] w-full bg-[#000] overflow-y-auto overflow-x-clip scroll-container"> */}

      {/* Overlay Loader - Desktop */}

      {/* <div className=" absolute hidden md:block top-0 left-0  h-screen w-full z-50 "> */}
      <div className=" absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-full  ">
        <div className="text-[9px] leading-[0.7rem] flex justify-between items-start px-3">

          <div className=" w-3/5  flex justify-between">
            <div className=" relative logo  flex tracking-tight ">
              <div className="">
                <DateDisplay />
              </div>
              <span className=" leading-4 text-xl -rotate-[55deg] font-extralight tracking-[-2px]">
                -----
              </span>

              <div className="location flex flex-col items-end  -ml-2.5">
                <p>{currentTime} IST</p>
                <p>18.5167° N, 73.8563° E</p>
              </div>
            </div>
          </div>
           
          

          <div className=" w-1/2 flex justify-end">
            <div className="relative  text-right  md:w-1/3 leading-[0.7rem] uppercase ">
              <p className="  w-full text-right ">
              Igniting seamless, pixel‑perfect Experiences and moments that matter.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="absolute top-[40vh] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        {/* <ScrollVelocity
          texts={["Aniruddha yalgudre Aniruddha yalgudre", "creative frontend, ui-ux backend Developer "]}
          // texts={["i don't just built interfaces, i reveal experiences."]}
          velocity={10}
          className="custom-scroll-text  font-['Secondary'] uppercase hidden md:block "
        /> */}

        {/* <h1 className="text-[10vw] text-nowrap font-['Secondary'] uppercase font-bold leading-none">
          Aniruddha yalgudre
          <span className="text-fill-transparent"> creative </span> web
          developer
        </h1> */}
      </div>

      {/* laoctaion for mobile version */}
      <div className="absolute z-50 right-3 w-fit top-[20vh] rounded-full   md:hidden ">
        <div data-scroll-container className=" ">
          <CircularText
            text="LOCATION BASED IN  PUNE|INDIA "
            onHover="goBonkers"
            spinDuration={40}
            className="custom-class h-20 w-24 "
          />

          <div className="location absolute h-[3.5vw] w-[3.5vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <h1
              data-scroll
              data-scroll-speed="0.2"
              className="text-[1vw] uppercase font-bold"
            ></h1>
          </div>
        </div>
      </div>

      {/* 3D Scene Layer */}
      <Scene />
    </div>
  );
};

export default Hero;
