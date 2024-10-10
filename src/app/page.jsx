import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import fineLogo from "assets/images/fineLogo.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import bg1 from "assets/images/hero.png";
import bg2 from "assets/images/hero-image (2).jpg";
import gummie from "assets/images/gummies.png";
import AnimatedText from "../components/modules/home/AnimatedText.jsx";
import BestSellers from "../components/modules/home/BestSellers.jsx";
import Qoute from "../components/modules/home/Qoute.jsx";
import Partners from "../components/modules/home/Partners.jsx";
import { Autoplay } from "swiper/modules";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { settingsStore } from "store/settingsStore.js";
import { useHome, useHomeSlider } from "hooks/home/useHome.js";
import Loader from "components/modules/Loader.jsx";
// import SpinAndWin from "components/SpinAndWin.jsx";

export default function Home() {
  const [open, setOpen] = useState(
    localStorage.getItem("opendDialog") ? false : true
  );
  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("opendDialog", false);
  };

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

  const { t } = useTranslation("index");
  const lang = localStorage.getItem("i18nextLng");
  const { data, isLoading } = useHome();
  const { data: slider, isLoading: sliderLoading } = useHomeSlider();

  console.log(" das;jfpd's ", data?.["home.page.video"]?.video);

  return (
    <>
      {/* <SpinAndWin/> */}
      {isLoading && sliderLoading && (
        <Box sx={{ my: 5, height: "50vh" }}>
          <Loader />
        </Box>
      )}

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
              <Box
                sx={{
                  position: "relative",
                  width: "100vw",
                  height: "90vh",
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
                    width: "inherit",
                    height: "inherit",
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
                  <Typography variant="h2" color="inherit">
                    {item?.title}
                  </Typography>
                  <Typography sx={{ mt: 2 }} variant="body1" color="inherit">
                    {item?.text}
                  </Typography>
                  <Button
                    sx={{ mt: 4 }}
                    color="primary"
                    variant="contained"
                    href={item?.link}
                  >
                    {t("Get Started")}
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {data && (
        <>
          <Container>
            <Grid
              sx={{
                mt: 3,
                position: "relative",
                justifyContent: "space-between",
              }}
              container
              spacing={2}
            >
              <Grid
                p="2rem"
                item
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="body2"
                  color="initial"
                  dangerouslySetInnerHTML={{
                    __html: data?.["home.page.stats"]?.value?.[lang].title1,
                  }}
                ></Typography>
                <Typography
                  variant="h3"
                  color="initial"
                  sx={{ mb: 2, fontWeight: "bold" }}
                  dangerouslySetInnerHTML={{
                    __html: data?.["home.page.stats"]?.value?.[lang].subtitle1,
                  }}
                ></Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {data?.["home.page.stats"]?.value?.info?.map(
                    (item, index) => (
                      <Box key={index}>
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: "bold", color: "text.secondary" }}
                        >
                          {item?.number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item[lang]?.text}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
              <img
                src={gummie}
                alt="gummie"
                objectFit="contain"
                quality={100}
                style={{
                  position: "absolute",
                  left: direction === "ltr" ? "38%" : "5%",
                  top: "20%",
                  objectFit: "contain",
                  height: "50vh",
                  width: "50vw",

                  zIndex: "-1",
                }}
                ref={gummieBox}
              />
              {data?.["home.page.stats"] && (
                <Grid item md={5} xs={12} sx={{ height: "60vh" }}>
                  <Box
                    sx={{
                      background: "#6A83B0",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: 3,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="white"
                      dangerouslySetInnerHTML={{
                        __html: data?.["home.page.stats"]?.value?.[lang].title2,
                      }}
                    ></Typography>
                    <Typography
                      variant="body1"
                      color="white"
                      sx={{ mt: 2 }}
                      dangerouslySetInnerHTML={{
                        __html:
                          data?.["home.page.stats"]?.value?.[lang].subtitle2,
                      }}
                    ></Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
            <Grid
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
                <Typography
                  variant="h5"
                  color="initial"
                  sx={{ fontWeight: "bold" }}
                >
                  {data?.["home.page.cta"]?.value?.title?.[lang] ?? " "}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {data?.["home.page.cta"]?.value?.subtitle?.[lang] ?? " "}
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
                  href={data?.["home.page.cta"]?.value?.subtitle?.[lang]}
                >
                  {"Shop Now"}
                </Button>
              </Grid>
            </Grid>
            <Grid container sx={{ py: 2 }}>
              <Grid md="6">
                <Typography
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.["home.page.textSectionOne"]?.value?.text?.[lang],
                  }}
                ></Typography>
              </Grid>
              <Grid md="6">
                <img src={data?.["home.page.textSectionOne"]?.image} alt="" />
              </Grid>
            </Grid>
            <Grid container sx={{ py: 2 }}>
              <Grid md="6">
                <Typography
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.["home.page.textSectionTwo"]?.value?.text?.[lang],
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
          <AnimatedText></AnimatedText>
          {/* <BestSellers /> */}
          <Qoute
            data={data?.["home.page.videoText"]}
            video={data?.["home.page.video"]?.video}
          />
          <Partners />
          <Dialog open={open} onClose={handleClose} py="6">
            <DialogContent
              py="6"
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                style={{ width: "50%", margin: "1rem auto" }}
                src={fineLogo}
                alt=""
              />
              <DialogContentText
                textAlign={"center"}
                sx={{ fontSize: "1.5rem" }}
              >
                {t(
                  "You can now shop Canadian Fine products through the website of the Life Medicine Company, the exclusive agent of the Canadian company Fine in Iraq"
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button onClick={handleClose} sx={{ color: "#a7275d" }} mx="auto">
                {t("buy now")}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
