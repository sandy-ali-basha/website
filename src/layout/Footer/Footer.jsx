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
import { useTranslation } from "react-i18next";
import { _terms } from "api/terms/terms";
import { useQuery } from "react-query";
import CardShimmer from "components/customs/loaders/CardShimmer";

function Footer() {
  const MenuItems = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/contact-us", title: "Contact" },
    { href: "/careers", title: "Career" },
    { href: "/Blog", title: "Blog" },
  ];
  const { data: termsData, isLoading: isLoadingTerms } = useQuery(
    ["terms"],
    () => _terms.getTerms().then((res) => res?.data)
  );

  const { t } = useTranslation("index");

  return (
    <footer style={{ background: "#6A83B0" }}>
      <Container sx={{ py: 4 }}>
        <Grid container>
          <Grid item xs="6">
            <img alt="logo" src={logo} />
          </Grid>
          {/* <Grid
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
          </Grid> */}

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
            xs={12}
            md={6}
            item
            sx={{
              my: "2",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: "auto",
              display: "flex",
              flexWrap: "wrap",
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
            md={6}
            xs={12}
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
          <Grid item xs="12" md={4} sx={{ mt: 2 }}>
            <Typography
              sx={{ color: "white", fontWeight: "300" }}
              variant="body3"
            >
              {t("© 2024 Dawaa Alhayat. All rights reserved.")}
            </Typography>
          </Grid>
          <Grid
            item
            xs="12"
            md="8"
            sx={{
              display: "flex",
              justifyContent: { md: "flex-end", xs: "space-evenly" },
              mt: 2,
              flexWrap: "wrap",
            }}
          >
            {isLoadingTerms && (
              <CardShimmer style={{ width: "50px", height: "10px" }} />
            )}
            {termsData?.terms?.map((item, index) => (
              <Button
                sx={{ color: "#e9e9e9", fontWeight: "300" }}
                variant={"text"}
                key={index}
                href={`/terms/${item.id}`}
              >
                {item.name}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
