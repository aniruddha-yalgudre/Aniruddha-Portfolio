import React, { useRef, useState, useEffect, forwardRef } from "react";
import Transformtext from "../Partials/Transformtext";
import { useForm, ValidationError } from "@formspree/react";
import gsap from "gsap";

const Contact = () => {
  const FormRef = useRef(null);
  const [statusMsg, setStatusMsg] = useState("LET'S GO ");
  const [errorMsg, setErrorMsg] = useState("");
  const [state, handleSubmit] = useForm("mblopobo");


  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const markRef = useRef(null);
  const markRef1 = useRef(null);
  const ContainerRef = useRef(null);

  useEffect(() => {
     
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ContainerRef.current,
          start: isMobile ? "2% top" : "6% top",
          // markers: true,
          // scrub:true,
          duration:3,
          ease:"power1",
        },
      });
  
      tl.to(markRef.current, {
        duration: 1.2,
        y: isMobile? 120 :200,
        ease: "bounce.out",
        delay: 0.7,
        position: "absolute",
      });
  
      tl.to(markRef1.current, {
        duration: 1,
        ease: "bounce.out",
        x: 30,
        rotation: "90deg",
      });
  
      tl.to(markRef1.current, {
        duration: 2,
        ease: "bounce.out",
        y: -80,
        x: -32,
        rotation: "-190deg",
        delay: -2,
      });
  
      tl.to(markRef1.current, {
        duration: 2,
        ease: "bounce.out",
        y: 10,
        x: 33,
        rotation: "108deg",
        delay: -2,
      });
    }
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      setStatusMsg("BOOM! YOU'RE IN. ");
      setErrorMsg("");
      setTimeout(() => {
        FormRef.current.reset();
        setStatusMsg("LET'S GO");
      }, 3000);
    } else if (state.errors?.length > 0) {
      setStatusMsg("SERVER TRIPPIN'? TRY AGAIN ");
    }
  }, [state.succeeded]);

  const onSubmit = async (e) => {
    e.preventDefault();
    

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const message = formData.get("message").trim();

    if (!name) {
      setErrorMsg("CAN’T GHOST US WITHOUT A NAME ? ");
      setTimeout(() => setErrorMsg(""), 5000);
      return;
    }
    if (!email) {
      setErrorMsg("EMAIL, BUT MAKE IT REAL !");
      setTimeout(() => setErrorMsg(""), 5000);
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      setErrorMsg("GIM'ME SOMETHING THAT ENDS IN .COM ");
      setTimeout(() => setErrorMsg(""), 5000);
      return;
    }
    if (!phone) {
      setErrorMsg("NO DIGITS ? NO CALLS ? ");
      setTimeout(() => setErrorMsg(""), 5000);
      return;
    }
    if (!message) {
      setErrorMsg("YOU GOT THOUGHTS. RIGHT ? DROP ‘EM ");
      setTimeout(() => setErrorMsg(""), 5000);
      return;
    }
    
    setStatusMsg("TELEPORTING YOUR MESSAGE...");
    setErrorMsg("");

    await handleSubmit(e);
  };

  return (
    <div id="contact" ref={ContainerRef} className="  md:h-screen bg-transparent w-full uppercase p-3 ">
      <div className="relative h-full w-full flex-col md:flex justify-between items-center">

        <div className="md:absolute top-0 left-0 h-[45vh] w-full md:h-full md:w-[60%] flex md:justify-start items-center">
          <h1 className="text-[10vw] md:text-[7vw] font-['Secondary'] tracking-tighter leading-none">
            let's do something epic 
            <div className="inline-flex ml-[5%]" ref={markRef}>
              <h1 className="markReftext">
              shit
              </h1>
              <span ref={markRef1} className="ml-[5%]">
                <h1>
                !!
                </h1>
              </span>
            </div>
          </h1>
        </div>

        <div className="md:absolute top-0 right-0 h-[40vh] w-full md:h-full md:w-[40%]">
          <div className="h-full w-full flex flex-shrink-0 justify-start items-center">
            <form onSubmit={onSubmit} ref={FormRef} className="flex flex-col gap-1 md:gap-5 w-full text-[0.70rem] uppercase">
              <input type="text" name="name" placeholder="WHO DIS?"  autoComplete="off"  className="w-full py-1 md:py-3 bg-transparent border-b border-zinc-500 focus:outline-none uppercase" style={{ placeholderColor: 'red' }} />
              <div className="flex gap-6">
                <div className="w-2/3 md:w-1/2">
                  <input type="email" name="email" placeholder="WHAT’S YOUR @? (aka email)"  autoComplete="off" className="w-full py-1 mt-2 md:mt-0 md:py-3 bg-transparent border-b border-zinc-500 focus:outline-none uppercase" />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div className="w-1/3 md:w-1/2">
                  <input type="tel" name="phone" placeholder="SLIDE YOUR DIGITS "  autoComplete="off" className="w-full py-1 mt-2 md:mt-0 md:py-3 bg-transparent border-b border-zinc-500 focus:outline-none uppercase" />
                </div>
              </div>
              <textarea name="message" placeholder="DROP A MESSAGE OR A SPICY COMPLIMENT..." rows="5" className="w-full py-1 mt-2 md:mt-0 md:py-3 bg-transparent border-b border-zinc-500 focus:outline-none resize-none uppercase"></textarea>

              <ValidationError prefix="Message" field="message" errors={state.errors} />
               
               <div className="wfull flex justify-between mt-3 ">
              <button type="submit" disabled={state.submitting} className=" w-fit flex items-center hover:bg-opacity-90 uppercase ">
                <Transformtext textcontent={statusMsg} classname={"leading-none"} />
              </button>
              
              {errorMsg && (
                <p className=" duration-700 leading-none   animate-pulse transition-transform   ">
                  {errorMsg}
                </p>
               )} 
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
