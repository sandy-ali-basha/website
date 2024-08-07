import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import image2 from "assets/images/aboutUs2.jpg";
import image3 from "assets/images/aboutsUs3.jpg";
import { EnergySavingsLeafRounded } from "@mui/icons-material";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import { useTranslation } from "react-i18next";
export default function About() {
  const { t } = useTranslation("about");
  return (
    <Container maxWidth="lg" sx={{ marginTop: 12, mb: 4 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 6 }}>
        {t("Welcome to Dawaa Al Hayat")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item md="1"></Grid>
        <Grid item md="10" textAlign={"center"}>
          <Typography variant="h5">{t("About Us:")}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {t(
              "Dawaa Al Hayat was born in 2012 as an entrepreneurial project of its founders to invest their experience in the pharmaceutical distribution sector to reach a premium position in the Iraqi market."
            )}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {t(
              "With Three Main offices (Baghdad, Erbil, & Sulimanya), Dawaa Al Hayat maintains a strong presence in most Iraqi areas and nowadays, it is one of the fast-growing Iraqi pharma distributors."
            )}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {t(
              "The core business of the company is directed to the sales, promotion and distribution of high-quality (Pharmaceuticals, Dietary Supplements) that cover key therapeutic areas in the Iraqi market, both private and governmental sectors."
            )}
          </Typography>
        </Grid>
        <Grid item md="1"></Grid>

        <Grid item md="6">
          <Box>
            <img
              src={image3}
              style={{
                borderRadius: "12px",
                objectFit: "cover",
                width: "-webkit-fill-available",
              }}
            />
          </Box>
        </Grid>
        <Grid md="6" item>
          <Grid container spacing={2}>
            <Grid md="6" item>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  borderRadius: 3,
                  height: "96%",
                }}
              >
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textAlign: "center" }}
                >
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
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  borderRadius: 3,
                  height: "96%",
                }}
              >
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textAlign: "center" }}
                >
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

        <Grid md="12" item>
          <Box
            sx={{
              p: 2,
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: "Typography " }}
            >
              {t("Our culture")}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
              {t(
                "“Implementing the values that govern Dawaa Al Hayat’s people behaviours and harmonize their efforts in an energised joyful atmosphere to reach the company strategies”."
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid md="12" item>
          <Box sx={{ borderRadius: 3, height: "60vh" }}>
            <img
              src={image2}
              style={{
                borderRadius: "inherit",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        <Grid md="12" item>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "Typography ", my: 3 }}
          >
            {t("Our Values")}
          </Typography>
          <Grid container spacing={2}>
            <Grid md="6" item>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  height: "100%",
                  mx: 1,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textAlign: "center" }}
                >
                  {t("Excellence")}
                </Typography>

                <Typography variant="caption" sx={{ textAlign: "center" }}>
                  {t(
                    "For being excellent, Dawaa Al Hayat works continuously on the 3 Ps:"
                  )}
                </Typography>

                <Typography variant="body1">
                  <ul>
                    <li>
                      <span style={{ fontWeight: "bold" }}>People:</span>{" "}
                      {t(
                        "Recruiting Impartially - Training effectively – Encouraging creative ideas."
                      )}
                    </li>
                    <li>
                      <span style={{ fontWeight: "bold" }}>
                        {t("Product")}:
                      </span>{" "}
                      {t(
                        "Selecting uniquely – Storing safely – Distributing fast."
                      )}
                    </li>
                    <li>
                      <span style={{ fontWeight: "bold" }}>Place:</span>{" "}
                      {t(
                        "Expanding market’s share – Entering new markets – Exploring future markets."
                      )}
                    </li>
                  </ul>
                </Typography>
              </Box>
            </Grid>
            <Grid md="6" item>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  height: "100%",
                  mx: 1,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textAlign: "center" }}
                >
                  {t("Leadership")}
                </Typography>
                <Typography variant="caption" sx={{ textAlign: "center" }}>
                  {t(
                    "for demonstrating its leadership Dawaa Al Hayat works on:"
                  )}
                </Typography>

                <Typography variant="body1">
                  <ul>
                    <li>
                      {t(
                        "Influencing our business partners in the best professional manner."
                      )}
                    </li>
                    <li>
                      {t(
                        "Inspiring the health community to use new products that improve people’s life."
                      )}
                    </li>
                    <li>
                      {t(
                        "Energising our team to be initiative and take the responsibility."
                      )}
                    </li>
                  </ul>
                </Typography>
              </Box>
            </Grid>
            <Grid md="4" item>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  height: "100%",
                  mx: 1,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textAlign: "center" }}
                >
                  {t("Integrity & trust")}
                </Typography>

                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {t(
                    "Integrity is always a cornerstone in all our activities, practices & dealings; generating the strong trust that we have built with our customers, employees, suppliers."
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid md="4" item>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  height: "100%",
                  mx: 1,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textAlign: "center" }}
                >
                  {t("Passion")}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {t(
                    "To reach our vision, Dawaa Al Hayat believes that everyone in the team should stay full of:"
                  )}
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EnergySavingsLeafRounded />
                      <Typography
                        variant="h6"
                        color="initial"
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {t("Energy.")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AccessibilityNewRoundedIcon />
                      <Typography
                        variant="h6"
                        color="initial"
                        sx={{ textAlign: "center" }}
                      >
                        {t("Enthusiasm.")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MoodRoundedIcon />
                      <Typography
                        variant="h6"
                        color="initial"
                        sx={{ textAlign: "center" }}
                      >
                        {t("Positive emotion.")}
                      </Typography>
                    </Box>
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid md="4" item>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  height: "100%",
                  mx: 1,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textAlign: "center" }}
                >
                  {t("Integrity & trust")}
                </Typography>

                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {t(
                    "Integrity is always a cornerstone in all our activities, practices & dealings; generating the strong trust that we have built with our customers, employees, suppliers."
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md="12">
          <Typography variant="h4" color="initial" sx={{ textAlign: "center" }}>
            {t("Our Partners")}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ textAlign: "center" }}
          >
            {t(
              "We understand the importance of forging key collaborations with vendors and partners alike as we aim to ensure providing our clients with the best value propositions possible. Therefore, we continue to establish strategic alliances with other reputable players in the market."
            )}
          </Typography>
        </Grid>
        <Grid item md="12">
          <Typography sx={{ textAlign: "center" }} variant="h4">
            {t("Company Strategy")}
          </Typography>
        </Grid>
        <Grid item md="6">
          <Typography variant="h6">{t("Dawaa Al Hayat")}:</Typography>
          <Typography variant="body1">
            {t(
              "Powering Growth in Healthcare. At Dawaa Al Hayat, we're committed to two key strategies for success:"
            )}
          </Typography>
          <Typography variant="h6">{t("Expanding our reach")}:</Typography>
          <Typography variant="body1">
            {t(
              "We strategically partner with other companies in the healthcare industry (horizontal integration) to bring our products to a wider audience."
            )}
          </Typography>
          <Typography variant="h6">
            Offering a wider range of options:
          </Typography>
          <Typography variant="body1">
            {t(
              "We're constantly diversifying our product portfolio to cater to a broader spectrum of healthcare needs."
            )}
          </Typography>
          <Typography variant="body1">
            {t(
              "This combined approach, fueled by our cutting-edge technology and a team of passionate experts, empowers us to deliver exceptional operational efficiency and drive consumer growth. As the healthcare market continues to evolve, our focus on quality and certified brands ensures you can shop with complete confidence."
            )}
          </Typography>
        </Grid>
        <Grid item md="6">
          <Box sx={{ borderRadius: 3 }}>
            <img
              src={image2}
              style={{
                borderRadius: "inherit",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        <Grid item md="6">
          <Box sx={{ borderRadius: 3 }}>
            <img
              src={image2}
              style={{
                borderRadius: "inherit",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        <Grid item md="6">
          <Typography variant="h6">{t("Dawaa Al Hayat")}:</Typography>
          <Typography variant="body1">
            {t(
              "A Leading Healthcare Distributor in Iraq For over 12 years, Dawaa Al Hayat has been a trusted name in Iraqi healthcare market. We specialize in delivering pharmaceuticals, nutraceuticals and health food throughout the country."
            )}
          </Typography>
          <Typography variant="h6">Expanding our reach:</Typography>
          <Typography variant="body1">
            {t(
              "We strategically partner with other companies in the healthcare industry (horizontal integration) to bring our products to a wider audience."
            )}
          </Typography>
          <Typography variant="h6">
            {t("Offering a wider range of options")}:
          </Typography>
          <Typography variant="body1">
            {t(
              "We're constantly diversifying our product portfolio to cater to a broader spectrum of healthcare needs."
            )}
          </Typography>
          <Typography variant="body1">
            {
              "This combined approach, fueled by our cutting-edge technology and a team of passionate experts, empowers us to deliver exceptional operational efficiency and drive consumer growth. As the healthcare market continues to evolve, our focus on quality and certified brands ensures you can shop with complete confidence."
            }
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
