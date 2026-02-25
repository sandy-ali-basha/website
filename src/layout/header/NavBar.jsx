import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import logo from "assets/images/logo.png";
import {
  Flag,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useNavBar } from "./useNavBar";
import MenuButton from "components/modules/NavBar/MenuButton";
import LanguageSelector from "components/LanguageSelector";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CategoryDropdown from "components/CategoryDropdown";
import MobileNavBar from "./MobileNavBar";
import { _AuthApi } from "api/auth";

function NavBar() {
  const [brandsAnchorEl, setBrandsAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isBrandsDropDownOpen = Boolean(brandsAnchorEl);

  const { settings, navigate, pages, cities, brands, categories, t } =
    useNavBar();

  const cartCount = parseInt(localStorage.getItem("cart_count")) || 0;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", lg: "flex" },
            }}
          >
            <img
              loading="lazy"
              alt="logo"
              src={logo}
              style={{ width: "6vw" }}
            />
          </Typography>

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

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: "auto",
              display: { xs: "flex", lg: "none" },
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              loading="lazy"
              alt="logo"
              style={{ width: "10vw" }}
              src={logo}
            />
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.slice(0, 2).map((page) => (
              <Button
                key={page.id}
                onClick={page.onClick}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                {page.label}
              </Button>
            ))}

            {categories &&
              categories.map((e) => (
                <CategoryDropdown
                  key={e.id}
                  translations={e.translations}
                  items={e.values}
                  itemId={e.id}
                />
              ))}

            <div>
              <Button
                id="demo-positioned-button"
                aria-controls={
                  isBrandsDropDownOpen ? "demo-positioned-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={isBrandsDropDownOpen ? "true" : undefined}
                onClick={(e) => setBrandsAnchorEl(e.currentTarget)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {t("Brands")}
                {isBrandsDropDownOpen ? (
                  <KeyboardArrowUp fontSize="small" />
                ) : (
                  <KeyboardArrowDown fontSize="small" />
                )}
              </Button>

              <Menu
                id="demo-positioned-menu"
                anchorEl={brandsAnchorEl}
                open={isBrandsDropDownOpen}
                onClose={() => setBrandsAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {brands &&
                  brands?.map((e) => (
                    <MenuItem
                      key={e.id}
                      onClick={() => setBrandsAnchorEl(null)}
                    >
                      <Link
                        to={
                          e.havePage ? `/store/categories/brand/${e.id}` : "#"
                        }
                        style={{
                          display: "flex",
                          textDecoration: "none",
                          color: "#313131",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "40px",
                            height: "40px",
                            paddingRight: "10px",
                          }}
                        >
                          <img
                            loading="lazy"
                            src={e.images[0]}
                            alt={e.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        {t(e.name)}
                      </Link>
                    </MenuItem>
                  ))}
              </Menu>
            </div>

            {pages[2] && (
              <Button
                onClick={pages[2].onClick}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                {pages[2].label}
              </Button>
            )}
          </Box>

          <Box>
            <MenuButton
              tooltip={t("change city")}
              icon={<Flag sx={{ color: "white" }} />}
              menuItems={cities.map((item) => ({
                ...item,
                key: item.id,
              }))}
              defaultValue={localStorage.getItem("city")}
            />
          </Box>

          <LanguageSelector />

          <Box sx={{ mx: "10px" }}>
            <Tooltip title={t("Show Cart")}>
              <IconButton
                id="basic-button"
                onClick={() => navigate("/store/checkout")}
              >
                <Badge badgeContent={cartCount} color="primary" size="small">
                  <ShoppingCartOutlined sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            {_AuthApi.getToken() ? (
              <MenuButton
                icon={<PersonOutlineOutlined sx={{ color: "white" }} />}
                menuItems={settings.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
                sx={{ mx: "10px" }}
              />
            ) : (
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  my: 2,
                  color: "white",
                  fontSize: { xs: "10px", sm: "14px" },
                  display: { xs: "none", lg: "block" },
                }}
              >
                {t("sign in")}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;