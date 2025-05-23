"use client";
import React from "react";
// import { Container, Grid, Box } from "@mui/material";
import {
  Box,
  Chip,
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import defualt from "assets/images/defaultImg.jpg";
import { useTheme } from "@emotion/react";
import Simillar from "./_components/Simllar";
import AccordionUsage from "./_components/AccordionUsage";

import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useProduct } from "./hooks/useProduct";
import CardShimmer from "components/customs/loaders/CardShimmer";
import { useNavigate } from "react-router-dom";
import { useAccourdion } from "./hooks/useAccourdion";
import { Shimmer } from "react-shimmer";
import { useSlider } from "./hooks/useSlider";
import { useAddToCart } from "hooks/cart/useAddToCart";
import { PaidRounded } from "@mui/icons-material";
import BestSellers from "components/modules/home/BestSellers";

function Product() {
  const theme = useTheme();

  const { t } = useTranslation("index");
  const { data, isLoading } = useProduct();
  const { data: Acc, isLoading: AccLoading } = useAccourdion();
  const { data: Slider, isLoading: SliderLoading } = useSlider();
  const { handleAddToCart, loadingCart } = useAddToCart();

  const navigate = useNavigate();
  return (
    <Container sx={{ mt: 15 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Swiper navigation={true} modules={[Navigation]} spaceBetween={10}>
            {data?.data?.images ? (
              data?.data?.images?.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <Box sx={{ width: "100%", height: "80vh", borderRadius: 3 }}>
                    <img
                      src={item?.image_path}
                      alt={`Slide`}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                      }}
                      quality={100}
                    />
                  </Box>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <Box sx={{ width: "100%", height: "100%", borderRadius: 3 }}>
                  <img
                    src={defualt}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                    }}
                    quality={100}
                    alt=""
                  />
                </Box>
              </SwiperSlide>
            )}
          </Swiper>
        </Grid>
        <Grid xs={12} md={6}>
          {isLoading ? (
            <CardShimmer />
          ) : (
            <Typography
              sx={{ px: 2 }}
              color="initial"
              variant="h5"
              fontWeight={"bold"}
            >
              {data?.data?.name}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              my: 1,
              px: 2,
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="text.primary">
              {t("Price")}:
            </Typography>
            {isLoading ? (
              <CardShimmer />
            ) : (
              data?.data?.compare_price > 0 && (
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    fontWeight: "bold",
                  }}
                  variant="h5"
                  color="text.secondary"
                >
                  {data?.data?.compare_price} {t("currency")}
                </Typography>
              )
            )}
            {isLoading ? (
              <CardShimmer />
            ) : (
              data?.data?.price && (
                <Typography
                  color="initial"
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  {data?.data?.price} {t("currency")}
                </Typography>
              )
            )}
            {data?.data?.compare_price > 0 && (
              <Chip
                color="success"
                size="small"
                sx={{ px: "1" }}
                label={` - ${data?.data?.compare_price - data?.data?.price}`}
              />
            )}{" "}
          </Box>
          <hr />
          <Box sx={{ display: "flex", my: 1, px: 2, flexWrap: "wrap" }}>
            <Box>
              {isLoading ? (
                <CardShimmer />
              ) : (
                data?.data?.brand && (
                  <Chip
                    onClick={() =>
                      navigate(
                        `/store/categories/brand/${data?.data?.brand?.id}`
                      )
                    }
                    label={data?.data?.brand?.name}
                    sx={{
                      m: "5px",
                      bgColor: `primary.lighter`,
                    }}
                  />
                )
              )}

              {isLoading ? (
                <CardShimmer
                  style={{
                    width: "100px",
                    height: "15px",
                    borderRadius: "50px",
                  }}
                />
              ) : (
                data?.data?.product_type && (
                  <Chip
                    label={data?.data?.product_type?.name}
                    sx={{
                      m: "5px",
                    }}
                    variant="outlined"
                  />
                )
              )}

              {isLoading ? (
                <CardShimmer
                  style={{
                    width: "100px",
                    height: "15px",
                    borderRadius: "50px",
                  }}
                />
              ) : (
                data?.data?.attributes &&
                data?.data?.attributes?.map((item, idx) => (
                  <Chip
                    label={item.value}
                    sx={{
                      m: 1,
                    }}
                    color="primary"
                    variant="outlined"
                  />
                ))
              )}
            </Box>
            {data?.data?.points > 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "inline-flex", gap: 1, my: 2 }}
              >
                <PaidRounded color="warning" /> {t("you earn")}{" "}
                {data?.data?.points} {t("points by purchasing this product")}
              </Typography>
            )}
          </Box>

          <Box sx={{ mx: 2 }}>
            {isLoading ? (
              <CardShimmer style={{ width: "80%", height: "50px" }} />
            ) : (
              <>
                <Typography
                  sx={{ px: 2 }}
                  variant="initial"
                  fontWeight={"bold"}
                >
                  {t("Description")}
                </Typography>
                <Typography
                  variant="initial"
                  dangerouslySetInnerHTML={{ __html: data?.data?.description }}
                ></Typography>
              </>
            )}
          </Box>
          <Box sx={{ px: 2 }}>
            {data?.data?.properties && isLoading ? (
              <CardShimmer />
            ) : (
              data?.data?.properties?.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item?.title}
                  icon={item?.icon}
                  sx={{
                    m: 1,
                    color: `alpha(${theme.palette.common.white}, 0.15)`,
                  }}
                />
              ))
            )}
          </Box>
          {data?.data?.purchasable === "always" && (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                size="large"
                sx={{ width: "90%", p: 1, mt: 2, borderRadius: 3 }}
                variant="contained"
                color="secondary"
                onClick={() => handleAddToCart(data?.data?.id)}
                disabled={isLoading}
              >
                {loadingCart ? (
                  <CircularProgress
                    style={{ height: "auto", width: "1.5rem", color: "white" }}
                  />
                ) : (
                  <Typography> {t("Add To Cart")}</Typography>
                )}
              </Button>
            </Box>
          )}

          <Simillar id={data?.data?.id} />
        </Grid>
      </Grid>
      <Box sx={{ m: 3 }}>
        <AccordionUsage data={Acc} isLoading={AccLoading} />
      </Box>
      <Box sx={{ my: 5, px: 3 }}>
        {SliderLoading && <Shimmer style={{ width: "100%", height: "100%" }} />}
        <Swiper>
          {Slider &&
            Slider?.data?.images?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  sx={{
                    width: "100%",
                    height: { md: "80vh" },
                    borderRadius: 3,
                  }}
                >
                  <img
                    src={item?.image_path}
                    alt={`Slide `}
                    style={{
                      objectFit: "cover",
                      borderRadius: "inherit",
                      width: "100%",
                    }}
                    quality={100}
                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
      <BestSellers />
    </Container>
  );
}

export default Product;
