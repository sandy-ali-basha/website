import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useHomeSection } from "hooks/home/useHome";
import defaultImage from "assets/images/defaultImg.jpg";
import i18next from "i18next";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSlides() {
  const containerRef = useRef(null);

  // Fetch home section with ID 2
  const { data, isLoading } = useHomeSection(2);
 const slides = useMemo(() => data?.items || [], [data]);
  // GSAP animation setup
  useEffect(() => {
    if (!slides.length) return;

    const sections = gsap.utils.toArray(".panel");

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => "+=" + containerRef.current.offsetHeight,
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: 0.8,
        ease: "power2.inOut",
      },
      markers: false,
    });

    return () => scrollTrigger.kill();
  }, [slides]);

  if (isLoading) {
    // Show simple Skeletons while loading
    return (
      <Box sx={{ width: "100%", height: "100vh" }}>
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              width: "100%",
              height: "100vh",
              backgroundColor: "#e0e0e0",
              mb: 2,
            }}
          />
        ))}
      </Box>
    );
  }

  if (!slides.length) {
    return (
      <Typography textAlign="center" mt={5}>
        No slides available.
      </Typography>
    );
  }

  return (
    <Box ref={containerRef} sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {slides.map((item, index) => (
        <Box
          key={index}
          className="panel"
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${item.image || defaultImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontSize: "6vw",
                  textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
                  textAlign: "center",
                }}
              >
                {item[`title_${i18next.language}`] || item.title_en || "Slide"}
              </Typography>
            </a>
          )}
        </Box>
      ))}
    </Box>
  );
}
