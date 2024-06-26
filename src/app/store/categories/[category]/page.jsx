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
  Drawer,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CAccordion from "components/modules/Accordion";
import ProductCard from "components/modules/ProductCard";
import { useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Category() {
  const { data, isMobile } = useCategory();
  const [value, setValue] = useState([20, 37]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState("");

  function valuetext(value) {
    return `${value}$`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const params = useParams();

  const drawer = (
    <Box
      sx={{
        borderColor: "divider",
        width: 250,
        px: 2,
      }}
    >
      <Typography variant="subtitle1" color="text.secondary">
        Search:
      </Typography>
      <TextField size="small" sx={{ width: "100%" }} placeholder="search" />
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
  );
  const SortFilter = () => {
    return (
      <FormControl
        variant="outlined"
        size="small"
        sx={{ minWidth: 120, ml: { xs: 2, md: 0 } }}
      >
        <InputLabel>Sort By</InputLabel>
        <Select value={sort} onChange={handleSortChange} label="Sort By">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"priceAsc"}>Price: Low to High</MenuItem>
          <MenuItem value={"priceDesc"}>Price: High to Low</MenuItem>
          <MenuItem value={"nameAsc"}>Name: A-Z</MenuItem>
          <MenuItem value={"nameDesc"}>Name: Z-A</MenuItem>
        </Select>
      </FormControl>
    );
  };
  return (
    <Container sx={{ pt: 15 }}>
      <Typography
        variant="h3"
        color="initial"
        sx={{ mb: 2, overflowWrap: "break-word" }}
      >
        {params.category}
      </Typography>
      <Divider />
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          justifyContent: "flex-end",
          width: "100%",
          mt: 1,
        }}
      >
        <SortFilter />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 5,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            width: "100%",
            justifyContent: { xs: "space-between", md: "flex-start" },
            mb: { xs: 2, md: 0 },
            display: { md: "none", xs: "flex" },
          }}
        >
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          <SortFilter />
        </Box>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: { md: "30%" },
            mx: 1,
          }}
        >
          {drawer}
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: "100%", md: `calc(100% - 30%)` },
          }}
        >
          <Grid container spacing={2}>
            {data?.Products?.items.map((item, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
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
      </Box>
    </Container>
  );
}
