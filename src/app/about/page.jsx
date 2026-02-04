import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import image from "assets/images/about.png";
import image2 from "assets/images/Our culture.png";
import vision from "assets/images/vision.png";
import misiion from "assets/images/misiion.png";
import logo from "assets/images/logo.png";
import partner3 from "assets/images/partner-3.avif";
import partner2 from "assets/images/partner-2.avif";
import partner1 from "assets/images/partner-1.avif";
import partner0 from "assets/images/partner-0.avif";
import bg from "assets/images/Asset2.svg";
import { useTranslation } from "react-i18next";
import video from "assets/videos/DawaaAlHayatValues.m4v";
import i18n from "i18n";
import { useAbout } from "hooks/about/useAbout";
import { useHome } from "hooks/home/useHome";
import Seo from "components/Seo";

export default function About() {
  const { t } = useTranslation("about");
  const { data, isLoading } = useAbout();
  
  const [showMore, setShowMore] = React.useState(false);

  const { data: homeData } = useHome();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // -------------------------
  // Normalize API data
  // -------------------------
  const sections = React.useMemo(() => {
    if (!Array.isArray(data)) return {};
    return data.reduce((acc, item) => {
      const key = item.section?.toLowerCase();
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [data]);

  const welcome = sections.welcome?.[0];
  const mission = sections.mission?.[0];
  const visionData = sections.vision?.[0];
  const culture = sections.culture?.[0];

  const text =
    homeData?.["home.page.textSectionOne"]?.value?.text?.[i18n.language] || "";

  const maxLength = 1200; // adjust the length as needed
  const isLongText = text.length > maxLength;
  const displayedText = showMore ? text : text.substring(0, maxLength);

  return (
    <>
      <Seo
        title="About Us"
        description="Learn more about Dawaa Alhayat, our mission, values, and partnerships in the healthcare industry."
        keywords="Dawaa Alhayat, about, mission, vision, values, healthcare"
      />
      <Box
        sx={{
          background: `url(${bg}) no-repeat`,
          backgroundPosition: "65vw 30%",
          backgroundSize: { md: "50%", xs: "110%" },
          mt: { md: "0px", sm: "5vh", xs: "6vh" },
        }}
      >
        <img src={image} alt="Hero" style={{ width: "100%" }} />

      <Container maxWidth="lg" sx={{ mb: 4 }}>
        {/* ================= Welcome ================= */}
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            mb: 15,
          }}
        >
          <Box>
            <img
              src={logo}
              alt="dawaa alhayat logo"
              style={{ width: "15vw", mb: "10vh" }}
            />
          </Box>

          <Typography variant="h4" sx={{ textAlign: "center", mt: 3 }}>
            {welcome?.title}
          </Typography>

          <Box sx={{ width: { md: "75vw", sm: "95vw" }, mx: "auto", my: 5 }}>
            <Typography
              variant="body1"
              sx={{ mt: 1, textAlign: "center" }}
              dangerouslySetInnerHTML={{
                __html: welcome?.description || "",
              }}
            />
          </Box>
        </Box>

        {/* ================= CEO Message ================= */}
        <Grid container sx={{ mb: 15 }} spacing="5">
          <Grid md="4">
            <Box sx={{ width: { xs: "70%", lg: "100%" }, mx: "auto" }}>
              <img
                loading="lazy"
                src={homeData?.["home.page.textSectionOne"]?.image}
                alt="CEO"
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>

          <Grid md="8" sx={{ px: 5 }}>
            <Typography
              dangerouslySetInnerHTML={{ __html: displayedText }}
            />
            {isLongText && (
              <Button onClick={() => setShowMore(!showMore)}>
                {showMore ? "View Less" : "View More"}
              </Button>
            )}
            
          </Grid>
        </Grid>

        {/* ================= Mission / Vision ================= */}
        <Grid container spacing={3}>
          <Grid md="12" item>
            <Grid container spacing={2} sx={{ mb: 5 }}>
              <Grid md="6" item>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    gap: 2,
                    height: "100%",
                    border: "1px solid #E0E0E0",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <img
                    src={visionData?.image_url || misiion}
                    style={{
                      borderRadius: "12px",
                      objectFit: "contain",
                      width: "25%",
                      margin: "0 auto",
                    }}
                    alt=""
                  />
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {visionData?.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center" }}
                    dangerouslySetInnerHTML={{
                      __html: visionData?.description || "",
                    }}
                  />
                </Box>
              </Grid>

              <Grid md="6" item>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    height: "100%",
                    justifyContent: "space-evenly",
                    border: "1px solid #E0E0E0",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <img
                    src={mission?.image_url || vision}
                    style={{
                      borderRadius: 4,
                      objectFit: "contain",
                      width: "25%",
                      margin: "0 auto",
                    }}
                    alt=""
                  />
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {mission?.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center" }}
                    dangerouslySetInnerHTML={{
                      __html: mission?.description || "",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* ================= Video ================= */}
          <Grid md="12">
            <video
              style={{
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                borderRadius: 10,
              }}
              autoPlay
              loop
              muted
            >
              <source src={video} type="video/mp4" />
            </video>
          </Grid>

          {/* ================= Culture ================= */}
          <Grid md="6" item sx={{ my: 6 }}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              {culture?.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", mt: 2, width: "90%", mx: "auto" }}
              dangerouslySetInnerHTML={{
                __html: culture?.description || "",
              }}
            />
          </Grid>

          <Grid item md="6">
            <img
              src={culture?.image_url || image2}
              style={{
                borderRadius: 5,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt=""
            />
          </Grid>

          {/* ================= Partners ================= */}
          <Grid item md="12">
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {t("Our Partners")}
            </Typography>

            <Typography
              variant="body1"
              sx={{ textAlign: "center", mt: 5 }}
            >
              {t(
                "We understand the importance of forging key collaborations with vendors and partners alike as we aim to ensure providing our clients with the best value propositions possible.",
              )}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                my: 2,
              }}
            >
              {[partner3, partner2, partner1, partner0].map((p, i) => (
                <Box key={i} sx={{ width: { xs: "20vw", md: "15vw", lg: "10vw" } }}>
                  <img src={p} style={{ width: "100%" }} alt="partner" />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      </Box>
    </>
  );
}
