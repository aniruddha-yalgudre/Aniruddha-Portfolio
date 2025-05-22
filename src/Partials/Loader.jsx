import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import logob from "../assets/logo/logob.svg";
import logow from "../assets/logo/logow.svg";

import gsap from "gsap";

const Loader = () => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const counterRef = useRef(null);
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count = Math.min(count + 1, 100);
      setCounter(count.toString().padStart(2, "0"));

      gsap.to(counterRef.current, {
        duration: 2.5,
        ease: "power2.out",
      });

      if (count === 100) {
        clearInterval(interval);

        const tl = gsap.timeline();
        tl.to(counterRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.in",
        });

        tl.to(counterRef.current, {
          opacity: 0,
          delay: 1,
          duration: 0.5,
          ease: "power2.in",
        },"a");

        tl.to(logoRef.current, {
          opacity: 0,
          delay: 1,
          duration: 0.5,
          ease: "power2.in",
        },"a");

        tl.to(loaderRef.current, {
          opacity: 0.2,
          backdropFilter: "blur(30px)",
          delay: 0.2,
          duration: 3,
          ease: "power2.in",
        });
        tl.to(loaderRef.current, {
          opacity: 0,
          backdropFilter: "blur(0px)",
          delay: 0.5,
          duration: 0.7,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(loaderRef.current, {
              display: "none",
            });
          },
        });
      }
    }, 34);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed h-screen w-full  bg-white flex flex-col gap-4 justify-center items-center z-[1000] overflow-hidden "
    >
      <img
        ref={logoRef}
        className=" h-24 w-fit object-cover object-center flex-shrink-0 "
        src={logob}
        alt="loader_logo"
        srcSet={logob}
      />
      <h1 ref={counterRef} className="counter flex-shrink-0">
      【{counter}】
      </h1>
    </div>
  );
};

export default Loader;
