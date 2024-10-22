import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";
import { useTranslation } from "react-i18next";
import { useAllProducts } from "hooks/Product/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";

export default function BestSellers() {
  const { data } = useAllProducts();
  const { t } = useTranslation("index");

  return (
    data && (
      <Container>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          {t("Our Latest Products")}
        </Typography>
        <Swiper
          spaceBetween={20} // Adjust space between slides
          slidesPerView={2} // Number of slides per view (responsive handling below)
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            // Responsive breakpoints for Swiper
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
          {data &&
            data?.data?.products?.slice(-10).map((item, idx) => (
              <SwiperSlide key={idx}>
                <ProductCard
                  productImage={item?.images[0]?.image_path}
                  productName={item?.name}
                  Price={item?.price}
                  link={`/store/product/${item?.id}`}
                  purchasable={item?.purchasable === "always"}
                  offer={item?.compare_price}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    )
  );
}
