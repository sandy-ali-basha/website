import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Box, CircularProgress } from "@mui/material";
import "swiper/css";

export default function Reels({ data = [] }) {
 const [loadingStatus, setLoadingStatus] = useState(() => data.map(() => true));

  const videoRefs = useRef([]);
  const observer = useRef(null);

  // Lazy load videos using IntersectionObserver
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
            observer.current.unobserve(video);
          }
        });
      },
      { threshold: 0.25 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.current.observe(video);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [data]);

  const handleVideoLoad = (index) => {
    setLoadingStatus((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={3}
      style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {data.map((reel, idx) => (
        <SwiperSlide key={idx}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => {
              if (reel.link) window.open(reel.link, "_blank");
            }}
          >
            {loadingStatus[idx] && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <CircularProgress size={40} />
              </Box>
            )}

            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              style={{
                width: "100%",
                height: "auto",
                display: loadingStatus[idx] ? "none" : "block",
                borderRadius: 10,
                objectFit: "cover",
              }}
              onLoadedData={() => handleVideoLoad(idx)}
              data-src={reel.videoSrc}
              preload="metadata"
              muted
              loop
              playsInline
              autoPlay
            >
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
