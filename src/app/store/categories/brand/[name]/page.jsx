"use client";

import React, { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import bg1 from "assets/images/hero-image (1).jpg";
import bg2 from "assets/images/hero-image (2).jpg";
import bg3 from "assets/images/hero-image (3).jpg";
import gummie from "assets/images/gummies.png";
import AnimatedText from "components/modules/home/AnimatedText.jsx";
import BestSellers from "components/modules/home/BestSellers.jsx";
import Qoute from "components/modules/home/Qoute.jsx";
import Partners from "components/modules/home/Partners.jsx";
import { Autoplay } from "swiper/modules";
import gsap from "gsap";

export default function Brand() {
  const images = [bg1, bg2, bg3];

  return (
    <Box sx={{mb:4}}>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100vw",
                height: "80vh", // Adjust as needed
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
              }}
            >
              <img
                src={item}
                alt={`Slide ${index + 1}`}
                objectFit="cover"
                quality={100}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1, // Ensure content is above the image
                  width: "50%",
                }}
              >
                <Typography variant="h2" color="inherit">
             FINE'S
                </Typography>
                <Typography sx={{ mt: 2 }} variant="body1" color="inherit">
                  Natural supplement filled with 33 ingredients, all working
                  together to support your strength and healbth
                </Typography>
               
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Container>

      <Grid container sx={{my:6}}>
        <Grid item md="6" >
          <Typography variant="h5" color="initial">
            Our expertise is derived from a variety of fields from nutrient
            research.
          </Typography>
        </Grid>
        <Grid item md="6">
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, alias!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, alias!
          </Typography>
        </Grid>
      </Grid>
      <AnimatedText></AnimatedText>

      <BestSellers />
      </Container>
    </Box>
  );
}
