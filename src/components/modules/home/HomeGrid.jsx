import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Box, Skeleton } from "@mui/material";
import "swiper/css";

export default function Reels({ data = [] }) {
const [loadingStatus, setLoadingStatus] = useState(() => data.map(() => true));

  const videoRefs = useRef([]);
  const observer = useRef(null);

  // Lazy load videos
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

    return () => observer.current?.disconnect();
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
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {data.map((item, idx) => (
        <SwiperSlide key={idx}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => item.cta_link && window.open(item.cta_link, "_blank")}
          >
            {/* 🔥 SHIMMER EFFECT */}
            {loadingStatus[idx] && (
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                  width: "100%",
                  height: "300px",
                  borderRadius: 2,
                  bgcolor: "#e0e0e0",
                }}
              />
            )}

            {/* VIDEO (lazy-loaded from item.image) */}
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              style={{
                width: "100%",
                height: "300px",
                display: loadingStatus[idx] ? "none" : "block",
                borderRadius: 10,
                objectFit: "cover",
              }}
              onLoadedData={() => handleVideoLoad(idx)}
              data-src={item.image} // <-- video comes from "image"
              preload="metadata"
              muted
              loop
              playsInline
              autoPlay
            >
              <source type="video/mp4" />
            </video>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
