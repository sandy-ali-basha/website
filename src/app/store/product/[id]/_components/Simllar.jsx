import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import productImage from "assets/images/jar.png";
import ProductCard from "components/modules/ProductCard";

export default function Simillar() {
  return (
    <Container>
      <Grid container spacing={1} >
        <Grid item sm="4" >
          <ProductCard
            productImage={productImage}
            productName={" lorem "}
            Price={"50"}
            link={`/store/product/0`}
          />
        </Grid>
        <Grid item sm="4" >
          <ProductCard
            productImage={productImage}
            productName={" lorem lorem"}
            Price={"50"}
            link={`/store/product/2`}
          />
        </Grid>
        <Grid item sm="4" >
          <ProductCard
            productImage={productImage}
            productName={" lorem lorem m"}
            Price={"60"}
            link={`/store/product/3`}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
