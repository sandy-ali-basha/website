import React from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import { _AuthApi } from "api/auth";
function NavBar() {
  const { settings, pages, navigate, cities, t } = useNavBar();

  // Get the cart count from local storage
  const cartCount = parseInt(localStorage.getItem("cart_count")) || 0;

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: "100%",
        boxShadow: "0px ",
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
              display: { xs: "none", md: "flex" },
            }}
          >
            <img alt="logo" src={logo} style={{ width: "6vw" }} />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: { xs: "flex", md: "none" },
            }}
          >
            <MenuButton
              badgeNumber={0}
              icon={<MenuIcon sx={{ color: "white" }} />}
              menuItems={pages.map((item) => ({
                ...item,
                key: item.id,
              }))}
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img alt="logo" style={{ width: "10vw" }} src={logo} />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages?.map((page) => (
              <Button
                key={page.id}
                onClick={page.onClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box>
            <MenuButton
              tooltip={t("change city")}
              icon={<Flag sx={{ color: "white" }} />}
              menuItems={cities.map((item) => ({
                ...item,
                key: item.id,
              }))}
            />
          </Box>

          <LanguageSelector />

          <Box sx={{ mx: "10px" }}>
            <Tooltip title={t("Show Cart")}>
              <IconButton
                id="basic-button"
                onClick={() => navigate("/store/checkout")}
                badgeNumber={2}
              >
                <Badge badgeContent={cartCount} color="primary" size="small">
                  <ShoppingCartOutlined sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ mx: "10px" }}>
            {_AuthApi.getToken() ? (
              <MenuButton
                icon={<PersonOutlineOutlined sx={{ color: "white" }} />}
                menuItems={settings.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
              />
            ) : (
              <Button
                onClick={() => navigate("/login")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("sign in")}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      {/* <Box sx={{ background: "#ffffff9c" }}>
        <Categories />
      </Box> */}
    </AppBar>
  );
}

export default NavBar;
