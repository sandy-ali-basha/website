import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Container,
} from "@mui/material";
import React from "react";
import logo from "assets/images/logo_white.png";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

function Footer() {
  const MenuItems = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/contact-us", title: "Contact" },
    { href: "/careers", title: "Career" },
    { href: "", title: "Faqs" },
    { href: "", title: "SignUp" },
    { href: "/Blog", title: "Blog" },
  ];
  const ButtomMenuItems = [
    { title: "Terms & Conditions", href: "/Terms" },
    { title: "privecy Policy", href: "/policy/privecy" },
    { title: "Return policy", href: "/policy/return" },
    { title: "payment methods", href: "/PaymentMethods" },
    { title: "Delivery policy", href: "/policy/delivery" },
  ];
  return (
    <footer style={{ background: "#6A83B0" }}>
      <Container sx={{ py: 4 }}>
        <Grid container>
          <Grid item xs="6">
            <img alt="logo" src={logo} />
          </Grid>
          <Grid
            item
            xs="6"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <TextField
              size="small"
              id="mail"
              label="Outlined"
              variant="outlined"
            />
            <Button
              color="primary"
              variant="outlined"
              sx={{ background: "white" }}
            >
              Sign Up
            </Button>
          </Grid>

          <Grid xs={12} item>
            <Typography color={"white"} variant={"body1"}>
              Our Mission
            </Typography>
            <Typography variant="body3" sx={{ mt: 2, color: "#e9e9e9" }}>
              Lorem ipsum footer text not to be read but for placement only. FPO
              text.
            </Typography>
          </Grid>
          <Grid
            xs={6}
            item
            sx={{
              my: "2",
              alignItems: "center",
              height: "auto",
              display: "flex",
            }}
          >
            {MenuItems.map((item, index) => (
              <Button
                sx={{ color: "white" }}
                href={item.href}
                variant={"text"}
                key={index}
              >
                {item.title}
              </Button>
            ))}
          </Grid>
          <Grid
            xs={6}
            sx={{ display: "flex", justifyContent: "end", my: 2, gap: 1 }}
            item
          >
            <IconButton aria-label="facebook">
              <Facebook style={{ color: "white" }} size="large" />
            </IconButton>
            <IconButton aria-label="facebook">
              <Instagram style={{ color: "white" }} size="large" />
            </IconButton>
            <IconButton aria-label="facebook">
              <Twitter style={{ color: "white" }} size="large" />
            </IconButton>
            <IconButton aria-label="facebook">
              <LinkedIn style={{ color: "white" }} size="large" />
            </IconButton>
          </Grid>
          <Grid xs="12">
            <hr />
          </Grid>
          <Grid item xs="4" sx={{ mt: 2 }}>
            <Typography
              sx={{ color: "white", fontWeight: "300" }}
              variant="body3"
            >
              © 2024 Dawaa Alhayat. All rights reserved.
            </Typography>
          </Grid>
          <Grid
            item
            xs="8"
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            {ButtomMenuItems.map((item, index) => (
              <Button
                sx={{ color: "#e9e9e9", fontWeight: "300" }}
                variant={"text"}
                key={index}
                href={item.href}
              >
                {item.title}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
