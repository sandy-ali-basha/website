import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Shimmer } from "react-shimmer";

export default function ProductSlider({ Slider, isLoading }) {
  if (isLoading) return <Shimmer style={{ width: "100%", height: "100%" }} />;

  return (
    <Swiper>
      {Slider?.data?.images?.map((item, idx) => (
        <SwiperSlide key={idx}>
          <Box sx={{ width: "100%", height: { md: "80vh" }, borderRadius: 3 }}>
            <img
              src={item?.image_path}
              alt={`Slide ${idx}`}
              style={{
                objectFit: "cover",
                borderRadius: "inherit",
                width: "100%",
              }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
