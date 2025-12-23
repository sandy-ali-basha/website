import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import defualt from "assets/images/defaultImg.jpg";
import "swiper/css/navigation";

export default function ProductImages({ data }) {
  const images = data?.data?.images;

  return (
    <Swiper navigation modules={[Navigation]} spaceBetween={10}>
      {images && images.length > 0 ? (
        images.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Box sx={{ width: "100%", height: "80vh", borderRadius: 3 }}>
              <img
                src={item?.image_path}
                alt={`Slide ${idx}`}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                }}
              />
            </Box>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <Box sx={{ width: "100%", height: "80vh", borderRadius: 3 }}>
            <img
              src={defualt}
              alt="default"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "inherit",
              }}
            />
          </Box>
        </SwiperSlide>
      )}
    </Swiper>
  );
}
