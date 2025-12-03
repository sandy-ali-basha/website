import React, { useEffect, useState } from "react";
import { useCategory } from "./_hooks/useCategory";
import Typography from "@mui/material/Typography";
import {
  Container,
  Box,
  Grid,
  Drawer,
  IconButton,
  Skeleton,
} from "@mui/material";
import ProductCard from "components/modules/ProductCard";
import MenuIcon from "@mui/icons-material/Menu";
import SideDrawer from "./_components/Drawer";
import { CloseRounded } from "@mui/icons-material";

export default function Category() {
  const {
    data,
    isLoading,
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

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Array.isArray(data?.data?.products)) {
      setSearchResults(data.data.products);
    }
  }, [data?.data?.products]);

  const productsToDisplay =
    searchTerm.trim() === "" ? data?.data?.products ?? [] : searchResults;

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
        </Box>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Drawer>

        <Box sx={{ display: { xs: "none", md: "block" }, mx: 1 }}>
          <SideDrawer
            valuetext={valuetext}
            data={Attr}
            minValue={minValue}
            maxValue={maxValue}
            handleMinChange={handleMinChange}
            handleMaxChange={handleMaxChange}
            handleCheked={handleCheked}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: "100%", md: `calc(100% - 30%)` },
          }}
        >
          {productsToDisplay.length === 0 && !isLoading && (
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

          <Grid container spacing={{ md: 2, xs: 1 }}>
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={6} md={4} lg={3} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={400} />
                </Grid>
              ))}

            {productsToDisplay.length > 0 &&
              productsToDisplay.map((item, idx) => (
                <Grid item key={idx} xs={6} md={4} lg={3}>
                  <ProductCard product={item} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
