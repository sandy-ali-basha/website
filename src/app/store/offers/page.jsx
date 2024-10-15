import React from "react";
import Typography from "@mui/material/Typography";
import { Container, Divider, Box, Grid } from "@mui/material";
import img from "assets/images/Special Offers.png";
import ProductCard from "components/modules/ProductCard";
import { useOffersPage } from "./_hooks/useOffersPage";

export default function Offers() {
  const { data, isLoading, isMobile, t } = useOffersPage();

  return (
    <Container sx={{ pt: 15 }}>
      <img src={img} style={{ width: "100%" }} alt="img" />
      <Typography
        variant="h3"
        color="initial"
        sx={{ my: 2, textAlign: "center" }}
      >
        {t("Special Offers")}
      </Typography>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          my: 5,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Grid container spacing={2}>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard loading={true} />
              </Grid>
            ))}

          {data &&
            data?.data?.products?.map((item, idx) => (
              <Grid item md={3} sm={6} xs={12} key={idx}>
                <ProductCard
                  id={item?.id}
                  productName={item.name}
                  Price={item?.price}
                  productImage={item?.images[0]?.image_path}
                  link={`/store/product/${item.id}`}
                  loading={false}
                  purchasable={item?.purchasable === "always"}
                  offer={item?.compare_price}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}
