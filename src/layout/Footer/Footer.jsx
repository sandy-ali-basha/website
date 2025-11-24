import {
  Grid,
  Typography,
  IconButton,
  Button,
  Container,
  Link,
  Box,
} from "@mui/material";
import React from "react";
import logo from "assets/images/logo_white.png";
import { Facebook, Instagram, LinkedIn, WhatsApp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { _terms } from "api/terms/terms";
import { useQuery } from "react-query";
import CardShimmer from "components/customs/loaders/CardShimmer";
import { useSocialMedia } from "hooks/home/useHome";

function Footer() {
  const { t } = useTranslation("index");
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

  const { data: socialData } = useSocialMedia();
  
  return (
    <footer style={{ background: "#6A83B0" }}>
      <Container sx={{ py: 4 }}>
        <Grid container>
          <Grid item xs="6">
            <Box sx={{ width: "10vw" }}>
              <img alt="logo" src={logo} style={{ width: "100%" }} />
            </Box>
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
            <Button
              sx={{ color: "white", borderColor: "white" }}
              variant="outlined"
              href={`mailto:${socialData?.links?.email}`}
            >
              {t("contact")}
            </Button>
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
            <IconButton
              href={socialData?.links?.facebook}
              aria-label="facebook"
            >
              <Facebook style={{ color: "white" }} />
            </IconButton>
            <IconButton
              href={socialData?.links?.instagram}
              aria-label="instagram"
            >
              <Instagram style={{ color: "white" }} />
            </IconButton>
            <IconButton
              href={socialData?.links?.linkedin}
              aria-label="linkedin"
            >
              <LinkedIn style={{ color: "white" }} />
            </IconButton>
            <IconButton
              href={`https://wa.me/${socialData?.links?.whatsApp}`}
              aria-label="whatsapp"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Enhances security when opening in a new tab
            >
              <WhatsApp style={{ color: "white" }} />
            </IconButton>
          </Grid>
          <Grid xs="12">
            <hr />
          </Grid>

          <Grid
            item
            xs="12"
            md="12"
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
                variant={"text"}
                key={index}
                href={`/terms/${item.id}`}
              >
                {item.name}
              </Button>
            ))}
          </Grid>
          <Grid
            item
            xs="12"
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
              {t("© 2024 Dawaa Alhayat. All rights reserved.")}
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
