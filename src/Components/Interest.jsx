import React, { useEffect, useRef } from "react";
import Transformtext from "../Partials/Transformtext";
import discimg from "../assets/M-disc.png";
import sketch from "../assets/arts.png";
import sign from "../assets/signature.png";
import gsap from "gsap";

const Interest = () => {
  return (
    <div className="w-full h-full md:h-screen flex-shrink-0 p-3 text-[10px]">
      <div className="h-full w-full flex flex-col md:flex-row md:justify-between">
        {/* Left section - Profile and Socials */}
        <div className="w-full md:w-3/5 flex flex-col md:flex-row md:justify-between pt-14 md:pt-24">
          {/* Profile section */}
          <div className="relative w-full md:w-1/3 mb-8 md:mb-0">
            <h1 className="text-xs  font-semibold mb-4 text-red-500 md:mb-10 uppercase leading-none  ">
              {/* this is me <br /> ( About ) */}
              All the Things I Dig
              <br />
              Vibing in My Space
            </h1>

            <p className="font-Primary  uppercase   ">
              When I’m not coding or designing, you’ll find me turning blank
              pages into bold sketches, vibing out to my favorite tracks,
              leveling up in the latest games, or getting lost in a great movie
              marathon. These passions fuel my creativity, spark fresh ideas,
              and keep me inspired—on screen and off.
            </p>
            <div className="w-full aspect-[10/2] bg-red-500 md:absolute md:bottom-0 md:left-0 md:w-full md:hidden mt-4 md:mt-0">
              <img
                className="h-full w-full object-cover object-center"
                src={sign}
                alt="gif"
              />
            </div>
          </div>

          {/* art section */}
          <div className=" w-full md:w-2/3 flex flex-col md:flex-row md:justify-end mt-4 md:mt-0">
            <div className="  md:block md:w-[30%] md:h-full bg-black">
              <p className=" text-xl ">{/* itererest page title */}</p>
            </div>

            <div className=" relative w-full md:w-[30%] mb-8 bg-red-500 md:mb-0 md:text-right overflow-hidden">
              <h1 className="text-xs  font-semibold uppercase  mb-4 md:mb-14 leading-none">
                Sketching My Story
                <br />{" "}
                {/* <span className=" font-semibold text-[10px] tracking-tight -mr-1 "> */}
                {/* 【socials】 */}
                {/* </span> */}
              </h1>

              <div className="flex flex-col  gap-2 items-start md:items-end  md:justify-end ">
                <p class="uppercase ">
                  Every sketch starts as a spark—an idea brought to life with
                  pencil and paper. I love exploring shapes, shadows, and
                  stories in every stroke, turning simple lines into bold
                  visuals that speak louder than words.
                </p>

                <div className="w-full h-[22vh]  scale-150  md:scale-[2]  md:absolute  md:bottom-20 md:right-0 md:w-full md:h-auto mt-10 md:mt-0 ">
                  <img
                    className="h-full w-full object-contain  md:object-cover object-center  -rotate-360  md:-rotate-90 transform "
                    src={sketch}
                    alt="sketch"
                    srcSet={sketch}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="hidden relative md:block md:w-1/2 md:h-full bg-blue-500 ">
              {/* <div
                ref={discRef}
                className=" absolute h-full w-full top-[80%]  left-1/2 translate-x-1/2 -translate-y-1/2 transition-all duration-200 "
              >
                <img
                  className="h-fit w-fit  animate-spin transition-all duration-700"
                  src={discimg}
                  alt="music-disc"
                  srcSet={discimg}
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Right section - music and hobbies */}
        <div className="w-full md:w-2/5 flex flex-col md:flex-row pt-4 md:pt-24">
          {/* Approach section */}
          <div className="w-full md:w-2/3  flex flex-col justify-start gap-2 uppercase md:pr-16 mb-8 md:mb-0">
            <h1 className="text-xs font-semibold uppercase mb-4 md:mb-9 leading-none ">
              Echoes & Energy
              <br />
              My Daily Playlist
            </h1>
            <div className="w-full h-full flex flex-col  gap-6 md:gap-20 ">
              <p>
                I’m all about catching that perfect beat—whether it’s chill
                lo‑fi, pulsating synthwave, or soulful acoustic jams. Music
                fuels my flow, sparks new ideas, and turns every moment into a
                scene worth coding too.
              </p>

              <div className="relative w-full ">
                {/* <audio ref={audioRef } src={horsesound} controls>
                  Your browser does not support the audio element.
                </audio> */}
                <iframe
                  className="h-[352px] w-full rounded-lg"
                  src="https://open.spotify.com/embed/playlist/75Oh0kb2ICJIyXx0KXrKFT?utm_source=generator&theme=0"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Services section */}
          <div className="w-full md:w-1/3 flex flex-col justify-start md:items-end uppercase md:text-right gap-1">
            <h1 className="text-xs font-semibold uppercase  mb-4 md:mb-10 leading-none ">
              {" "}
              Off the Grid
              <br />
              My Chill Zone
            </h1>

            <div className="flex flex-col mb-6">
              <h5 className="font-bold mb-3">Leveling Up Happiness</h5>
              <p>
                I game to unplug, to dive into worlds where I can win, lose,
                respawn, and laugh in between. No stakes, just stories,
                reflexes, and the joy of the grind.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h5 className="font-bold mb-3 leading-none">
                Stories I Live In <br /> (For a While)
              </h5>
              <p>
                From plot twists to perfect scores, movies are my late-night
                therapy. I don’t just watch—I wander into frames, chasing mood,
                meaning, and motion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interest;
