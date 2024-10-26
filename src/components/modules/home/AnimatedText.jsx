import React from "react";
import { Box } from "@mui/material";
//* images
import gummie1 from "assets/images/animatedText/gummy (1).png";
import gummie2 from "assets/images/animatedText/gummy (2).png";
import gummie3 from "assets/images/animatedText/gummy (3).png";
import gummie4 from "assets/images/animatedText/gummy (4).png";
import gummie5 from "assets/images/animatedText/gummy (5).png";
import gummie6 from "assets/images/animatedText/gummy (6).png";
import gummie7 from "assets/images/animatedText/gummy (7).png";
import gar1 from "assets/images/Asset 2.png";
import fin from "assets/images/Asset 1.png";
import eis from "assets/images/Asset 3.png";

//*GSAP
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText() {
  const gar = useRef(null);
  const gsr2 = useRef(null);

  const imageRefs = useRef([]);
  imageRefs.current = [];
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gar.current,
        start: "top center",
        end: "bottom center",
        scrub: 5,
        // pin: true,
        // pinSpacing: false,
      },
    });

    tl.to(gar.current, { y: -10, duration: 1, ease: "power1.inOut" });

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: gar.current,
        start: "top center",
        end: "bottom center",
        scrub: 5,
        // pin: true,
        // pinSpacing: false,
      },
    });

    t2.to(gsr2.current, {
      y: 10,
      rotation: 5,
      duration: 1,
      ease: "power1.inOut",
    });

    //*images
    imageRefs.current.forEach((ref, index) => {
      tl.to(
        ref,
        {
          y: index % 2 === 0 ? -20 : 20, // Alternate direction for visual effect
          duration: 1,
          ease: "power1.inOut",
        },
        index * 0.1
      ); // Stagger by 0.1 seconds
    });
  }, []);

  const Gummies = [
    gummie1,
    gummie2,
    gummie3,
    gummie4,
    gummie5,
    gummie6,
    gummie7,
  ];
  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };
  return (
    <Box sx={{ position: "relative" }} className="animatedText" dir="ltr">
      {Gummies.map((item, index) => (
        <img
          ref={addToRefs}
          src={item}
          key={index}
          className="floatingGummie"
          alt={`gummie ${index + 1}`}
        />
      ))}
      <img
        src={gar1}
        ref={gsr2}
        className=""
        style={{ zIndex: "3", position: "absolute" }}
        alt=""
      />{" "}
      <Box sx={{ display: "flex" ,position:'relative'}}>
        <img
          src={fin}
          style={{ position: "relative", zIndex: "5" }}
          className="text"
          alt=""
        />
        <img
          src={eis}
          style={{ zIndex: "-1", position: "relative" }}
          clasName="text"
          alt=""
        />
        {/* <img
            src={gar1}
            className="floatingGar"
            style={{ zIndex: "1" }}
            ref={gar}
            alt=""
          /> */}
      </Box>
    </Box>
  );
}
