import React, { useState } from "react";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { useNavBar } from "./useNavBar";
import LanguageSelector from "components/LanguageSelector";
import MobileNavBar from "./MobileNavBar";
import LogoDesktop from "./components/LogoDesktop";
import LogoMobile from "./components/LogoMobile";
import DesktopNav from "./components/DesktopNav";
import CitySelector from "./components/CitySelector";
import CartButton from "./components/CartButton";
import AuthSection from "./components/AuthSection";

function NavBar() {
  const [brandsAnchorEl, setBrandsAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isBrandsDropDownOpen = Boolean(brandsAnchorEl);

  const {
    settings,
    navigate,
    pages,
    cities,
    selectedCityLabel,
    isCityResolving,
    brands,
    categories,
    t,
  } = useNavBar();

  const cartCount = parseInt(localStorage.getItem("cart_count")) || 0;

  const handleDrawerToggle = (nextOpen) => {
    setMobileOpen((prevOpen) =>
      typeof nextOpen === "boolean" ? nextOpen : !prevOpen
    );
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: "100%",
        boxShadow: "0px",
        background: "#6666663d",
        backdropFilter: "blur(5px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoDesktop />

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <MobileNavBar
              pages={pages}
              categories={categories}
              brands={brands}
              settings={settings}
              t={t}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          </Box>

          <LogoMobile />

          {/* Desktop Navigation */}
          <DesktopNav
            pages={pages}
            categories={categories}
            brands={brands}
            t={t}
            brandsAnchorEl={brandsAnchorEl}
            isBrandsDropDownOpen={isBrandsDropDownOpen}
            onOpenBrandsMenu={(e) => setBrandsAnchorEl(e.currentTarget)}
            onCloseBrandsMenu={() => setBrandsAnchorEl(null)}
          />

          <CitySelector
            selectedCityLabel={selectedCityLabel}
            isCityResolving={isCityResolving}
            cities={cities}
            t={t}
          />

          <LanguageSelector />

          <CartButton
            cartCount={cartCount}
            t={t}
            onClick={() => navigate("/store/checkout")}
          />

          <AuthSection settings={settings} t={t} navigate={navigate} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
