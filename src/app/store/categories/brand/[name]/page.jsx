import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useParams } from "react-router-dom";
import { useBrandPage, useBrandSlider } from "hooks/brands/useBrand";
import AnimatedText from "components/modules/home/AnimatedText.jsx";
import BestSellers from "components/modules/home/BestSellers.jsx";
import Loader from "components/modules/Loader";

export default function Brand() {
  const { id } = useParams(); // Get the brand ID from the URL params
  const lang = localStorage.getItem("i18nextLng") || "en"; // Fallback to "en" if no language is set

  const { data, isLoading } = useBrandPage(id);

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <Box sx={{ mb: 4 }}>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data?.slides?.map((item, index) => (
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
              }}
            >
              <img
                src={item?.image_path}
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
                  {item?.translations?.find((t) => t.locale === lang)?.title}
                </Typography>
                <Typography sx={{ mt: 2 }} variant="body1" color="inherit">
                  {item?.translations?.find((t) => t.locale === lang)?.text}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Container>
        <Grid container sx={{ my: 6 }}>
          <Grid item md={6}>
            <Typography variant="h5">{data?.name}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: data?.text }}
            ></Typography>
          </Grid>
        </Grid>
        <AnimatedText />
        <BestSellers data={data?.products} />
      </Container>
    </Box>
  );
}
