import { Container, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import i18n from "i18n";

export default function BrandProducts({ data }) {
  const { t } = useTranslation("index");

  console.log("BrandProducts: ", data);

  return (
    data && (
      <Container>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          {t("Our best sellers")}
        </Typography>
        <Swiper
          style={{
            paddingTop: "2vh",
            paddingBottom: "2vh",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {data?.map((item, idx) => (
            <SwiperSlide key={idx}>
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    )
  );
}
