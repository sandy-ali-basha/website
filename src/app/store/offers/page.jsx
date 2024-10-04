"use client";
import React, { useState } from "react";
import { useOffers } from "./_hooks/useOffers";
import Typography from "@mui/material/Typography";
import {
  Container,
  Divider,
  Box,
  Grid
} from "@mui/material";
import CAccordion from "components/modules/Accordion";
import ProductCard from "components/modules/ProductCard";
import img from "assets/images/offers.avif";

export default function Offers() {
  const { data, isMobile } = useOffers();

  return (
    <Container sx={{ pt: 15 }}>
      <img src={img} style={{ width: "100%" }} />
      <Typography
        variant="h3"
        color="initial"
        sx={{ my: 2, textAlign: "center" }}
      >
        Special Offers
      </Typography>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          my: 5,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Grid container spacing={2}>
          {data?.Products?.items.map((item, idx) => (
            <Grid item md={3} sm={6} xs={12} key={idx}>
              <ProductCard
              
                productName={item.name}
                Price={item.price}
                productImage={item.img}
                offer={item.offer}
                link={`/store/product/${item.id}`}
                purchasable={item?.purchasable === "always"}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
