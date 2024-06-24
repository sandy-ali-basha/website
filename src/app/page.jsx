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
import AnimatedText from "../components/modules/home/AnimatedText.jsx";
import BestSellers from "../components/modules/home/BestSellers.jsx";
import Qoute from "../components/modules/home/Qoute.jsx";
import Partners from "../components/modules/home/Partners.jsx";
import { Autoplay } from "swiper/modules";
import gsap from "gsap";

export default function Home() {
  const images = [bg1, bg2, bg3];
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
      rotate: -40,
      duration: 1,
      x: -100,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <>
        
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
                src={item}
                alt={`Slide ${index + 1}`}
                style={{
                  objectFit: "cover",
                  width: "inherit",
                  height: "inherit",
                  position:'absolute',
               
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1, // Ensure content is above the image
                  width: "50%",
                }}
              >
                <Typography variant="h2" color="inherit">
                  All-in-one supplement for your strength
                </Typography>
                <Typography sx={{ mt: 2 }} variant="body1" color="inherit">
                  Natural supplement filled with 33 ingredients, all working
                  together to support your strength and healbth
                </Typography>
                <Button sx={{ mt: 4 }} color="primary" variant="contained">
                  Get Started
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
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body2" color="initial">
              kfi At vero eos et accusamus et iusto{" "}
            </Typography>
            <Typography
              variant="h3"
              color="initial"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Join our mission
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
                  544,5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Projects Created
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  544%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Increase in Users
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  15K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Installs
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  0.5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg. Rating
                </Typography>
              </Box>
            </Box>
          </Grid>
          <img
            src={gummie}
            alt="gummie"
            objectFit="contain"
            quality={100}
            style={{
              position: "absolute",
              left: "38%",
              top: "20%",
              objectFit: "contain",
              height: "50vh",
              width: "50vw",
              objectFit: "contain",
              zIndex: "-1",
            }}
            ref={gummieBox}
          />
          <Grid item xs={5} sx={{ height: "60vh" }}>
            <Box
              sx={{
                background: "#6A83B0",
                borderRadius: 2,
                p: 2,
                boxShadow: 3,
                height: "100%",
              }}
            >
              <Typography variant="h3" color="white">
                Ready to get started?
              </Typography>
              <Typography variant="body1" color="white" sx={{ mt: 2 }}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestiasv
              </Typography>
              <Typography variant="body1" color="white" sx={{ mt: 2 }}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestiasv
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
              variant="h3"
              color="initial"
              sx={{ fontWeight: "bold" }}
            >
              Ready to get started?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium.
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
            <Button color="primary" variant="contained" sx={{ px: 3 }}>
              SIGN-UP
            </Button>
          </Grid>
        </Grid>
      </Container>
      <AnimatedText></AnimatedText>
      <BestSellers />
      <Qoute />
      <Partners />
    </>
  );
}
