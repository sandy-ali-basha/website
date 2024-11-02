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
import BestSellers from "components/modules/home/BestSellers.jsx";
import { Link } from "react-router-dom";
import i18n from "i18n.js";
import Reels from "components/modules/home/Reels.jsx";

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
  const [showMore, setShowMore] = useState(false);

  // Get the text
  const text =
    data?.["home.page.textSectionOne"]?.value?.text?.[i18n.language] || "";

  // Define the max length before showing "View More"
  const maxLength = 1200; // adjust the length as needed

  // Function to toggle between showing more or less
  const handleToggle = () => {
    setShowMore(!showMore);
  };

  // Determine if the text is long enough to be truncated
  const isLongText = text.length > maxLength;
  const displayedText = showMore ? text : text.substring(0, maxLength);

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
                      src={item.image}
                      alt={`Slide ${index + 1}`}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }}
                      lazy
                    />
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        width: { md: "50%", xs: "100%" },
                      }}
                    >
                      {/* <Typography variant="h2" color="inherit">
                    {item?.title}
                  </Typography>
                  <Typography sx={{ mt: 2 }} variant="body1" color="inherit">
                    {item?.text}
                  </Typography> */}
                      {/* <Button
                    sx={{ mt: 4 }}
                    color="primary"
                    variant="contained"
                    href={item?.link}
                  >
                    {t("Get Started")}
                  </Button> */}
                    </Box>
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
            <Grid container sx={{ py: 5 }} spacing="5">
              <Grid md="4">
                <Box sx={{ width: { xs: "70%", lg: "100%" }, mx: "auto" }}>
                  <img
                    src={data?.["home.page.textSectionOne"]?.image}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Box>
              </Grid>
              <Grid md="8" sx={{ px: 5 }}>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: displayedText,
                  }}
                ></Typography>
                {isLongText && (
                  <Button onClick={handleToggle}>
                    {showMore ? "View Less" : "View More"}
                  </Button>
                )}
              </Grid>
            </Grid>
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
          <AnimatedText></AnimatedText>
          <Container>
            <Grid container sx={{ py: 2, mt: 5 }}>
              <Grid md="6">
                <Typography
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.["home.page.textSectionTwo"]?.value?.text?.[
                        i18n.language
                      ],
                  }}
                ></Typography>
              </Grid>
              <Grid md="6">
                <img
                  src={data?.["home.page.textSectionTwo"]?.image}
                  style={{ width: "100%" }}
                  alt=""
                />
              </Grid>
            </Grid>
          </Container>
          <BestSellers />
          <Qoute
            data={data?.["home.page.videoText"]}
            video={data?.["home.page.video"]?.video}
          />
          <Partners />
        </>
      )}
    </>
  );
}
