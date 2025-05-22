import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap';

const Transformtext = ({textcontent, classname}) => {
     
    const [text, setText] = useState(textcontent || "");
     
    const splittext = text.split("");
     
    const containerRef = useRef(null);
    const firstTextRef = useRef(null);
    const secondTextRef = useRef(null);
     
    useEffect(() => {
        setText(textcontent || "");
        
        const container = containerRef.current;
        const firstText = firstTextRef.current;
        const secondText = secondTextRef.current;
        
        if (!container || !firstText || !secondText) return;
        
        // Calculate the offset based on the font size
        const updateSecondTextPosition = () => {
            const computedStyle = window.getComputedStyle(firstText);
            const fontSize = parseFloat(computedStyle.fontSize);
            // Set the second text position dynamically based on font size
            secondText.style.top=`${fontSize}px`;
        };
        
        // Initial position update
        updateSecondTextPosition();
        
        // Update position on window resize
        window.addEventListener('resize', updateSecondTextPosition);
        
        let animation;
        let isAnimating = false;
        
        const handleMouseEnter = () => {
            // If animation is already running, don't restart it
            if (isAnimating) return;
            
            isAnimating = true;
            
            // Create staggered animation for letters
            animation = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                }
            });
            
            animation.to(firstText.children, {
                y: "-100%",
                duration: 0.3,
                stagger: {
                    each: 0.02,
                    from: "end"
                },
                ease: "power2.out"
            });
            
            animation.to(secondText.children, {
                y: "-100%",
                duration: 0.3,
                stagger: {
                    each: 0.02,
                    from: "edges"
                },
                ease: "power2.out"
            }, "<");
        };
        
        const handleMouseLeave = () => {
            // Only create a new animation if we're not in the middle of one
            // or if we're in the middle of the enter animation
            if (animation) {
                // Instead of killing, we'll pause and reverse the animation
                animation.pause();
            }
            
            // Reset position with a new animation
            isAnimating = true;
            animation = gsap.to([firstText.children, secondText.children], {
                y: "0%",
                duration: 0.3,
                stagger: {
                    each: 0.02,
                    from: "edges"
                },
                ease: "power2.out",
                
                onComplete: () => {
                    isAnimating = false;
                }
            });
        };
        
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', updateSecondTextPosition);
            if (animation) animation.kill();
        };
    }, [textcontent]);

    return (
        <div className={`overflow-hidden ${classname}`}>
            <div 
                ref={containerRef} 
                className="relative flex flex-col overflow-hidden"
            >
                <div ref={firstTextRef} className="flex overflow-hidden">
                    {splittext.map((letter, index) => (
                        <span key={`first-${index}`} className="inline-block ">
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    ))}
                </div>
                
                
                <div ref={secondTextRef} className="flex absolute left-0 top-0">
                    {splittext.map((letter, index) => (
                        <span key={`second-${index}`} className="inline-block ">
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transformtext