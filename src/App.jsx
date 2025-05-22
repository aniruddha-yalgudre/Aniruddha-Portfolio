import React, { useContext, useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";

import Hero from "./Components/Hero";
import Interest from "./Components/Interest";
import { Navbar, BottomNavbar } from "./Components/Navbar";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Resume from "./Components/Resume";
import Works from "./Components/Works";
import About from "./Components/About";
import UnicornEmbed from "./Components/UnicornEmbed";
import FAQ from "./Components/FAQ";
import Loader from "./Partials/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Footer2 from "./Components/Footer2";
import { ThemeContext } from "./utils/themeContext";

function App() {
  const containerRef = useRef(null);  
  const cursorRef = useRef(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const svg = document.querySelector("svg.trail");
    const path = svg?.querySelector("path");
    const points = [];

    const resizeVP = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      svg.setAttribute("width", ww);
      svg.setAttribute("height", wh);
      svg.setAttribute("viewBox", `0 0 ${ww} ${wh}`);
    };

    const move = (e) => {
      if (!svg || !path) return;

      const x = e.clientX;
      const y = e.clientY;

      points.push({ x, y });

      // Limit to last 30 points to avoid lag
      if (points.length > 20) points.shift();

      const d = `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`;
      gsap.to(path, {
        attr: { d: d },
        duration: 0.3,
        ease:"power1",
      });
    };

    resizeVP(); // Initial resize
    window.addEventListener("mousemove", move);
    window.addEventListener("resize", resizeVP);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resizeVP);
    };

  }, []);


  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: containerRef.current, // ← explicitly point at our ref
      smooth: true,
      smoothMobile: true,
      lerp: 0.05, // Adjusted for smoother scrolling
      multiplier: 0.5, // Adjusted for smoother scrolling
    });

    // Cleanup on unmount
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  // useEffect(() => {
  //   // Double tap to fullscreen for mobile devices
  //   let lastTap = 0;
  //   const handleDoubleTap = () => {
  //     const now = new Date().getTime();
  //     const timeSince = now - lastTap;

  //     if (timeSince < 300 && timeSince > 0) {
  //       // Double tap detected
  //       if (!document.fullscreenElement) {
  //         document.documentElement.requestFullscreen().catch((err) => {
  //           console.log(
  //             `Error attempting to enable fullscreen: ${err.message}`
  //           );
  //         });
  //       } else {
  //         if (document.exitFullscreen) {
  //           document.exitFullscreen();
  //         }
  //       }
  //     }
  //     lastTap = now;
  //   };

  //   // Only add the listener on mobile devices
  //   if (window.innerWidth < 768) {
  //     document.addEventListener("touchend", handleDoubleTap);
  //   }
  //   return () => {
  //     document.removeEventListener("touchend", handleDoubleTap);
  //   };
  // }, []);

  return (
    <div
      ref={containerRef}
      data-scroll-container // ← tell Loco this is the scroll‐wrapper
      className=" h-full w-full overflow-hidden "
    >
      {/* <div className="cursorRef fixed top-0 left-0    pointer-events-none z-[9999]"> */}

      {/* <svg className="trail absolute   h-[200px] w-[200px] bg-red-600  "  viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1"> */}
      <svg
        className=" hidden trail top-0 left-0  md:block  fixed   w-full pointer-events-none  transition-all  duration-100  "
        viewBox="0 0 40 40 "
        // fill={isDarkMode ? 'white' : 'black'}
        // stroke={isDarkMode ? 'yellow' : 'green'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5px"
      >
        <path d="M 10 10 L 20 20 " />
      </svg>
   
      <Loader/>
      <Navbar />

      <section data-scroll-section><Hero /></section>
      <section data-scroll-section><Works /></section>
      <section data-scroll-section><About /></section>
      <section data-scroll-section><FAQ /></section>
      <section data-scroll-section><Contact parentContainerRef={containerRef} /></section>
      <section data-scroll-section><Footer/></section>
      <BottomNavbar />
    </div>
  );
}

export default App;
