import React from "react";
import { Typography } from "@mui/material";
import logo from "assets/images/logo.png";

function LogoMobile() {
  return (
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
      <img loading="lazy" alt="logo" style={{ width: "10vw" }} src={logo} />
    </Typography>
  );
}

export default LogoMobile;
