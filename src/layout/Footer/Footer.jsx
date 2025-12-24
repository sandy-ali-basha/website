import {
  Grid,
  Typography,
  IconButton,
  Button,
  Container,
  Link,
  Box,
  Tooltip,
} from "@mui/material";
import React from "react";
import logo from "assets/images/logo_white.png";
import { useTranslation } from "react-i18next";
import { _terms } from "api/terms/terms";
import { useQuery } from "react-query";
import CardShimmer from "components/customs/loaders/CardShimmer";
import { useHomeSection } from "hooks/home/useHome";

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
    () => _terms.getTerms().then((res) => res?.data)
  );

  const { data: socialData } = useHomeSection(3);

  const getLangTitle = (item) => {
    const lang = i18n.language;
    return (
      item?.[`title_${lang}`] ||
      item?.title_en ||
      item?.title_ar ||
      item?.title_kr ||
      ""
    );
  };

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
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button
              sx={{ color: "white", borderColor: "white" }}
              variant="outlined"
              href={`mailto:${socialData?.items?.find(i => i.title_en === "phone")?.cta_link}`}
            >
              {t("contact")}
            </Button>
          </Grid>

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
            {socialData?.items?.map((item) => (
              <Tooltip key={item.id} title={getLangTitle(item)}>
                <IconButton
                  href={item.cta_link}
                  aria-label={getLangTitle(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.image}
                    alt={getLangTitle(item)}
                    style={{ width: 24, height: 24, filter: "brightness(0) invert(1)" }}
                  />
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
