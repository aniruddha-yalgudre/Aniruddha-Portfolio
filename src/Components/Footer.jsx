import React, { useEffect, useState } from "react";
import signatureVid from "../assets/videos/signature.mp4";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Footer = () => {

  const socialsLinks = [
    { name: "linkedin", url: "#linkedin" },
    { name: "github", url: "#github" },
    { name: "twitter", url: "#twitter" },
    { name: "behance", url: "#behance" },
    { name: "dribble", url: "#dribble" },
    { name: "read.cv", url: "#read.cv" },
  ];

  const exploreLinks = [
    { name: "home", url: "#home" },
    { name: "works", url: "#works" },
    { name: "about", url: "#about" },
    { name: "faq", url: "#faq" },
    { name: "contact", url: "#contact" },
  ];


  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const vidbgRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to(".footer", {
      backgroundColor: "black",
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: `${isMobile ? "-50%" : "-62%"} top`,
        end: "bottom bottom",
        scrub: true,
        // markers:true,
        ease: "power2.in",
      },
    });
  }, []);

  useGSAP(() => {
    gsap.to(vidbgRef.current, {
      scrollTrigger: {
        trigger: ".footer",
        start: `${isMobile ? "-10%" : "-25%"} top`,
        end: "bottom bottom",
        // scrub: true,
        ease: "power2.in",
        // markers: true,
        onEnter: () => {
          vidbgRef.current.play();
        },
      },
    });
  }, []);

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      const date = new Date();
      const localTime = date.toLocaleTimeString();
      const gmtTime = date.toISOString().split("T")[1].split("Z")[0];
      const offset = date.getTimezoneOffset() / 60;
      const formattedTime = `${localTime}, GMT (${
        offset > 0 ? "+" : ""
      }${offset})`;
      setCurrentTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" h-screen md:h-[100vh]  bg-red-400 w-full uppercase  md:pt-24  ">
      <div className=" footer h-full w-full bg-blue-5 p-3  text-[10px] border-t-2 border-x-[1px] border-zinc-500 ">
        
        <div className=" part1 relative h-1/3 w-full  md:flex md:flex-row-reverse md:justify-between ">
          <div className="relative  top h-1/2 w-full md:w-2/5 md:h-full  overflow-hidden bg-purple-0">
            <video
              ref={vidbgRef}
              className=" h-full w-full object-cover md:object-contain object-center scale-125 md:scale-[2.6] "
              src={signatureVid}
              // autoPlay
              muted
              // loop
              playsInline
            ></video>
          </div>
          <div className=" bottom h-1/2 bg-red-00 w-full  md:w-3/5  md:h-full md:flex-col md:justify-center md:items-center">
            <p className=" text-center md:text-left md:w-[70%] ">
              I push the limits of web innovation, crafting immersive
              experiences with cutting-edge technologies like Webflow,
              Locomotive, and GSAP. My expertise spans industry-leading
              platforms, ensuring visually stunning and interactive websites
              that redefine design and functionality.
            </p>
            <p className=" font-semibold mt-0.5 text-center md:text-left text-[10px]">
              @aniruddha
            </p>
          </div>
        </div>

         
        <div className=" part2 h-1/3 md:h-1/2 w-full bg-blue-70 ">
          <div className="h-full w-full flex flex-col md:flex-row md:justify-between gap-2  md:gap-0  justify-center items-center text-center bg-green-70 border-t-2 border-x-[1px] border-zinc-500  rounded-b-[30px] overflow-hidden ">
            
          <div className=" md:flex md:flex-col flex flex-col gap-2 md:gap-1  justify-center items-center text-center md:justify-start  md:pt-12 md:items-center h-full w-full md:border-r-[1px]  border-zinc-500  rounded-b-[30px]  md:w-1/3  ">    
            <div className="md:mb-2">
              <h1 className="">location</h1>
              <p className=" leading-3">pune <br /> 【 18.5167° N, 73.8563° E 】</p>
            </div>
            <div className="md:mb-2 ">
              <h1 className="leading-3">local time</h1>
              <p className="leading-3">{currentTime}</p>
            </div>
            <div className="md:mb-2">
              <h1 className="">Email</h1>
              <a className="leading-3" href="mailto:aniruddhayalgudre@gmail.com">
                aniruddhayalgudre@gmail.com
              </a>
            </div>

            <div className="md:mb-2">
              <h1 className="">Ring me</h1>
              <a className="leading-3" href="tel:+918999749572">+91 8999749572</a>
            </div>
          </div>

          <div className=" hidden  md:flex   md:flex-col    md:justify-start  md:pt-12 md:items-center h-full w-full md:w-1/3 md:border-x-[1px]  border-zinc-500  rounded-b-[30px] ">
          
            <div className="flex flex-col gap-2 justify-center items-center text-center">
            <div className="">
              <h1>Let’s Be Internet Friends</h1>
              {/* <p>pune-india</p> */}
            </div>
              {socialsLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
              
          <div className=" hidden  md:flex   md:flex-col  md:justify-start  md:pt-12 md:items-center h-full w-full  md:w-1/3 md:border-l-[1px]  border-zinc-500  rounded-b-[30px] ">
          
            <div className="flex flex-col gap-2 justify-end items-center text-center">
            <div className="">
              <h1>Where to Next?</h1>
              {/* <p>pune-india</p> */}
            </div>
              {exploreLinks.map((path, index) => (
                <a
                  key={index}
                  href={path.url}
                  className="hover:text-white"
                  rel="noopener noreferrer"
                >
                  {path.name}
                </a>
              ))}
            </div>
          </div>
              
            </div>
        </div>

        <div className=" part3 h-1/4 w-full bg-blue-90 mt-0.5 md:hidden">
          <div className="  h-full w-full flex flex-col gap-2  justify-center items-center text-center bg-green-70 border-x-[1px]  border-zinc-500  rounded-r-[30px] rounded-l-[30px] ">
            <div className="">
              <h1 className=" mb-2 md:0">Let’s Be Internet Friends</h1>
              {/* <p>pune-india</p> */}
            </div>

            <div className="flex flex-col gap-1 justify-center items-center text-center">
              {socialsLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
