import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useBrand } from "hooks/brands/useBrand";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BrandsSection = () => {
  const { data: brands, isLoading } = useBrand();

  return (
    <Container sx={{ padding: "60px 0" }}>
      {isLoading || !brands ? (
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              sx={{
                width: { xs: 100, sm: 150 },
                height: { xs: 100, sm: 150 },
              }}
              variant="circular"
            />
          ))}
        </Box>
      ) : (
        <Swiper
          spaceBetween={25}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay
        >
          {brands.brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <Link
                to={
                  brand.havePage ? `/store/categories/brand/${brand.id}` : "#"
                }
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    width: { xs: "50vw", md: "40vw", sm: 200, lg: "10vw" },
                    height: { xs: "50vw", md: "40vw", sm: 200, lg: "10vw" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                    transition: "0.3s ease-in-out",
                    bgColor: (theme) => theme.palette.background.paper,
                    "&:hover": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "& img": {
                      transition: "0.7s ease-in-out",
                    },
                    "&:hover img": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <img
                    loading="lazy"
                    src={brand.images[0]}
                    alt={brand.name}
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <Typography
                  variant="h3"
                  textAlign="center"
                  color="#444444"
                  fontWeight={600}
                  marginTop="20px"
                  sx={{
                    fontSize: { xs: 9, sm: 12 },
                  }}
                >
                  {brand.name.split(" ").length > 2
                    ? brand.name.split(" ").slice(0, 2).join(" ").toUpperCase()
                    : brand.name.toUpperCase()}
                </Typography>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default BrandsSection;
