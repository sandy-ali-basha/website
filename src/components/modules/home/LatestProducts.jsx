import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "hooks/Product/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "../ProductCard";

export default function LatestProducts() {
  const filterData = { filters: {} };
  const { data } = useProducts(filterData);
  const { t, i18n } = useTranslation("index");

  return (
    data && (
      <Container sx={{ my: 5 }} maxWidth="xl">
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          {t("Our Latest Products")}
        </Typography>
        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 30000,
            disableOnInteraction: false,
          }}
          // Enable lazy loading
          modules={[Autoplay]}
          slidesPerView={1}
          breakpoints={{
            500: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            820: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          style={{
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
          grabCursor
        >
          {data?.data?.products?.slice(-10).map((item, idx) => (
            <SwiperSlide key={idx} style={{ paddingBottom: "10px" }}>
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button sx={{ mx: "auto" }} href="/store">
            {t("View All")}
          </Button>
        </Box>
      </Container>
    )
  );
}
