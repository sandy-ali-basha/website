import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
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

export default function About() {
  const { t } = useTranslation("about");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
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
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
        <Box sx={{marginTop: { md: "-40vh", sm: "-10vh" },}}>
          <img
            src={logo}
            alt="dawaa alhayat logo"
            style={{
              width: "15vw",
              mb: "10vh",
            }}
          />
        </Box>
          <Typography variant="h4" sx={{ textAlign: "center", mt: 3 }}>
            {t("Welcome to Dawaa Al Hayat")}
          </Typography>
          <Box sx={{ width: { md: "75vw", sm: "95vw" }, mx: "auto", my: 5 }}>
            <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
              {t(
                "Dawaa Al Hayat was born in 2012 as an entrepreneurial project of its founders to invest their experience in the pharmaceutical distribution sector to reach a premium position in the Iraqi market."
              )}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
              {t(
                "With Three Main offices (Baghdad, Erbil, & Sulimanya), Dawaa Al Hayat maintains a strong presence in most Iraqi areas and nowadays, it is one of the fast-growing Iraqi pharma distributors."
              )}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
              {t(
                "The core business of the company is directed to the sales, promotion and distribution of high-quality (Pharmaceuticals, Dietary Supplements) that cover key therapeutic areas in the Iraqi market, both private and governmental sectors."
              )}
            </Typography>
          </Box>
        </Box>

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
                    src={misiion}
                    style={{
                      borderRadius: "12px",
                      objectFit: "contain",
                      width: "25%",
                      margin: "0 auto",
                    }}
                    alt=""
                  />
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {t("Vision")}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {t(
                      "“ Being a leader in the pharma business to make people’s life better by providing excellent & Innovative products”."
                    )}
                  </Typography>
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
                    src={vision}
                    style={{
                      borderRadius: 4,
                      objectFit: "contain",
                      width: "25%",
                      margin: "0 auto",
                    }}
                    alt=""
                  />
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {t("Mission")}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {t(
                      "“Matching the health community requirements, by applying the highest standards of selecting, importing, storing, & distributing the products, to ensure the health care providers and people”."
                    )}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
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
              <source src={video} type="video/mp4"></source>
              Your browser does not support the video tag.
            </video>
          </Grid>
          <Grid md="6" item sx={{ my: 6 }}>
            <Box>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight:'400'
                  }}
                >
                  {t("Our culture")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    width: "90%",
                    mx: "auto",
                    fontWeight:'400'
                  }}
                >
                  {t(
                    "We believe that true strength lies in the diversity of our team and the supportive work environment we create together.Here, every voice is heard, and every idea is valued, because we see differences as a source of creativity and success."
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item md="6">
            <img
              src={image2}
              style={{
                borderRadius: 5,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt=""
            />
          </Grid>

          <Grid item md="12">
            <Typography
              variant="h4"
              color="initial"
              sx={{ textAlign: "center" }}
            >
              {t("Our Partners")}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ textAlign: "center", mt: 5 }}
            >
              {t(
                "We understand the importance of forging key collaborations with vendors and partners alike as we aim to ensure providing our clients with the best value propositions possible. Therefore, we continue to establish strategic alliances with other reputable players in the market."
              )}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                my: 2,
                flexDirection: "row",
              }}
            >
              <Box sx={{ width: { xs: "20vw", md: "15vw", lg: "10vw" } }}>
                <img
                  src={partner3}
                  style={{ width: "100%" }}
                  alt="partner logo"
                />
              </Box>
              <Box sx={{ width: { xs: "20vw", md: "15vw", lg: "10vw" } }}>
                <img
                  src={partner2}
                  style={{ width: "100%" }}
                  alt="partner logo"
                />
              </Box>
              <Box sx={{ width: { xs: "20vw", md: "15vw", lg: "10vw" } }}>
                <img
                  src={partner1}
                  style={{ width: "100%" }}
                  alt="partner logo"
                />
              </Box>
              <Box sx={{ width: { xs: "20vw", md: "15vw", lg: "10vw" } }}>
                <img
                  src={partner0}
                  style={{ width: "100%" }}
                  alt="partner logo"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
