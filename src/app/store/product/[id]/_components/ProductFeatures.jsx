import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Shimmer } from "react-shimmer";

export default function ProductFeatures({ features, loading }) {
  if (loading) return <Shimmer style={{ width: "100%", height: "200px" }} />;

  return (
    <Box sx={{ my: 5, px: 3 }}>
      <Swiper spaceBetween={10} slidesPerView={5}>
        {features?.data?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Box sx={{ width: "100%", borderRadius: 3 }}>
              <img
                src={item?.image_path}
                alt={`feature-${idx}`}
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
    </Box>
  );
}
