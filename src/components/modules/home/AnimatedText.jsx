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
    // Check if the screen size is above mobile width
    if (window.innerWidth > 600) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gar.current,
          start: "top center",
          end: "bottom center",
          scrub: 5,
        },
      });

      tl.to(gar.current, { y: -10, duration: 1, ease: "power1.inOut" });

      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: gar.current,
          start: "top center",
          end: "bottom center",
          scrub: 5,
        },
      });

      t2.to(gsr2.current, {
        y: 10,
        rotation: 5,
        duration: 1,
        ease: "power1.inOut",
      });

      // Images animation
      imageRefs.current.forEach((ref, index) => {
        tl.to(
          ref,
          {
            y: index % 2 === 0 ? -20 : 20,
            duration: 1,
            ease: "power1.inOut",
          },
          index * 0.1
        );
      });
    }
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
    <Box
      sx={{
        position: "relative",
        display: "flex",
        minHeight: { lg: "70vh", md: "60vh", xs: "40vh" },
      }}
      className="animatedText"
      dir="ltr"
    >
      {Gummies.map((item, index) => (
        <img
          ref={addToRefs}
          src={item}
          key={index}
          className="floatingGummie"
          alt={`gummie ${index + 1}`}
        />
      ))}
      <Box sx={{ width: { xs: "50vw", md: "30%" } }}>
        <img
          src={gar1}
          ref={gsr2}
          className=""
          style={{
            zIndex: "3",
            position: "absolute",
            width: "inherit",
            top: "10%",
          }}
          alt=""
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
        }}
        dir="ltr"
      >
        <Box sx={{ width: { xs: "40vw", md: "auto" } }}>
          <img
            src={fin}
            style={{ position: "relative", zIndex: "5", width: "inherit" }}
            className="text"
            alt=""
          />
        </Box>
        <Box sx={{ width: { xs: "40vw", md: "auto" } }}>
          <img
            src={eis}
            style={{ zIndex: "-1", position: "relative", width: "inherit" }}
            className="text"
            alt=""
          />
        </Box>
      </Box>
    </Box>
  );
}
