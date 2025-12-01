import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Button, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimatedText from "../components/modules/home/AnimatedText.jsx";
import Qoute from "../components/modules/home/Qoute.jsx";
import Partners from "../components/modules/home/Partners.jsx";
import { Autoplay } from "swiper/modules";
import gsap from "gsap";
import { settingsStore } from "store/settingsStore.js";
import { useHome, useHomeSlider } from "hooks/home/useHome.js";
import Loader from "components/modules/Loader.jsx";
import HomeGrid from "components/modules/home/HomeGrid.jsx";
import BestSellers from "components/modules/home/BestSellers.jsx";
import { Link } from "react-router-dom";
import i18n from "i18n.js";
import Reels from "components/modules/home/Reels.jsx";
import ParallaxSlides from "components/modules/home/ParallaxSlides.jsx";

export default function Home() {
  const [direction] = settingsStore((state) => [state.direction]);
  const gummieBox = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gummieBox.current,
        start: "top center",
        end: "bottom center",
      },
    });

    tl.to(gummieBox.current, {
      rotate: direction === "ltr" ? -40 : 40,
      duration: 1,
      x: direction === "ltr" ? -100 : 100,
      ease: "power1.inOut",
    });
  }, [direction]);

  const { data, isLoading } = useHome();
  const { data: slider, isLoading: sliderLoading } = useHomeSlider();
 
  return (
    <>
      {/* <SpinAndWin/> */}
      {isLoading && sliderLoading && (
        <Box
          sx={{
            my: 5,
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      )}
      <Box sx={{ mt: { xs: "5vh", sm: "0px" } }}>
        {slider && (
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            lazy={true}
            modules={[Autoplay]}
          >
            {slider?.home_slides?.map((item, index) => (
              <SwiperSlide key={index}>
                <Link to={item?.link}>
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "16/9",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      textAlign: "center",
                      background: "#6A83B0",
                    }}
                  >
                    <img
                      src={item?.image}
                      alt={`Slide ${index + 1}`}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }}
                      lazy
                    />
                  </Box>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>

      {data && (
        <>
          <Container>
            {/* <Grid 
              container
              sx={{
                background: "#F4F4F4",
                my: 6,
                borderRadius: 2,
                px: 5,
                py: 4,
              }}
            >
              <Grid item sm="6">
                <Typography variant="h5" color="initial">
                  {data?.["home.page.cta"]?.value?.title?.[i18n.language] ?? " "}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {data?.["home.page.cta"]?.value?.subtitle?.[i18n.language] ?? " "}
                </Typography>
              </Grid>
              <Grid
                sm="6"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ px: 3 }}
                  href={data?.["home.page.cta"]?.value?.subtitle?.[i18n.language]}
                >
                  {"Shop Now"}
                </Button>
              </Grid>
            </Grid> */}
          </Container>
          <Reels />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <AnimatedText
              text={
                data?.["home.page.textSectionTwo"]?.value?.text?.[i18n.language]
              }
            />
          </Box>
          <BestSellers />
          <Qoute
            data={data?.["home.page.videoText"]}
            video={data?.["home.page.video"]?.video}
          />
          <Partners />
          <HomeGrid />
          <ParallaxSlides />
        </>
      )}
    </>
  );
}
