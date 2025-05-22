import { useEffect, useState } from "react"
import { projectsData } from "../utils/projectsData"
import ShaderImage from "../Partials/ShaderImage"

import vid from "../assets/videos/hero_mob.mp4"

const Works = ({ containerRef }) => {
  const [hoveredProject, setHoveredProject] = useState(null)
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return (
    <div id="works" ref={containerRef} data-scroll-container className="h-full w-full px-3  pt-16 uppercase overflow-hidden text-[10px] ">
      <h1 className="text-xs font-semibold md:mt-6 mb-8 md:mb-12 uppercase leading-3">This Ain’t Just <br /> Work, It’s My Craft
      </h1>

      {/* Mobile view - single column layout */}
      <div className=" mobile-view   md:hidden gap-2 grid columns-2 flex-wrap   ">
        {projectsData.map((project, index) => (
          <div
            // data-scroll
            // data-scroll-speed="0.4"
            key={project.id}
            className={`project-card ${index % 2 === 0 ? "w-fit h-auto text-left " : " w-3/5 h-auto text-right "} ${
              index % 2 === 0 ? "mr-6" : "ml-auto"
            } overflow-hidden mt-2  `}
          >
            <div className="relative overflow-hidden  shadow-md  ">
              <img
                // data-scroll
                // data-scroll-speed="0.2"
                src={project.images[0] || "/placeholder.svg"}
                alt={project.name}
                className={` w-full h-auto object-cover object-center hover:scale-105 transition-all duration-300`}
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {project.name}
                </span>
              </div> */}
            </div>

            <div className="pt-2 ">
              <h3 className=" font-semibold">{project.name}</h3>
              <div className="text-[10px]">
                <p className=" text-gray-400 leading-none mt-0.5 ">
                  {project.typology} | {project.location}
                </p>
                <p className=" text-gray-400 leading-4 ">{project.year}</p>
                <p className="mt-1 ">{project.desc || "Project details coming soon."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - masonry-like layout */}
      <div className="dekstop-gallary hidden md:block overflow-y-hidden ">
        {/* First row */}
        <div className="flex flex-wrap ">
          <div className="w-full  md:w-3/5 flex gap-4 pr-4">
            <div data-scroll data-scroll-speed={(Math.random() * 0.9 + 0.1).toFixed(2)} className="w-1/2  h-fit ">
              <ProjectCard project={projectsData[0]} setHoveredProject={setHoveredProject} />
            </div>

            <div
              data-scroll
              data-scroll-speed={-(Math.random() * 0.78).toFixed(2)}
              // data-scroll-speed="-0.63"
              className="w-1/2 mt-20"
            >
              <ProjectCard project={projectsData[1]} setHoveredProject={setHoveredProject} />
            </div>
          </div>
          <div data-scroll data-scroll-speed={(Math.random() * 0.9 + 0.1).toFixed(2)} className="w-full md:w-2/5">
            <ProjectCard project={projectsData[2]} setHoveredProject={setHoveredProject} />
          </div>
        </div>

        {/* Second row */}
        <div className="flex justify-between flex-wrap mb-8 ">
          <div
            data-scroll
            data-scroll-speed={(Math.random() * 1.2 + 0.1).toFixed(2)}
            className="w-full md:w-[43%] pr-4"
          >
            <ProjectCard project={projectsData[3]} setHoveredProject={setHoveredProject} />
          </div>

          <div className="w-full md:w-[40%]  flex flex-col gap-4">
            <div data-scroll data-scroll-speed={(Math.random() * 0.9 + 0.1).toFixed(2)} className="w-2/3">
              <ProjectCard project={projectsData[4]} setHoveredProject={setHoveredProject} />
            </div>
            <div data-scroll data-scroll-speed={(Math.random() * 0.9 + 0.1).toFixed(2)} className="w-full mt-16">
              <ProjectCard project={projectsData[5]} setHoveredProject={setHoveredProject} />
            </div>
          </div>
        </div>

        {/* Third row */}
        <div className="flex flex-wrap mb-16 bg-red-600 ">
          <div className="w-full md:w-3/5 flex gap-4 pr-4">
          
            <div data-scroll data-scroll-speed={(Math.random() * 1.4).toFixed(2)} className="w-1/2 -mt-52">
              <ProjectCard project={projectsData[6]} setHoveredProject={setHoveredProject} />
            </div>
          
            <div data-scroll data-scroll-speed={-(Math.random() * 0.8 + 0.1).toFixed(2)} className="w-1/2 mt-20">
              <ProjectCard project={projectsData[7]} setHoveredProject={setHoveredProject} />
            </div>
          </div>

          <div data-scroll data-scroll-speed={(Math.random() * 1.3 + 0.1).toFixed(2)} className="w-full md:w-2/5">
            <ProjectCard project={projectsData[8]} setHoveredProject={setHoveredProject} />
          </div>
        </div>
      </div>




      {/* Project detail popup when hovered (desktop only) */}
      {/* {hoveredProject && (
        <div
          className="fixed bottom-8 left-8 right-8 bg-white p-6 rounded-lg shadow-xl z-50 hidden md:block"
          style={{
            maxWidth: "600px",
            backgroundColor: hoveredProject.bgColor || "#ffffff",
            color: hoveredProject.TextColor || "#000000",
          }}
        >
          <h3 className="text-2xl font-bold mb-2">{hoveredProject.name}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm">
                <span className="font-semibold">Location:</span>{" "}
                {hoveredProject.location}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Typology:</span>{" "}
                {hoveredProject.typology}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                {hoveredProject.status}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Year:</span>{" "}
                {hoveredProject.year}
              </p>
            </div>
            <div>
              {hoveredProject.buildArea && (
                <p className="text-sm">
                  <span className="font-semibold">Build Area:</span>{" "}
                  {hoveredProject.buildArea}
                </p>
              )}
              {hoveredProject.siteArea && (
                <p className="text-sm">
                  <span className="font-semibold">Site Area:</span>{" "}
                  {hoveredProject.siteArea}
                </p>
              )}
              <p className="text-sm">
                <span className="font-semibold">Scope:</span>{" "}
                {hoveredProject.scope}
              </p>
              {hoveredProject.team && (
                <p className="text-sm">
                  <span className="font-semibold">Team:</span>{" "}
                  {hoveredProject.team}
                </p>
              )}
            </div>
          </div>
          <p className="text-sm">
            {hoveredProject.desc || "Project details coming soon."}
          </p>
        </div>
      )} */}
    </div>
  )
}

// Component for individual project card
const ProjectCard = ({ project, setHoveredProject }) => {
  if (!project) return null

  return (
    <div
      className="project-card  pb-4 "
      onMouseEnter={() => setHoveredProject(project)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <div className="relative overflow-hidden "> 

        <ShaderImage imageUrl={project.images[ 0 ] || "/placeholder.svg"} width="100%" height="auto"  />

        {/* <video src={vid} autoPlay playsInline muted loop ></video>      */}
        {/* <img
          src={project.images[0] || "/placeholder.svg"}
          alt={project.name}
          className="w-full h-auto object-cover object-center transition-transform duration-700 hover:scale-105"
        /> */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xl font-bold">{project.name}</span>
        </div> */}
      </div>
      <div className="mt-3">
        <h3 className=" font-medium text-xs leading-none tracking-wide ">
          {" "}
          {project.name} <span> </span>
        </h3>
        <p className="mt-1 text-[10px] leading-none ">
          {project.typology} | {project.location}
        </p>
        <p className=" mt-0.5 text-[10px] leading-3">
          {project.status} | {project.year}
        </p>
        <p className=" mt-1 text-[10px] leading-3  line-clamp-3 md:hidden">
          {project.desc || "Project details coming soon."}
        </p>
      </div>
    </div>
  )
}

export default Works
