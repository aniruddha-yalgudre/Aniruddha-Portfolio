import React from "react";
import Transformtext from "../Partials/Transformtext";
import sign from "../assets/signature.png";

// import privacyPage from "../pages/Privacy-Policy.html";
// import termsConditionsPage from "../pages/Terms-Conditions.html";

const Footer2 = () => {
  return (
    <div className="w-full h-full md:h-screen flex-shrink-0 p-3 text-[10px] uppercase   md:pb-12  ">
      <div className="h-full w-full flex flex-col md:flex-row md:justify-between md:items-end  bg-blue-600  ">
        {/* Left section - Profile and Socials */}
        <div className="relative w-full md:w-3/5  md:h-[50vh] flex flex-col md:flex-row md:justify-between  bg-red-500 border-y-[1px] border-zinc-600 md:py-6 ">
          {/* signature img */}
          <div className=" absolute w-full h-full  md:left-2/3 md:top-[80%] -translate-x-1/2 -translate-y-1/2 md:w-full md:h-auto  md:mt-0 overflow-visible">
            <img
              className="h-full w-full object-cover  object-top opacity-20 scale-[1.5] mix-blend-multiply -rotate-1  "
              src={sign}
              alt="Profile"
            />
          </div>

          {/* Profile section */}
          <div className=" w-full  flex flex-col justify-between  items-end  md:mb-0 pr-[17.67vw] ">
            <div>
              <h1 className="text-xs font-semibold  mb-4 md:mb-10 uppercase leading-none">
                From Sketches to Stories <br />
                This Is Me
              </h1>

              <p className="font-Primary uppercase mb-4 md:mb-0 ">
                Hey, I'm Aniruddha yalgudre, a creative frontend wizard by day
                and a code-slinging software dev by night. I blend pixel-perfect
                design with rock‑solid code to build experiences that people
                actually enjoy.
              </p>
            </div>

            <div className=" w-full bg-pink-400 flex justify-between ">
              <p className=" leading-none ">
                <Transformtext textcontent="© 2024-2025" />
              </p>
              <div className="flex gap-5 ">
                <a
                  href="/Terms-Conditions.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-none"
                >
                  <Transformtext textcontent="Terms and Conditions" />
                </a>

                <a
                  href="/Privacy-Policy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-none"
                >
                  <Transformtext textcontent="Privacy Policy" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Approach and Services */}
        <div className="w-full md:w-2/5 flex flex-col md:flex-row md:h-[50vh] bg-purple-600 overflow-hidden border-y-[1px] border-zinc-600  md:py-6 ">
          {/* Approach section */}
          <div className="w-full md:w-2/3  flex flex-col justify-between  uppercase md:pr-16 mb-8 md:mb-0">
            
            <h1 className="text-xs font-semibold uppercase mb-4 tracking-widest md:mb-10 ">
              approach
            </h1>


            <div>
            <p className=" ">
              I approach every design challenge with precision, purpose, and a
              deep commitment to visual storytelling crafting brand experiences
              that not only look good but feel meaningful.
            </p>
            
            </div>

          </div>

          {/* Services section */}
          <div className="w-full md:w-1/3 flex flex-col justify-between md:items-end leading-3  uppercase md:text-right ">
           
            <h1 className="text-xs font-semibold uppercase  tracking-widest">
              Services
            </h1>
 
            <div className="flex flex-col gap-1 ">
              <h5 className="font-bold mb-3 ">Digital</h5>
              
              <p>Web & Product Interface Design</p>
              <p>UX/UI Design</p>
              <p>User Testing</p>
              <p>Digital Strategy & Visual Frameworks</p>
              <p>Information Architecture</p>
            </div>

            {/* <div className="flex flex-col gap-1">
              <h5 className="font-bold mb-3">beyond design</h5>

              <p>Freelance Creative Collaboration</p>
              <p>Design Consulting & Supervision</p>
              <p>Project Direction & Oversight</p>
              <p>Talks, Guest Sessions & Panels</p>
              <p>Workshops, Mentorship & Design Education</p>
            </div>*/}
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Footer2;
