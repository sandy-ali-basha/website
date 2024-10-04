import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";
import productImage from "assets/images/jar.png";
import { useTranslation } from "react-i18next";

export default function BestSellers(data) {
  const { t } = useTranslation("index");
  const lang = localStorage.getItem("i18nextLng") || "en"; // Fallback to "en" if no language is set
  console.log(data);
  return (
    data && (
      <Container>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          {t("Our best sellers")}
        </Typography>
        <Grid container spacing={{ xs: 1, md: 2, xl: 3 }}>
          {data &&
            data?.data?.map((item, idx) => (
              <Grid key={idx} item xs="6" md="3">
                <ProductCard
                  productImage={item?.image}
                  productName={item?.translations?.name[lang]}
                  Price={item?.price}
                  link={`store/product/${item?.id}`}
                  purchasable={item?.purchasable === "always"}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    )
  );
}
