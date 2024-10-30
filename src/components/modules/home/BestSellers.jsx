import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";
import { useTranslation } from "react-i18next";
import { useProducts } from "hooks/Product/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import Lazy module

export default function BestSellers() {
  const filterData = { filters: {} };
  const { data } = useProducts(filterData);
  const { t } = useTranslation("index");

  return (
    data && (
      <Container sx={{my:5}}>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          {t("Our Latest Products")}
        </Typography>
        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 30000,
            disableOnInteraction: false,
          }}
          lazy={true} // Enable lazy loading
          modules={[Autoplay]} 
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            820: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {data?.data?.products?.slice(-10).map((item, idx) => (
            <SwiperSlide key={idx} style={{ paddingBottom: "10px" }}>
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
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button sx={{ mx: "auto" }} href="/store">
            {t("View All")}
          </Button>
        </Box>
      </Container>
    )
  );
}
