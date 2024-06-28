import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logo from "assets/images/logo.svg";
import SearchInput from "components/modules/SearchInput";
import {
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useNavBar } from "./useNavBar";
import MenuButton from "components/modules/NavBar/MenuButton";
import CartItem from "components/modules/cart/CartItem";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "components/LanguageSelector";

function NavBar() {
  const {  handleCloseNavMenu, t } = useNavBar();
  const GoToCart = () => {
    return (
      <Button sx={{ width: "100%" }} variant="outlined" href="/store/checkout">
        {t("Show Cart")}
      </Button>
    );
  };

  const navigate = useNavigate();
  const CartMenuItems = [
    {
      id: 1,
      label: <CartItem />,
      onClick: () => navigate("/store/checkout"),
    },
    {
      id: 2,
      label: <CartItem />,
      onClick: () => navigate("/store/checkout"),
    },
    {
      id: 3,
      label: <CartItem />,
      onClick: () => navigate("/store/checkout"),
    },
    {
      id: 4,
      label: <GoToCart />,
      onClick: () => navigate("/store/checkout"),
    },
  ];

  const settings = [
    { id: 1, 
      label:
       t("Profile"), onClick: handleCloseNavMenu },
    {
      id: 2,
      
      label:
       t("My account"),
      onClick: () => navigate("/profile/account"),
    },
    {
      id: 3,
      
      label:
       t("Change Password"),
      onClick: () => navigate("/profile/security"),
    },
    { id: 4, 
      label:
       t("Billing"), onClick: () => navigate("/profile/billing") },
    {
      id: 5,
      
      label:
       t("My Orders"),
      onClick: () => navigate("/profile/orders"),
    },
    { id: 6, 
      label:
       t("Login"), onClick: () => navigate("/Login") },
  ];

  const pages = [
    { id: "0", onClick: () => navigate("/"), 
      label:
       t("Home") },
    {
      id: "1",
      onClick: () => navigate("/store/categories"),
      
      label:
       t("Products"),
    },
    { id: "2", onClick: () => navigate("/about"), 
      label:
       t("About Us") },
    { id: "3", onClick: () => navigate("/careers"), 
      label:
       t("Careers") },
    {
      id: "4",
      onClick: () => navigate("/store/offers"),
      
      label:
       t("Special Offers"),
    },
    { id: "5", onClick: () => navigate("/contact-us"), 
      label:
       t("Contact Us") },
  ];

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width:"100%",
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
            <img alt="logo" src={logo} />
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
            <img alt="logo" src={logo} />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={page.onClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "initial" } }}>
            <SearchInput />
          </Box>
          {/* //*cart */}
        <LanguageSelector/>
          <Box sx={{ mx: "10px" }}>
            <MenuButton
              badgeNumber={4}
              icon={<ShoppingCartOutlined sx={{ color: "white" }} />}
              menuItems={CartMenuItems.map((item) => ({
                ...item,
                key: item.id,
              }))}
            />
          </Box>
          <Box sx={{ mx: "10px" }}>
            <MenuButton
              badgeNumber={4}
              icon={<PersonOutlineOutlined sx={{ color: "white" }} />}
              menuItems={settings.map((item) => ({ ...item, key: item.id }))}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
