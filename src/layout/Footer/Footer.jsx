import {
  Grid,
  Typography,
  IconButton,
  Button,
  Container,
  Link,
  Box,
  Tooltip,
  Toolbar,
} from "@mui/material";
import React from "react";
import logo from "assets/images/logo_white.png";
import { useTranslation } from "react-i18next";
import { _terms } from "api/terms/terms";
import { useQuery } from "react-query";
import CardShimmer from "components/customs/loaders/CardShimmer";
import { useHomeSection } from "hooks/home/useHome";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  WhatsApp,
} from "@mui/icons-material";
import { useContactUs } from "hooks/contactUs/useContactUs";

function Footer() {
  const { t, i18n } = useTranslation("index");

  const MenuItems = [
    { href: "/", title: t("Home") },
    { href: "/about", title: t("About") },
    { href: "/contact-us", title: t("Contact") },
    { href: "/careers", title: t("Career") },
    { href: "/Blog", title: t("Blog") },
  ];

  const { data: termsData, isLoading: isLoadingTerms } = useQuery(
    ["terms"],
    () => _terms.getTerms().then((res) => res?.data),
  );
  const { data, isLoading } = useContactUs();

  const socialData = [
    { title: "facebook", icon: <Facebook sx={{ color: "white" }} />, link: data?.data[0]?.facebook },
    { title: "instagram", icon: <Instagram sx={{ color: "white" }} />, link: data?.data[0]?.instagram },
    { title: "linkedin", icon: <LinkedIn sx={{ color: "white" }} />, link: data?.data[0]?.linkedin },
    { title: "whatsapp", icon: <WhatsApp sx={{ color: "white" }} />, link: `https://wa.me${data?.data[0]?.whatsapp}` },
    { title: "email", icon: <Mail sx={{ color: "white" }} />, link: data?.data[0]?.email },
  ];

  return (
    <footer style={{ background: "#6A83B0" }}>
      <Container sx={{ py: 4 }}>
        <Grid container>
          {/* Logo */}
          <Grid item xs={6}>
            <Box sx={{ width: "10vw" }}>
              <img alt="logo" src={logo} style={{ width: "100%" }} />
            </Box>
          </Grid>

          {/* Contact Button */}
         
      {/* Menu Items */}
          <Grid
            xs={12}
            md={6}
            item
            sx={{
              my: 2,
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
                variant="text"
                key={index}
              >
                {item.title}
              </Button>
            ))}
          </Grid>
          {/* Social Icons */}
          <Grid
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              my: 2,
              gap: 1,
              flexWrap: "wrap",
            }}
            item
          >
            {socialData?.map((item) => (
              <Tooltip key={item.id} title={item?.title}>
                <IconButton
                  href={item.link}
                  aria-label={item?.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Grid>

          {/* Line */}
          <Grid xs={12}>
            <hr />
          </Grid>

          {/* Terms Links */}
          <Grid
            item
            xs={12}
            md={12}
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
                size="small"
                sx={{
                  color: "#e9e9e9",
                  fontWeight: "300",
                  width: { xs: "100%", md: "auto" },
                }}
                variant="text"
                key={index}
                href={`/terms/${item.id}`}
              >
                {item.name}
              </Button>
            ))}
          </Grid>

          {/* Copyright */}
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography
              sx={{ color: "white", fontWeight: "300" }}
              variant="body3"
            >
              {t("© 2026 Dawaa Alhayat. All rights reserved.")}
            </Typography>

            <Typography
              sx={{ color: "white", fontWeight: "300" }}
              variant="body3"
            >
              {t("Developed By")}{" "}
              <Link
                sx={{ color: "text.primary", fontWeight: "bold" }}
                href="https://xyz-dev.vercel.app/"
              >
                XYZ
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
