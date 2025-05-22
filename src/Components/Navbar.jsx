import { useRef, useState, useEffect, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Transformtext from "../Partials/Transformtext";
import { ThemeContext, ThemeProvider } from "../utils/themeContext";
import { getCalApi } from "@calcom/embed-react";


import  logob from "../assets/logo/logob.svg";
import  logow from "../assets/logo/logow.svg";


gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const Links = [
    { name: "Home", path: "#home" },
    { name: "Works", path: "#works" },
    { name: "About", path: "#about" },
    { name: "Resume", path: "#resume" },
    { name: "Connect", path: "#contact"},
    // { name: "lets's meet" },
  ];

  const TopNavbarRef = useRef(null);

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const lenisRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP scroll animation
  // useGSAP(() => {
  //   if (!TopNavbarRef.current) return
  //   let animation
  //   const ctx = gsap.context(() => {
  //     animation = gsap.from(TopNavbarRef.current, {
  //       delay: 0,
  //       filter: "blur(5px)",
  //       // backgroundColor: "",
  //       y: "-120px",
  //       ease: "power2.in",
  //       scrollTrigger: {
  //         trigger: TopNavbarRef.current,
  //         start: "top 100%",
  //         end: "+=650px",
  //         scrub: true,
  //         onUpdate: (self) => {
  //           if (self.progress === 1 && animation) {
  //             animation.kill()
  //             ScrollTrigger.getById("nav-trigger")?.kill()
  //           }
  //         },
  //       },
  //     })
  //   }, TopNavbarRef)

  //   return () => {
  //     ctx.revert()
  //     animation?.kill()
  //   }
  // }, [])

  // const handleNavClick = (index) => {
  //   setSelectedIndex(index)
  //   if (lenisRef.current) {
  //     const targetScroll = window.innerWidth * (index === 3 ? index * 0.93 : index * 0.47)
  //     lenisRef.current.scrollTo(targetScroll)
  //   }
  // }

  const isVisibleRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <nav
      ref={TopNavbarRef}
      className={`navbar absolute md:fixed z-[999] w-full flex flex-col justify-between items-center `}
    >
      <div className=" h-20 w-full  flex justify-between items-start p-3 text-[10px] transition-colors duration-500   md:overflow-hidden">
        <div className="w-3/5 ">
          <div className=" w-full flex items-start justify-between overflow-hidden">
            
            <div
              onClick={() => handleNavClick(0)}
              className=" relative  w-full md:w-1/3 text-left leading-4 md:leading-3  transition-all duration-700  uppercase   "
            >
            <p className={` -translate-y-[0.25vh] transition-all duration-700 `}>
              a branding and design visionary who fuses multicultural insights
              with bold, innovative visuals to craft unforgettable, award‑worthy
              brand identities that truly resonate.
              <img className="h-7 hidden  absolute top-0  w-fit  translate-y-[7.25vh]  object-cover object-center transition-all duration-700 " src={ isDarkMode ? logow : logob } alt="logo" srcSet={isDarkMode ? logow : logob } />
            </p>
            </div>

            <div className="freelance-section hidden md:w-1/3 md:flex md:flex-col md:items-end md:gap-1 mr-[17.67vw] ">
              <button className="flex items-center">
                <span className="inline-block rounded-full leading-none mr-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0"
                    className="h-2.5 w-4 leading-none "
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" fill="#289f28" />
                    <filter id="glow">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    </filter>
                  </svg>
                </span>

                <Transformtext
                  textcontent={"Available for Freelancing"}
                  classname={"uppercase leading-none"}
                />
              </button>

              <button
                data-cal-namespace="30min"
                data-cal-link="aniruddha-yalgudre/30min"
                data-cal-config='{"layout":"month_view"}'
                className="mix-blend-difference"
              >
                <Transformtext
                  textcontent={"let's talk"}
                  classname={
                    "uppercase  hover:font-semibold leading-none  mix-blend-difference "
                  }
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`flex items-start md:w-2/5 h-fit w-full ${
            isMobile ? " justify-end" : "justify-between"
          }`}
        >
          {!isMobile && (
            <p
              ref={isVisibleRef}
              className="w-2/3 leading-3  mix-blend-difference uppercase "
            >
              Passionately blending modern frameworks, pixel-perfect UI, and
              captivating animations to craft seamless, responsive web
              experiences, interactive, high-performance interfaces built with
              love to engage, inspire, and leave a lasting impression on every
              device.
            </p>
          )}

          <div className="links-part flex flex-col items-end md:w-1/3">
            {Links.slice(1).map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index)}
                className={`relative leading-none 
                  shrink-0 cursor-pointer mb-1 mix-blend-difference  uppercase hover:font-semibold  
                ${index === selectedIndex ? "font-bold" : "font-normal"}
              `}
              >
                <a href={link.path}>
                <Transformtext
                  textcontent={link.name}
                  classname={"mix-blend-difference   "}
                />
                </a>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const BottomNavbar = () => {

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className="relative">
      {/* Fixed Bottom Navbar */}
      <div className="fixed bottom-0 w-full h-9 z-[999] text-[10px] ">
        {/* Foreground content */}
        <div className="relative z-10 w-full h-full p-3 flex justify-between items-center uppercase  ">
          <div className="part1 leading-none flex justify-start ">
            <p className=" mix-blend-difference  hidden md:block">
              based in 【 india | Pune 】
            </p>

            <button className=" mix-blend-difference uppercase text-left md:hidden ">
              <p>
                © 2024-2025 aniruddha <br />／ All rights reserved.
              </p>
            </button>
          </div>

          <div className="part2 leading-none flex justify-end ">
            <button
              onClick={() => toggleTheme()}
              className=" absolute  md:bottom-7  -mr-1.5 mix-blend-difference uppercase leading-none "
            >
              <Transformtext
                textcontent={isDarkMode ? "【light-mode】" : "【dark-mode】"}
                classname={" "}
              />
            </button>

            <button className=" hidden  md:block mix-blend-difference uppercase w-full ">
              <p className=" ">
                © 2024-2025 aniruddha ／ All rights reserved.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navbar, BottomNavbar };
