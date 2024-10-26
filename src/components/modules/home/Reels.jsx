import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Video imports
import ved3Ar from "assets/reels/ar/3.m4v";
import ved2Ar from "assets/reels/ar/2.m4v";
import ved1Ar from "assets/reels/ar/1.m4v";
import ved4Ar from "assets/reels/ar/4.m4v";
import ved5Ar from "assets/reels/ar/5.m4v";

import ved3En from "assets/reels/en/3.m4v";
import ved2En from "assets/reels/en/2.m4v";
import ved1En from "assets/reels/en/1.m4v";
import ved4En from "assets/reels/en/4.m4v";
import ved5En from "assets/reels/en/5.m4v";

import ved3Kr from "assets/reels/kr/3.m4v";
import ved2Kr from "assets/reels/kr/2.m4v";
import ved1Kr from "assets/reels/kr/1.m4v";
import ved4Kr from "assets/reels/kr/4.m4v";
import ved5Kr from "assets/reels/kr/5.m4v";

const Shimmer = () => (
  <div
    style={{
      width: "100%",
      height: "80vh",
      backgroundColor: "#f0f0f0",
      animation: "shimmer 1.5s infinite linear",
      borderRadius: 10,
    }}
  />
);

export default function Reels({ data }) {
  const { i18n } = useTranslation();
  const VediosAr = [ved3Ar, ved2Ar, ved5Ar, ved1Ar, ved4Ar];
  const VediosEn = [ved3En, ved2En, ved5En, ved1En, ved4En];
  const VediosKr = [ved3Kr, ved2Kr, ved5Kr, ved1Kr, ved4Kr];
  const selectedVideos =
    i18n.language === "ar"
      ? VediosAr
      : i18n.language === "en"
      ? VediosEn
      : VediosKr;

  const [loadingStatus, setLoadingStatus] = useState(
    selectedVideos.map(() => true)
  );
  const videoRefs = useRef([]);

  const handleVideoLoad = (index) => {
    setLoadingStatus((status) => {
      const newStatus = [...status];
      newStatus[index] = false; // Video has loaded
      return newStatus;
    });
  };

  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;
            if (video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
              video.play(); // Optionally auto-play video
            }
            observer.current.unobserve(video); // Stop observing after loading
          }
        });
      },
      { threshold: 0.25 }
    );

    return () => {
      observer.current.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) observer.current.observe(video);
    });
  }, [selectedVideos]);

  return (
    <Swiper
      style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
      spaceBetween={5}
      slidesPerView={2}
      modules={[Autoplay]}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 5 },
        768: { slidesPerView: 3, spaceBetween: 5 },
        1024: { slidesPerView: 4, spaceBetween: 5 },
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {selectedVideos.map((videoSrc, idx) => (
        <SwiperSlide key={idx}>
          {loadingStatus[idx] && <Shimmer />}
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            style={{
              display: loadingStatus[idx] ? "none" : "block",
              width: "100%",
              height: "80vh",
              objectFit: "cover",
              borderRadius: 10,
            }}
            onLoadedData={() => {
              console.log(`Video ${idx} loaded`); // Debug log
              handleVideoLoad(idx);
            }}
            src={videoSrc}
            preload="metadata"
            muted
            loop
            autoPlay
          >
            <source type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
