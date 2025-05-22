import React, { useEffect, useRef, useState } from "react";
import Transformtext from "../Partials/Transformtext";
import sketch from "../assets/arts.png";
import gsap from "gsap";
import { faqs } from "../utils/FAQs";

const FAQ = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    // Handle window resize
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);


  const [openIndex, setOpenIndex] = useState(null);

  const faqHandler = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div id="faq" className="w-full h-full md:h-screen flex-shrink-0 p-3 text-[10px] uppercase ">
      <div className="h-full w-full flex flex-col md:flex-row md:justify-between">
        {/* Left section - Profile and Socials */}
        <div className="w-full md:w-3/5 flex flex-col md:flex-row md:justify-between pt-14 md:pt-24">
          {/* Profile section */}
          <div className="relative w-full md:w-1/3 mb-8 md:mb-0">
            <h1 className="text-xs font-semibold mb-4  md:mb-10  leading-none">
              {/* this is me <br /> ( About ) */}
              What They’re Sayin’ ?
            </h1>

            <p className="font-Primary uppercase">
              Not trying to flex ( okay, maybe a little ) <br /> but here’s what
              cool humans I’ve worked with had to say. Real words. Real vibes.
              Real ones only.
            </p>
            <div className="w-full aspect-[4/5] md:absolute md:bottom-0 md:left-0 md:w-full mt-4 md:mt-0 md:pr-2">
              <img
                className="h-full w-full object-cover object-center"
                src="https://i.pinimg.com/736x/9e/12/02/9e1202b0cbcdfc300c6938bd796be256.jpg"
                alt="Profile"
              />
            </div>
          </div>

          {/* testmimoniels section */}
          <div className="w-full md:w-2/3 flex flex-col md:flex-row md:justify-end mt-4 md:mt-0">
            <div className="relative w-full md:w-[60%] mb-8 bg-red-500 md:mb-0 md:text-right overflow-hidden">
              <div className=" hidden  md:flex flex-col gap-1 bg-orange-400 items-start md:items-end md:justify-end ">
                <div className="w-full md:w-full md:h-fit mt-4 md:mt-14 aspect-[4/5]">
                  <img
                    className="w-full h-full object-cover object-top"
                    src="https://i.pinimg.com/736x/9e/12/02/9e1202b0cbcdfc300c6938bd796be256.jpg"
                    alt="Profile"
                  />
                </div>

                {/* <div className="w-full h-60  md:w-full md:h-auto mt-4 md:mt-0">
              <img
                className="h-full w-full object-cover object-top"
                src="https://i.pinimg.com/736x/9e/12/02/9e1202b0cbcdfc300c6938bd796be256.jpg"
                alt="Profile"
              />
            </div> */}
              </div>
            </div>

            <div className="relative md:block md:w-1/2 md:h-full ">
              <h1 className="text-xs font-semibold uppercase mb-4 md:mb-14 leading-none">
                Things You Might Wanna <br />
                Know !{/* ________________________________ */}
              </h1>
              {/* <div
                ref={discRef}
                className="absolute h-full w-full top-[80%] left-1/2 translate-x-1/2 -translate-y-1/2 transition-all duration-200"
              >
                <img
                  className="h-fit w-fit animate-spin transition-all duration-700"
                  src={discimg}
                  alt="music-disc"
                  srcSet={discimg}
                />
              </div> */}

              <div className=" hidden w-full h-64 md:block md:absolute bg-red-500  md:bottom-0 md:left-0 md:w-full md:h-fit mt-4 md:-mb-3 md:pl-4  ">
              </div>
            </div>
          </div>
        </div>

        {/* Right section - music and hobbies */}
        <div className="w-full md:w-2/5 flex flex-col md:flex-row pt-4 md:pt-24 uppercase ">
          {/* Faq section */}

          <div className="w-full md:w-full flex flex-col   overflow-hidden  ">
            {faqs.map((data, index) => {
              const answerRef = useRef();
              useEffect(() => {
                if (openIndex === index) {
                  gsap.to(answerRef.current, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.in",
                    display: "flex",
                  });
                } else {
                  gsap.to(answerRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.inOut",
                    display: "hidden",
                  });
                }
              }, [openIndex]);

              return (
                <div
                  key={index}
                  className="flex flex-col gap-5 overflow-y-auto  overflow-x-hidden "
                >
                  <div
                    // onClick={isMobile ? () => faqHandler(index) : undefined }
                    className={`flex-col mb-4 items-center h-fit py-2 w-full gap-2 border-y-[1px] border-zinc-500 overflow-hidden transition-all duration-700 `}
                  >
                    <div
                    className="flex  justify-between items-center  ">
                      <p className="que font-semibold w-[90%] md:w-full">
                        {data.question}
                      </p>
                      <span
                        onClick={() => faqHandler(index)}
                        className={` leading-none  cursor-pointer ${
                          openIndex == index ? " animate-none" : ""
                        }   `}
                      >
                        <i
                          className={`toggler ri-${
                            openIndex == index ? "indeterminate" : "add"
                          }-circle-line  transition-all duration-500 text-[15px]  md:text-[15px]`}
                        ></i>
                      </span>
                    </div>

                    <div
                      ref={answerRef}
                      className="flex justify-between gap-6  md:gap-12 overflow-hidden  "
                    >
                      <p className="ans w-full md:w-2/3 text-justify  mt-2 ">
                        {data.answer}
                      </p>
                      <div className=" w-fit md:w-1/3 flex justify-end  mt-2 ">
                        <img
                          className="h-full w-fit object-cover object-center bg-blend-difference "
                          src={data.Image}
                          alt="covers"
                          srcSet={data.image}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
