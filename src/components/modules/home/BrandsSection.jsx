import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useBrand } from "hooks/brands/useBrand";
import { Link } from "react-router-dom";

const BrandsSection = () => {
  const { data: brands, isLoading } = useBrand();

  return (
    <Container sx={{ padding: "60px 0" }}>
      <Box
        sx={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          justifyContent: { xs: "center" },
        }}
      >
        {isLoading || !brands ? (
          <>
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
          </>
        ) : (
          <>
            {brands.brands.map((brand) => (
              <Link
                to={
                  brand.havePage ? `/store/categories/brand/${brand.id}` : "#"
                }
                style={{ textDecoration: "none" }}
                key={brand.id}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: { xs: '40vw', sm: 200 },
                    height: { xs: '40vw', sm: 200 },
                    border: "3px solid #cccccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
            ))}
          </>
        )}
      </Box>
    </Container>
  );
};

export default BrandsSection;
