import React, { useEffect, useRef, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Box, Skeleton, Typography } from "@mui/material";
import "swiper/css";
import { useHomeSection } from "hooks/home/useHome";
import i18n from "i18n";

export default function Reels() {
  const { data, isLoading } = useHomeSection(4);

  // 👉 backend items
  const items = useMemo(() => data?.data?.items || [], [data?.data?.items]);

  const videoRefs = useRef([]);
  const observer = useRef(null);
  const [loadingStatus, setLoadingStatus] = useState([]);

  /* Initialize loading state when items arrive */
  useEffect(() => {
    if (items.length) {
      setLoadingStatus(new Array(items.length).fill(true));
    }
  }, [items.length]);

  /* Lazy-load videos */
  useEffect(() => {
    if (!items.length) return;

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
  }, [items]);

  const handleVideoLoad = (index) => {
    setLoadingStatus((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={3}
      modules={[Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      style={{ padding: "2vh 0" }}
    >
      {(isLoading ? Array.from(new Array(4)) : items).map((item, idx) => (
        <SwiperSlide key={item?.id || idx}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              cursor: item?.cta_link ? "pointer" : "default",
            }}
            onClick={() =>
              item?.cta_link && window.open(item.cta_link, "_blank")
            }
          >
            {/* Skeleton */}
            {(isLoading || loadingStatus[idx]) && (
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ width: "100%", height: 300 }}
              />
            )}

            {/* Overlay */}
            {!isLoading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  px: 2,
                  background: "rgba(0,0,0,0.35)",
                }}
              >
                <Typography variant="h6" color="white">
                  {item?.[`title_${i18n.language}`]}
                </Typography>
                <Typography variant="body2" color="white">
                  {item?.[`description_${i18n.language}`]
                    ?.replace(/<\/?[^>]+(>|$)/g, "")}
                </Typography>
              </Box>
            )}

            {/* Video */}
            {!isLoading && (
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                style={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                  backgroundColor: "#f2f2f2",
                  display: loadingStatus[idx] ? "none" : "block",
                }}
                data-src={item?.image} // 🔁 will be video URL
                onLoadedData={() => handleVideoLoad(idx)}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
            )}
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
