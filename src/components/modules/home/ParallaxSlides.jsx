import React, { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import defaultImage from "assets/images/defaultImg.jpg";
import i18n from "i18n";

gsap.registerPlugin(ScrollTrigger);

/* 🔹 Slide Panel */
function SlidePanel({ item, index }) {
  const [bgImage, setBgImage] = useState(defaultImage);

  useEffect(() => {
    if (!item?.image) {
      setBgImage(defaultImage);
      return;
    }

    const img = new Image();
    img.src = item.image;

    img.onload = () => setBgImage(item.image);
    img.onerror = () => setBgImage(defaultImage);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [item?.image]);

  return (
    <Box
      className="panel"
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: index + 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform",
      }}
    >
      {item?.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography
            className="panel-title"
            variant="h2"
            sx={{
              color: "#fff",
              fontSize: "6vw",
              textAlign: "center",
              textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            {item[`title_${i18n.language}`] || item.title_en || "Slide"}
          </Typography>
        </a>
      )}
    </Box>
  );
}

/* 🔹 Main Component */
export default function ParallaxSlides({ data, isLoading }) {
  const containerRef = useRef(null);

  // ⚠️ freeze slides to avoid re-render issues during scroll
  const slides = useMemo(() => data?.items || [], []);

  useEffect(() => {
    if (!slides.length) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel", containerRef.current);

      // initial state
      gsap.set(panels.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${panels.length * 100}%`,
          scrub: true,
          // ❌ NO pin here → avoids React DOM crash
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;

        tl.to(
          panel,
          {
            yPercent: 0,
            ease: "none",
            duration: 1.5
          },
          i
        );
      });
    }, containerRef);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, [slides]);

  /* 🔹 Loading */
  if (isLoading) {
    return (
      <Box sx={{ width: "100%", height: "100dvh" }}>
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              width: "100%",
              height: "100dvh",
              backgroundColor: "#e0e0e0",
              mb: 2,
            }}
          />
        ))}
      </Box>
    );
  }

  /* 🔹 Empty */
  if (!slides.length) {
    return (
      <Typography textAlign="center" mt={5}>
        No slides available.
      </Typography>
    );
  }

  /* 🔹 Render */
  return (
    <Box sx={{ height: `${slides.length * 200}dvh` }}>
      {/* Sticky viewport */}
      <Box
        ref={containerRef}
        sx={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        {slides.map((item, index) => (
          <SlidePanel
            key={item.id || `${item.image}-${index}`} // ✅ stable key
            item={item}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );
}