import {  Container, Grid, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";
import productImage from "assets/images/jar.png";

export default function BestSellers() {
  return (
    <Container>
      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
        Our best sellers
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm="6" md="3" sx={{ height: "60vh" }}>
          <ProductCard
            productImage={productImage}
            productName={" lorem lorem lorem lorem lorem lorem lorem"}
            Price={"50"}
            link={`store/product/0`}
          />
        </Grid>
        <Grid item sm="6" md="3" sx={{ height: "60vh" }}>
          <ProductCard
            productImage={productImage}
            productName={" lorem lorem lorem lorem lorem lorem lorem"}
            Price={"50"}
            link={`store/product/1`}
          />
        </Grid>
        <Grid item sm="6" md="3" sx={{ height: "60vh" }}>
          <ProductCard
            productImage={productImage}
            productName={" lorem lorem lorem lorem lorem lorem lorem"}
            Price={"50"}
            link={`store/product/2`}
          />
        </Grid>
        <Grid item sm="6" md="3" sx={{ height: "60vh" }}>
          <ProductCard
            productImage={productImage}
            productName={" lorem lorem lorem lorem lorem lorem lorem"}
            Price={"50"}
            link={`store/product/3`}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
