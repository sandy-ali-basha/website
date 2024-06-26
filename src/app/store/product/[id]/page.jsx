"use client";
import React from "react";
// import { Container, Grid, Box } from "@mui/material";
import { Box, Chip, Container, Grid, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "assets/images/categories/pic_1.png";
import img2 from "assets/images/categories/pic_1.png";
import img3 from "assets/images/categories/pic_1.png";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useTheme } from "@emotion/react";
import Simillar from "./_components/Simllar";
import AccordionUsage from "./_components/AccordionUsage";

import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";

function Product() {
  const theme = useTheme();
  const images = [img1, img2, img3];
  const params = useParams();
  const data = {
    product: {
      id: params.id,
      name: "product",
      price: "500",
      offer: "200",
      description:
        "<ul><li><em>California Gold Nutrition</em> CoQ10 with BioPerine®</li><li>Featuring Fermented, USP-Verified Coenzyme Q10 (CoQ10) or Ubiquinone*</li><li>Plus BioPerine® Black Pepper Extract</li><li>Supports Healthy Mitochondrial Function*</li><li>Supports a Healthy Cardiovascular System*</li><li>Suitable for Vegetarians and Vegans&nbsp;</li><li>Formulated without Gluten, GMOs, or Soy&nbsp;</li><li>Produced in a 3rd Party Audited cGMP Registered (Certified) Facility</li><li>100% Gold Guarantee</li></ul> ",
      properties: [
        { icon: <AddTaskRoundedIcon />, title: "add more save more" },
        { icon: <ShoppingCartRoundedIcon />, title: "fast shipping" },
        { icon: <AddTaskRoundedIcon />, title: "add more save more" },
        { icon: <AddTaskRoundedIcon />, title: "add more save more" },
      ],
      discriptionAccourdion: [
        {
          title: "Suggested use",
          description:
            "For best results, place 1/2 to 1 lozenge in mouth upon waking, allow to slowly dissolve, then swallow. May also be taken prior to, or during, exercise. Always use away from food by at least 1 hour. Use as directed by your healthcare professional. Do not use with 5 hours of bedtime.",
        },
        {
          title: "Suggested use",
          description:
            "For best results, place 1/2 to 1 lozenge in mouth upon waking, allow to slowly dissolve, then swallow. May also be taken prior to, or during, exercise. Always use away from food by at least 1 hour. Use as directed by your healthcare professional. Do not use with 5 hours of bedtime.",
        },
        {
          title: "Suggested use",
          description:
            "For best results, place 1/2 to 1 lozenge in mouth upon waking, allow to slowly dissolve, then swallow. May also be taken prior to, or during, exercise. Always use away from food by at least 1 hour. Use as directed by your healthcare professional. Do not use with 5 hours of bedtime.",
        },
        {
          title: "Suggested use",
          description:
            "For best results, place 1/2 to 1 lozenge in mouth upon waking, allow to slowly dissolve, then swallow. May also be taken prior to, or during, exercise. Always use away from food by at least 1 hour. Use as directed by your healthcare professional. Do not use with 5 hours of bedtime.",
        },
      ],
    },
  };
  return (
    <Container sx={{ mt: 15 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Swiper navigation={true} modules={[Navigation]} spaceBetween={10}>
            {images.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Box sx={{ width: "100%", height: "100%", borderRadius: 3 }}>
                  <img
                    src={item}
                    alt={`Slide`}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                    }}
                    quality={100}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid xs={12} md={6}>
          <Typography
            sx={{ px: 2 }}
            color="initial"
            variant="h3"
            fontWeight={"bold"}
          >
            {data?.product?.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 1, px: 2 }}>
            <Typography
              sx={{
                textDecoration: data?.product?.offer
                  ? "line-through"
                  : "initial",

                fontWeight: "bold",
              }}
              variant="h5"
              color={data?.product?.offer ? "text.secondary" : "initial"}
            >
              {data?.product?.price}
            </Typography>
            {data?.product?.offer && (
              <Typography
                color="initial"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                {data?.product?.offer}
              </Typography>
            )}
          </Box>
          <Typography sx={{ px: 2 }} variant="initial" fontWeight={"bold"}>
            Description
          </Typography>
          <Typography
            sx={{ px: 2 }}
            variant="initial"
            dangerouslySetInnerHTML={{ __html: data?.product?.description }}
          ></Typography>
          <Box sx={{ px: 2 }}>
            {data?.product?.properties.map((item, idx) => (
              <Chip
                key={idx}
                label={item?.title}
                icon={item?.icon}
                sx={{
                  m: 1,
                  color: `alpha(${theme.palette.common.white}, 0.15)`,
                }}
              />
            ))}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              size="large"
              sx={{ width: "90%", p: 1, mt: 2, borderRadius: 3 }}
              variant="contained"
              color="secondary"
            >
              Add To Cart
            </Button>
          </Box>
          <Typography sx={{ px: 2, mb: 2, mt: 5 }} variant="h4">
            You May Also Like
          </Typography>
          <Simillar />
        </Grid>
      </Grid>
      <Box sx={{ m: 3 }}>
        <AccordionUsage data={data?.product?.discriptionAccourdion} />
      </Box>
      <Box sx={{ my: 5, px: 3 }}>
        <Swiper>
          {images.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Box
                sx={{ width: "100%", height: { md: "80vh" }, borderRadius: 3 }}
              >
                <img
                  src={item}
                  alt={`Slide `}
                  style={{ objectFit: "cover", borderRadius: "inherit",width:"100%" }}
                  quality={100}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}

export default Product;
