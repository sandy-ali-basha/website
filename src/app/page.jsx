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
// import SpinAndWin from "components/SpinAndWin.jsx";

export default function Home() {
  const [open, setOpen] = useState(
    localStorage.getItem("opendDialog") ? false : true
  );
  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("opendDialog", false);
  };

  const images = [
    {
      image: bg1,
      title: "Experience the Fine's Difference",
      discription:
        " Unparalleled Efficacy: Our supplements are meticulously formulated, ensuring that your body receives the full spectrum of benefits each ingredient has to offer.",
    },
    {
      image: bg2,
      title: "Experience the Fine's Difference",
      discription:
        " Unparalleled Efficacy: Our supplements are meticulously formulated, ensuring that your body receives the full spectrum of benefits each ingredient has to offer.",
    },
  ];
  const [direction, setDirection] = settingsStore((state) => [
    state.direction,
    state.setDirection,
  ]);
  const gummieBox = useRef(null);
  const navigate = useNavigate();
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
  return (
    <>
      {/* <SpinAndWin/> */}
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
                height: "90vh", // Adjust as needed
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
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
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: { md: "50%", xs: "100%" },
                }}
              >
                <Typography variant="h2" color="inherit">
                  {item.title}
                </Typography>
                <Typography sx={{ mt: 2 }} variant="body1" color="inherit">
                  {item.discription}
                </Typography>
                <Button
                  sx={{ mt: 4 }}
                  color="primary"
                  variant="contained"
                  onClick={() => navigate("/store/categories/brand/fines")}
                >
                  {t("Get Started")}
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Container>
        <Grid
          sx={{ mt: 3, position: "relative", justifyContent: "space-between" }}
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
            <Typography variant="body2" color="initial">
              {t("Unleash the Power of Nature's Finest:")}
            </Typography>
            <Typography
              variant="h3"
              color="initial"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              {t("Empowering Wellbeing. Together.")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  120
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("Employees")}{" "}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  100%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("Driven by Science")}{" "}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  2500
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("Clients")}
                </Typography>
              </Box>
              {/* <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  0.5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg. Rating
                </Typography>
              </Box> */}
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
              objectFit: "contain",
              zIndex: "-1",
            }}
            ref={gummieBox}
          />
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
              <Typography variant="h4" color="white">
                {t("Fine's: Your Gateway to a Healthier, Happier You")}
              </Typography>
              <Typography variant="body1" color="white" sx={{ mt: 2 }}>
                {t(
                  "Embrace a life brimming with vitality and wellness with Fine's the premier Canadian brand dedicated to crafting exceptional nutritional supplements that empower you to achieve your optimal health goals."
                )}
              </Typography>
            </Box>
          </Grid>
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
              {t("Unleash the Power of Nature's Finest:")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t(
                "At Fine's, we meticulously select the purest, most potent ingredients from nature's vast bounty to formulate supplements that are not only science-backed but also gentle on your body. Our unwavering commitment to quality ensures that every product you receive is a testament to our dedication to your well-being."
              )}
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
              onClick={() => navigate("/store/categories")}
            >
              {"Shop Now"}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <AnimatedText></AnimatedText>
      <BestSellers />
      <Qoute />
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
          <DialogContentText textAlign={"center"} sx={{ fontSize: "1.5rem" }}>
            You can now shop Canadian Fine products through the website of the
            Life Medicine Company, the exclusive agent of the Canadian company
            Fine in Iraq
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
            buy now
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
