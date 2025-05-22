import { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 6] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 10],
      velocityMapping?.output || [0, 6],
      { clamp: false }
    );

    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min, max, v) {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return "0px";
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta /200);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 2); i++) {
      spans.push(
        <span
          className={`flex-shrink-0 ${className}`}
          key={i}
          ref={i === 0 ? copyRef : null}
        >
          {children}
        </span>
      );
      
    }

    return (
      <div
        className={`${parallaxClassName} relative overflow-hidden   `}
        style={parallaxStyle}
      >
        <motion.div
          className={`${scrollerClassName} flex whitespace-nowrap  text-[3rem] leading-none font-bold tracking-[0.02em] drop-shadow  md:text-[7rem]  md:leading-none  `}
          style={{x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => {

        // Check if the text contains specific keywords
        const hasCreative = text.toLowerCase().includes("creative");
        const hasUiux = text.toLowerCase().includes("ui-ux");
        const hasYalgudre = text.toLowerCase().includes("yalgudre");
        
        // If text contains the keywords, render with special formatting
        if (hasCreative || hasUiux|| hasYalgudre) {
          // Split the text to apply the class only to the specific part
          const parts = text.split(" ").map((part, i) => {
            const isCreative = part.toLowerCase().includes("creative");
            const isUiux = part.toLowerCase().includes("ui-ux");
            const isYalgudre = part.toLowerCase().includes("yalgudre");
            
            return isCreative || isUiux || isYalgudre ? 
              <span key={i} className="text-fill-transparent  ">{part}</span> : 
              <span key={i}>{part}</span>;
          });
          
          return (
            <VelocityText
              key={index}
              className={className}
              baseVelocity={index % 2 !== 0 ? -velocity : velocity}
              scrollContainerRef={scrollContainerRef}
              damping={damping}
              stiffness={stiffness}
              numCopies={numCopies}
              velocityMapping={velocityMapping}
              parallaxClassName={parallaxClassName}
              scrollerClassName={scrollerClassName}
              parallaxStyle={parallaxStyle}
              scrollerStyle={scrollerStyle}
            >
              {parts}
            </VelocityText>
          );
        }
        
        // Otherwise render normally
        return (
          <VelocityText
            key={index}
            className={className}
            baseVelocity={index % 2 !== 0 ? -velocity : velocity}
            scrollContainerRef={scrollContainerRef}
            damping={damping}
            stiffness={stiffness}
            numCopies={numCopies}
            velocityMapping={velocityMapping}
            parallaxClassName={parallaxClassName}
            scrollerClassName={scrollerClassName}
            parallaxStyle={parallaxStyle}
            scrollerStyle={scrollerStyle}
          >
            {text}&nbsp;
          </VelocityText>
        );
      })}
    </section>
  );
};

export default ScrollVelocity;
