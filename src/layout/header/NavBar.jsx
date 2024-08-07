import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import logo from "assets/images/logo.svg";
import SearchInput from "components/modules/SearchInput";
import {
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useNavBar } from "./useNavBar";
import MenuButton from "components/modules/NavBar/MenuButton";
import LanguageSelector from "components/LanguageSelector";
import MenuIcon from "@mui/icons-material/Menu";
import { _AuthApi } from "api/auth";
function NavBar() {
  const { CartMenuItems, settings, pages,navigate ,t} = useNavBar();

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
          <Box sx={{ display: { xs: "none", md: "initial" } }}>
            <SearchInput />
          </Box>
          <LanguageSelector />
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
            {_AuthApi.getToken()?
            <MenuButton
              badgeNumber={4}
              icon={<PersonOutlineOutlined sx={{ color: "white" }} />}
              menuItems={settings.map((item) => ({
                ...item,
                key: item.id,
              }))}
            />: <Button
            onClick={()=> navigate("/login")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {t("sign in")}
          </Button>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
