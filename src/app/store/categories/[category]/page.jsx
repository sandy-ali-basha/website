"use client";
import React, { useState } from "react";
import { useCategory } from "./_hooks/useCategory";
import Typography from "@mui/material/Typography";
import {
  Container,
  Divider,
  Box,
  Grid,
  Slider,
  TextField,
} from "@mui/material";
import CAccordion from "components/modules/Accordion";
import ProductCard from "components/modules/ProductCard";
import { useParams } from "react-router-dom";

export default function Category({  }) {
  const { data, isMobile } = useCategory();
  const [value, setValue] = useState([20, 37]);

  function valuetext(value) {
    return `${value}$`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const params = useParams()

  return (
    <Container sx={{ pt: 15 }}>
      <Typography variant="h3" color="initial" sx={{ mb: 2 }}>
        {params.category}
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
        <Box
          sx={{
            borderColor: "divider",
            width: isMobile ? "100%" : "30%",
            mx: 1,
          }}
        >
          <Typography  variant="subtitle1" color="text.secondary">
            Search:
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            placeholder={"search"}
          />
          <Typography sx={{ mt: 2 }} variant="subtitle1" color="text.secondary">
            Options:
          </Typography>
          <CAccordion />
          <Typography sx={{ mt: 2 }} variant="subtitle1" color="text.secondary">
            Price
          </Typography>
          <Slider
            getAriaLabel={() => "Price"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>

        <Grid container spacing={2}>
          {data?.Products?.items.map((item, idx) => (
            <Grid item md={3} sm={6} xs={12} key={idx}>
              <ProductCard
                productName={item.name}
                Price={item.price}
                productImage={item.img}
                link={`/store/product/${item.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
