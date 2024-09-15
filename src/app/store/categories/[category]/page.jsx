import React, { useState } from "react";
import { useCategory } from "./_hooks/useCategory";
import Typography from "@mui/material/Typography";
import {
  Container,
  Divider,
  Box,
  Grid,
  Drawer,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProductCard from "components/modules/ProductCard";
import MenuIcon from "@mui/icons-material/Menu";
import SideDrawer from "./_components/Drawer";
import { CloseFullscreen, CloseRounded } from "@mui/icons-material";

export default function Category() {
  const {
    data,
    isLoading,
    value,
    sort,
    valuetext,
    handleChange,
    handleSortChange,
    handleDrawerToggle,
    params,
    t,
    mobileOpen,
    Attr,
    AttrLoading,
    handleCheked,
    attr,
  } = useCategory();
  const SortFilter = () => {
    return (
      <FormControl
        variant="outlined"
        size="small"
        sx={{ minWidth: 120, ml: { xs: 2, md: 0 } }}
      >
        <InputLabel>{t("Sort By")}</InputLabel>
        <Select value={sort} onChange={handleSortChange} label="Sort By">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"priceAsc"}>{t("Price: Low to High")}</MenuItem>
          <MenuItem value={"priceDesc"}>{t("Price: High to Low")}</MenuItem>
          <MenuItem value={"nameAsc"}>{t("Name: A-Z")}</MenuItem>
          <MenuItem value={"nameDesc"}>{t("Name: Z-A")}</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <Container sx={{ pt: 15 }}>
      <Typography
        variant="h3"
        color="initial"
        sx={{ mb: 1, overflowWrap: "break-word" }}
      >
        {t("Products")}
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
          alignItems: "flex-start",
          my: 5,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            alignItems: "flex-start",
            width: "100%",
            justifyContent: { xs: "space-between", md: "flex-start" },
            mb: { xs: 2, md: 0 },
            display: { md: "none", xs: "flex" },
          }}
        >
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <SortFilter data={Attr} />
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
            "& .MuiDrawer-paper": { boxSizing: "border-box" },
          }}
        >
          <SideDrawer
            data={Attr}
            value={value}
            handleChange={handleChange}
            valuetext={valuetext}
            handleCheked={handleCheked}
          />
        </Drawer>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            mx: 1,
          }}
        >
          <SideDrawer
            valuetext={valuetext}
            data={Attr}
            value={value}
            handleChange={handleChange}
            handleCheked={handleCheked}
          />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: "100%", md: `calc(100% - 30%)` },
          }}
        >
          {" "}
          {data?.data?.products?.length === 0 && (
            <Typography
              variant="body1"
              sx={{
                my: 10,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {t("No Product Found")} <CloseRounded />
            </Typography>
          )}
          <Grid container spacing={2}>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProductCard loading={true} />
                </Grid>
              ))}

            {data &&
              data?.data?.products?.map((item, idx) => {
                console.log(idx, item?.images[0]?.image_path);
                return (
                  <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard
                      id={item?.id}
                      productName={item.name}
                      Price={item?.price}
                      productImage={item?.images[0]?.image_path}
                      link={`/store/product/${item.id}`}
                      loading={false}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
