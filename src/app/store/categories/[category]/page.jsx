import React, { useState } from "react";
import { useCategory } from "./_hooks/useCategory";
import Typography from "@mui/material/Typography";
import { Container, Box, Grid, Drawer, IconButton } from "@mui/material";
import ProductCard from "components/modules/ProductCard";
import MenuIcon from "@mui/icons-material/Menu";
import SideDrawer from "./_components/Drawer";
import { CloseRounded } from "@mui/icons-material";

export default function Category() {
  const {
    data,
    isLoading,
    // sort,
    valuetext,
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    handleDrawerToggle,
    t,
    mobileOpen,
    Attr,
    handleCheked,
  } = useCategory();
  // const SortFilter = () => {
  //   return (
  //     <FormControl
  //       variant="outlined"
  //       size="small"
  //       sx={{ minWidth: 120, ml: { xs: 2, md: 0 } }}
  //     >
  //       <InputLabel>{t("Sort By")}</InputLabel>
  //       <Select value={sort} onChange={handleSortChange} label="Sort By">
  //         <MenuItem value="">
  //           <em>None</em>
  //         </MenuItem>
  //         <MenuItem value={"priceAsc"}>{t("Price: Low to High")}</MenuItem>
  //         <MenuItem value={"priceDesc"}>{t("Price: High to Low")}</MenuItem>
  //         <MenuItem value={"nameAsc"}>{t("Name: A-Z")}</MenuItem>
  //         <MenuItem value={"nameDesc"}>{t("Name: Z-A")}</MenuItem>
  //       </Select>
  //     </FormControl>
  //   );
  // };
  const [searchResults, setSearchResults] = useState([]);
  return (
    <Container sx={{ pt: 15 }}>
      <Typography
        variant="h3"
        color="initial"
        sx={{ mb: 1, overflowWrap: "break-word" }}
      >
        {t("Products")}
      </Typography>

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
          {/* <SortFilter data={Attr} /> */}
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
            minValue={minValue}
            maxValue={maxValue}
            handleMinChange={handleMinChange}
            handleMaxChange={handleMaxChange}
            valuetext={valuetext}
            handleCheked={handleCheked}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
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
            minValue={minValue}
            maxValue={maxValue}
            handleMinChange={handleMinChange}
            handleMaxChange={handleMaxChange}
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
          {searchResults?.data?.products?.length === 0 ||
          (data?.data?.products?.length === 0 &&
            !searchResults?.data?.products) ? (
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
          ) : null}
          <Grid container spacing={{ md: 2, xs: 1 }}>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <ProductCard loading={true} />
                </Grid>
              ))}

            {searchResults?.data?.products &&
              searchResults?.data?.products?.map((item, idx) => {
                return (
                  <Grid item key={idx} xs={6} sm={6} md={4} lg={3}>
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
                );
              })}
            {data?.data?.products &&
              !searchResults?.data?.products &&
              data?.data?.products?.map((item, idx) => {
                return (
                  <Grid item key={idx} xs={6} sm={6} md={4} lg={3}>
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
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
