import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container, Divider } from "@mui/material";
import img from "assets/images/Special Offers.png";
import { useOffersPage } from "./_hooks/useOffersPage";
import SpecialOffersSection from "components/SpecialOffersSection";
import Seo from "components/Seo";

export default function Offers() {
  const { t } = useOffersPage();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container sx={{ pt: 15, minHeight: "100vh" }}>
      <Seo
        title="Special Offers"
        description="Discover discounted healthcare products and limited-time offers at Dawaa Alhayat."
        keywords="Dawaa Alhayat offers, discounts, medical products"
      />
      <img loading="lazy" src={img} style={{ width: "100%" }} alt="img" />
      <Typography
        variant="h3"
        color="initial"
        sx={{ my: 2, textAlign: "center" }}
      >
        {t("Special Offers")}
      </Typography>
      <Divider />
      <Box sx={{ mt: 5 }}>
        <SpecialOffersSection />
      </Box>
    </Container>
  );
}
