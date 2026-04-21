import React from "react";
import { Typography } from "@mui/material";
import logo from "assets/images/logo.png";

function LogoDesktop() {
  return (
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
      <img loading="lazy" alt="logo" src={logo} style={{ width: "5vw" }} />
    </Typography>
  );
}

export default LogoDesktop;
