import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Transformtext from "../Partials/Transformtext";
import Interest from "./Interest";

const About = () => {
  const containerRef = useRef(null);
  const socialsLinks = [
    { name: "linkedin", url: "#linkedin" },
    { name: "github", url: "#github" },
    { name: "twitter", url: "#twitter" },
    { name: "behance", url: "#behance" },
    { name: "dribble", url: "#dribble" },
    { name: "read.cv", url: "#read.cv" },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Only apply horizontal scrolling on desktop
    if (!isMobile && containerRef.current) {
      // Get all panel elements
      const sections = gsap.utils.toArray(".panel");

      // Create the horizontal scrolling animation for desktop only
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.1,
          start: "top top",
          end: () =>
            `+=${containerRef.current.offsetWidth * (sections.length - 1)}`,
          invalidateOnRefresh: true,
        },
      });

      // Cleanup function
      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }
  }, [isMobile]);

  return (
    <div
      id="about"
      ref={containerRef}
      className={`flex ${isMobile ? "flex-col" : "flex-row"} w-full 
     ${isMobile ? "" : "h-screen overflow-hidden"}
      `}
    >
      <div className="panel w-full h-full md:h-screen flex-shrink-0 p-3 text-[10px]">
        <div className="h-full w-full flex flex-col md:flex-row md:justify-between">
          {/* Left section - Profile and Socials */}
          <div className="w-full md:w-3/5 flex flex-col md:flex-row md:justify-between pt-14 md:pt-24 ">
            {/* Profile section */}
            <div className="relative w-full md:w-1/3 mb-8 md:mb-0">
              <h1 className="text-xs font-semibold  mb-4 md:mb-10 uppercase leading-none">
                From Sketches to Stories <br />
                This Is Me
              </h1>

              <p className="font-Primary uppercase mb-4 md:mb-0 ">
                Hey, I'm Aniruddha yalgudre, <br />a creative frontend wizard by
                day and a code-slinging software dev by night. I blend
                pixel-perfect design with rock‑solid code to build experiences
                that people actually enjoy.
              </p>
              <div className="w-full h-full md:absolute md:bottom-0 md:left-0 md:w-full md:h-auto mt-4 md:mt-0 aspect-[4/5]">
                <img
                  className="h-full w-full object-cover object-top"
                  src="https://i.pinimg.com/736x/9e/12/02/9e1202b0cbcdfc300c6938bd796be256.jpg"
                  alt="Profile"
                />
              </div>
            </div>

            {/* Socials & skills  section */}
            <div
              className="w-full md:w-2/3 flex flex-col md:flex-row md:justify-end mt-4 md:mt-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hidden md:block md:w-[30%] md:h-full bg-black">
                {" "}
              </div>

              <div className="vertical_container w-full md:w-[30%] bg-red-700 mb-8 md:mb-0 md:text-right">
                <div className="socials-section ">
                  <h1 className="text-xs font-semibold uppercase  mb-6  md:mb-11 leading-none">
                    Say What's Up On <br />
                    <span className="font-semibold text-[10px] tracking-tight -ml-1 md:-mr-1">
                      【socials】
                    </span>
                  </h1>

                  <div className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-2 md:items-end md:mb-11  ">
                    {socialsLinks.map((link, index) => (
                      <a key={index} href={link.url} className="mr-4 md:mr-0">
                        <Transformtext
                          textcontent={`【${link.name}】`}
                          classname={"uppercase leading-none -ml-1 md:-mr-1"}
                        />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="skills-section uppercase ">
                  <h1 className="text-xs font-semibold uppercase  mt-6 md:my-3  leading-none bg-blue-400">
                    STUFF I CODE WITH
                    <br />
                    <span className="font-semibold text-[10px] tracking-tight -ml-1 md:-mr-1">
                      【skills】
                    </span>
                  </h1>

                  <div className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-2 md:items-end  ">
                    <h5 className="font-bold leading-none my-3 w-full">
                      frontend development And tools{" "}
                    </h5>
                    {[
                      "html",
                      "css",
                      "scss",
                      "tailwindcss",
                      "gsap",
                      "javascript",
                      "reactjs",
                      "three.js",
                      "node.js",
                      "express.js",
                      "mongodb",
                      "Jest",
                      "rest api",
                      "git-github",
                      "postman",
                    ].map((skill, index) => (
                      <a key={index} className="mr-4 md:mr-0">
                        <Transformtext
                          textcontent={`【${skill}】`}
                          classname={"uppercase leading-none -ml-1 md:-mr-1"}
                        />
                      </a>
                    ))}
                  </div>

                  {/* <div className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-2 md:items-end  ">  
                <h5 className="font-bold my-3 w-full">backend developement / programming languages  </h5>
                  {["node.js", "express.js", "mongodb","mysql","rest api","java core",].map((skill, index) => (
                    <a key={index} className="mr-4 md:mr-0">
                      <Transformtext
                        textcontent={`【${skill}】`}
                        classname={"uppercase leading-none -ml-1 md:-mr-1"}
                      />
                    </a>
                  ))}
                </div> */}
                </div>
              </div>

              {/* <div className="vertical_container w-full md:w-[30%] mb-8 md:mb-0 md:text-right">
                <h1 className="text-xs font-semibold uppercase  mb-6  md:mb-10 leading-none">
                  Say What's Up On <br />
                  <span className="font-semibold text-[10px] tracking-tight -ml-1 md:-mr-1">
                    【socials】
                  </span>
                </h1>

                <div className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-2 md:items-end  ">
                  {socialsLinks.map((link, index) => (
                    <a key={index} href={link.url} className="mr-4 md:mr-0">
                      <Transformtext
                        textcontent={`【${link.name}】`}
                        classname={"uppercase leading-none -ml-1 md:-mr-1"}
                      />
                    </a>
                  ))}
                </div>
              </div> */}

              <div className="hidden md:block md:w-1/2 md:h-full bg-blue-500"></div>
            </div>
          </div>

          {/* Right section - Approach and Services */}
          <div className="w-full md:w-2/5 flex flex-col md:flex-row pt-4 md:pt-24">
            {/* Approach section */}
            <div className="w-full md:w-2/3  flex flex-col justify-start gap-2 uppercase md:pr-16 mb-8 md:mb-0">
              <h1 className="text-xs font-semibold uppercase mb-4 tracking-widest md:mb-10 ">
                approach
              </h1>
              <p className="mb-2 ">
                I approach every design challenge with precision, purpose, and a
                deep commitment to visual storytelling crafting brand
                experiences that not only look good but feel meaningful.
              </p>
              <p className="mb-2 ">
                I strive to bring a mix of diverse perspectives that spark fresh
                ideas, uncover hidden opportunities, and fuel original,
                meaningful work.
              </p>

              <p className="mb-2 ">
                I see collaboration not just as a step in the process, but as a
                mindset. I work closely with clients as creative partners
                listening, questioning, and building together. Whether I'm
                collaborating with agencies or integrating into internal teams,
                I bring a fresh perspective, adaptability, and sharp design
                thinking to every project.
              </p>

              <p className="mb-2  ">
                From strategic branding to thoughtful digital design, I help
                businesses express who they are and connect with the people who
                matter. Big or small, bold or refined I turn ideas into
                experiences that stand apart.
              </p>
            </div>

            {/* Services section */}
            <div className="w-full md:w-1/3 flex flex-col justify-start md:items-end leading-3  uppercase md:text-right gap-2">
              <h1 className="text-xs font-semibold uppercase mb-4 md:mb-10 tracking-widest">
                Services
              </h1>

              <div className="flex flex-col gap-1 mb-6">
                <h5 className="font-bold mb-3 ">Digital</h5>
                <p>Web & Product Interface Design</p>
                <p>UX/UI Design</p>
                <p>User Testing</p>
                <p>Digital Strategy & Visual Frameworks</p>
                <p>Information Architecture</p>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="font-bold mb-3">beyond design</h5>

                <p>Freelance Creative Collaboration</p>
                <p>Design Consulting & Supervision</p>
                <p>Project Direction & Oversight</p>
                <p>Talks, Guest Sessions & Panels</p>
                <p>Workshops, Mentorship & Design Education</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel w-full h-full md:h-screen flex-shrink-0">
        <Interest />
      </div>
    </div>
  );
};

export default About;
