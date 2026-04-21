import React, { useState } from "react";
import { AppBar, Box, Container, Toolbar, Typography, Link } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
    navOffer,
  } = useNavBar();

  const cartCount = parseInt(localStorage.getItem("cart_count")) || 0;
  const showOffer = Boolean(navOffer?.items?.length);

  const handleDrawerToggle = (nextOpen) => {
    setMobileOpen((prevOpen) =>
      typeof nextOpen === "boolean" ? nextOpen : !prevOpen
    );
  };

  return (
    <AppBar
      position="relative"
      color="transparent"
      sx={{
        width: "100%",
        background: ["#6666667a", "#66666669"],
        backdropFilter: "blur(5px)",
      }}
    >
      {showOffer && (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            px: 2,
            py: 1,
          }}
        >
          <Swiper
            modules={[Autoplay]}
            loop={navOffer.items.length > 1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            slidesPerView={1}
            style={{ width: "100%" }}
          >
            {navOffer.items.map((item, index) => (
              <SwiperSlide key={index}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    flexWrap: "wrap",
                    m: 0,
                  }}
                >
                  {item.title && (
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Box>
                  )}
                  {item.text && (
                    <Box component="span" sx={{ opacity: 0.9 }}>
                      {item.text}
                    </Box>
                  )}
                  {item.link && (
                    <Link
                      href={item.link}
                      underline="always"
                      sx={{ color: "inherit", fontWeight: 700 }}
                    >
                      {t("Shop now", { defaultValue: "Shop now" })}
                    </Link>
                  )}
                </Typography>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
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
           <LogoMobile />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

