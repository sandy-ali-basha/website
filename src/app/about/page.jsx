import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import chars from "assets/images/pexels.jpg";
import image2 from "assets/images/pexels2.jpg";
import image4 from "assets/images/aboutsUs3.jpg";
import vision from "assets/images/vision.avif";
import misiion from "assets/images/misiion.avif";
import logo from "assets/images/logo.png";
import goal1 from "assets/images/about us/pexels.jpg";
import values from "assets/images/ourValues.avif";
import partner3 from "assets/images/partner-3.avif";
import partner2 from "assets/images/partner-2.avif";
import partner1 from "assets/images/partner-1.avif";
import partner0 from "assets/images/partner-0.avif";
import gaolImage from "assets/images/about us/pexels.jpg";
import gaolImage1 from "assets/images/about us/pexels0.jpg";
import gaolImage2 from "assets/images/about us/pexels1.jpg";
import gaolImage3 from "assets/images/about us/pexels2.jpg";
import gaolImage4 from "assets/images/about us/pexels3.jpg";
import bg from "assets/images/Asset2.svg";

import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function About() {
  const { t } = useTranslation("about");
  return (
    <Box
      sx={{
        background: `url(${bg}) no-repeat`,
        backgroundPosition: "65vw 10%",
        backgroundSize: "50%",
      }}
    >
      <Container maxWidth="lg" sx={{ marginTop: 12, mb: 4 }}>
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src={logo} alt="dawaa alhayat logo" style={{ width: "10vw" }} />
          <Typography variant="h3" sx={{ textAlign: "center", mt: 3 }}>
            {t("Welcome to Dawaa Al Hayat")}
          </Typography>
          <Box sx={{ width: "75vw", mx: "auto", my: 5 }}>
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
                      height: "25%",
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
                      borderRadius: "12px",
                      objectFit: "contain",
                      height: "25%",
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
            <Typography
              sx={{ textAlign: "center" }}
              variant="h2"
              color="initial"
            >
              {t("Our Goals")}
            </Typography>
          </Grid>

          <Box sx={{ width: "90vw", height: "70vh", py: 5 }}>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}

              // pagination={{
              //   clickable: true,
              // }}
              // modules={[Pagination]}
            >
              <SwiperSlide>
                <Box
                  sx={{
                    gap: "1rem",
                    background: `${goal1} center/cover no-repeat`,
                    position: "relative",
                    height: "50vh",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={gaolImage}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      zIndex: "-1",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt=""
                  />
                  <Box
                    sx={{
                      borderRadius: "20px",
                      p: 5,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      background:
                        "linear-gradient(180deg, rgba(118,128,176,0.11808473389355745) 0%, rgba(52,57,78,1) 71%)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t("Market Leadership")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {
                        "Strive to become the undisputed leader in pharmaceutical distribution within the Iraqi market. Achieve a premium position by consistently delivering exceptional service and maintaining a diverse portfolio of high-quality products."
                      }
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  sx={{
                    gap: "1rem",
                    background: `${goal1} center/cover no-repeat`,
                    position: "relative",
                    height: "50vh",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={gaolImage1}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      zIndex: "-1",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt=""
                  />
                  <Box
                    sx={{
                      borderRadius: "20px",
                      p: 5,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      background:
                        "linear-gradient(180deg, rgba(118,128,176,0.11808473389355745) 0%, rgba(52,57,78,1) 71%)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t("Expansion and Growth")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t(
                        "Expand the company's reach beyond its current three main offices in Baghdad, Erbil, and Sulimanya. Increase market share by establishing a strong presence in all major Iraqi regions."
                      )}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  sx={{
                    gap: "1rem",
                    background: `${goal1} center/cover no-repeat`,
                    position: "relative",
                    height: "50vh",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={gaolImage2}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      zIndex: "-1",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt=""
                  />
                  <Box
                    sx={{
                      borderRadius: "20px",
                      p: 5,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      background:
                        "linear-gradient(180deg, rgba(118,128,176,0.11808473389355745) 0%, rgba(52,57,78,1) 71%)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t("Product Innovation")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t(
                        "Explore opportunities to introduce innovative new products to the Iraqi market. Partner with leading pharmaceutical companies to bring cutting-edge treatments and supplements to Iraqi patients."
                      )}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  sx={{
                    gap: "1rem",
                    background: `${goal1} center/cover no-repeat`,
                    position: "relative",
                    height: "50vh",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={gaolImage3}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      zIndex: "-1",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt=""
                  />
                  <Box
                    sx={{
                      borderRadius: "20px",
                      p: 5,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      background:
                        "linear-gradient(180deg, rgba(118,128,176,0.11808473389355745) 0%, rgba(52,57,78,1) 71%)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t("Investing in People")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t(
                        "Continue to invest in the training and development of its employees. Foster a highly qualified and knowledgeable workforce capable of achieving the company's goals with the highest quality and performance."
                      )}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  sx={{
                    gap: "1rem",
                    background: `${goal1} center/cover no-repeat`,
                    position: "relative",
                    height: "50vh",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={gaolImage4}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      zIndex: "-1",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt=""
                  />
                  <Box
                    sx={{
                      borderRadius: "20px",
                      p: 5,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      background:
                        "linear-gradient(180deg, rgba(118,128,176,0.11808473389355745) 0%, rgba(52,57,78,1) 71%)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t("Community Impact")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="initial"
                      sx={{ textAlign: "center", color: "white" }}
                    >
                      {t(
                        "Consider initiatives that contribute positively to public health in Iraq. Partner with healthcare organizations to raise awareness about important health issues and promote healthy living practices."
                      )}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>

          <Grid item md="6" sx={{ my: 3 }}>
            <Typography variant="h6">
              {t("A solution for everyone")}:
            </Typography>
            <Typography variant="body1">
              {t("Dawaa Al Hayat: A Leading Healthcare Distributor in Iraq")}
            </Typography>
            <Typography variant="body1">
              {t(
                "For over 12 years, Dawaa Al Hayat has been a trusted name in Iraqi healthcare market. We specialize in delivering pharmaceuticals, nutraceuticals and health food throughout the country."
              )}
            </Typography>
            <Typography variant="body1">{t("Our Strengths:")}</Typography>
            <Typography variant="body1">
              <strong>{t("Established Reputation:")}</strong>
              {t(
                "We have built strong relationships with Iraqi regulatory bodies, ensuring efficient processes, competitive pricing, and consistent growth."
              )}
            </Typography>
            <Typography variant="body1">
              <strong>{t("Supply Chain:")}</strong>
              {t(
                "Our state-of-the-art warehouse and ERP system allow for fast and accurate distribution, minimizing errors."
              )}
            </Typography>
            <Typography variant="body1">
              <strong>
                {t("Digital Expertise:")}
                {t(
                  "Our dedicated Digital Marketing team leverages social media to increase brand awareness, sales, and customer engagement."
                )}
              </strong>
            </Typography>
            <Typography variant="body1">
              <strong>{t("Thriving E-commerce:")}</strong>
              {t(
                "Recognizing the growing trend of online shopping, our E-commerce department is rapidly expanding Dawaa Al Hayat's digital presence and sales channels across Iraq."
              )}
            </Typography>
          </Grid>
          <Grid item md="6" sx={{ my: 3 }}>
            <Box sx={{ borderRadius: 3 }}>
              <img
                src={chars}
                style={{
                  borderRadius: "inherit",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt=""
              />
            </Box>
          </Grid>
          <Grid
            md="12"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img src={values} style={{ width: "50%", mx: "auto" }} alt="" />
          </Grid>
          <Grid md="12" item sx={{my:6}}>
            <Box
              sx={{
                borderRadius: 3,
                height: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: "Typography ",
                    color: "white",
                  }}
                >
                  {t("Our culture")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    color: "white",
                    width: "75%",
                    mx: "auto",
                  }}
                >
                  {t(
                    "“Implementing the values that govern Dawaa Al Hayat’s people behaviours and harmonize their efforts in an energised joyful atmosphere to reach the company strategies”."
                  )}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: "-1",
                  top: "0px",
                  left: "0px",
                  width: "100%",
                  height: "100%",
                  filter: "brightness(0.5)",
                  borderRadius: 3,
                }}
              >
                <img
                  src={image2}
                  style={{
                    borderRadius: "inherit",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </Box>
            </Box>
          </Grid>

          <Grid item md="6">
            <Box sx={{ borderRadius: 3 }}>
              <img
                src={image4}
                style={{
                  borderRadius: "inherit",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt=""
              />
            </Box>
          </Grid>
          <Grid item md="6">
            <Typography variant="h4" color="initial">
              {t("Company Strategy")}
            </Typography>
            <Typography variant="h6">
              {t("Dawaa Al Hayat: Powering Growth in Healthcare.")}
            </Typography>
            <Typography variant="body1">
              {t(
                "At Dawaa Al Hayat, we're committed to two key strategies for success"
              )}
            </Typography>
            <Typography variant="h6">{t("Expanding our reach")}:</Typography>
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
              {t(
                "This combined approach, fueled by our cutting-edge technology and a team of passionate experts, empowers us to deliver exceptional operational efficiency and drive consumer growth. As the healthcare market continues to evolve, our focus on quality and certified brands ensures you can shop with complete confidence."
              )}
            </Typography>
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
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <img
                src={partner3}
                style={{ width: "10vw" }}
                alt="partner logo"
              />
              <img
                src={partner2}
                style={{ width: "10vw" }}
                alt="partner logo"
              />
              <img
                src={partner1}
                style={{ width: "10vw" }}
                alt="partner logo"
              />
              <img
                src={partner0}
                style={{ width: "10vw" }}
                alt="partner logo"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
