import { Box, Chip, Container, Typography, Grid } from "@mui/material";
import React from "react";
import careerimg from "assets/images/careers.svg";
import careerimg1 from "assets/images/careers-img.png";
import careerimg2 from "assets/images/pic.png";
import careerimg3 from "assets/images/pic2.png";
import { Star } from "@mui/icons-material";
import JobCard from "./component/JobCard";
import { useCareers } from "hooks/careers/useCreers";
import { LoaderIcon } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import bg from "assets/images/careersBg.svg";

export default function Careers() {
  const { data, isLoading } = useCareers();
  const { t } = useTranslation('index');

  return (
    <Box
      sx={{
        background: `url(${bg}) no-repeat`,
        backgroundPosition: { lg: "60vw 0%", xs: "55vw -10%" },
        backgroundSize: { lg: "60%", xs: "100%" },
      }}
    >
      <Container
        sx={{
          pt: 7,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ minHeight: "90vh", flexDirection: { xs: "column-reverse" ,md:'row'} }}
        >
          <Grid
            item
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h2"
              color="initial"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              {t("Join Us Today")}
            </Typography>
            <Typography variant="body1" color="initial" sx={{ mt: 2 }}>
              {t(
                "At Dawaa Al Hayat, we're driven by a commitment to excellence in healthcare. We're always searching for talented individuals who share our passion for improving lives. Do you dream of a career that allows you to make a real impact? If you're energized by the healthcare industry and eager to contribute to our growing team, we invite you to explore the exciting opportunities currently available at Dawaa Al Hayat."
              )}
            </Typography>
          </Grid>
          <Grid
            item
            sm={6}
            sx={{
              px: 4,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="join us"
              style={{ width: "75%", mx: "auto", objectFit: "contain" }}
              src={careerimg}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pb: 5 }}>
          <Grid item md="6">
            <Box
              sx={{
                border: "1px solid #E0E0E0",
                borderRadius: "10px",
                p: 4,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ mt: 5 }}>
                <Star label="Careers at Dawaa alhayat" size="large" />
                <Typography
                  variant="h3"
                  color="initial"
                  sx={{ fontWeight: "bold", mt: 3 }}
                >
                  {t("What We offer our employees:")}
                </Typography>

                <Chip
                  label={"Careers at Dawaa alhayat"}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 3 }}
                ></Chip>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2, mb: 5 }}
              >
                {t(
                  "A positive and inclusive work environment. We believe in diversity and inclusion, and we strive to create a work environment where everyone feels welcome and valued."
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item md="6">
            <Grid container spacing={2}>
              <Grid item md="12">
                <Box
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "10px",
                    p: 4,
                    textAlign: "center",
                    height: "100%",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <img alt="" src={careerimg1} />

                  <Typography variant="body1" color="text.secondary">
                    {t(
                      "Excellent opportunities for growth and development. We provide comprehensive training and development programs to help our employees reach their full potential."
                    )}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md="12">
                <Box
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "10px",
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    <img
                      alt="careerimg2"
                      style={{ width: "30%" }}
                      src={careerimg2}
                    />
                    <img
                      alt="careerimg3"
                      style={{ width: "30%" }}
                      src={careerimg3}
                    />
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {
                      t("A work culture based on respect and collaboration. We believe in teamwork and encourage collaboration among our team members.")
                    }
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              py: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoaderIcon style={{ width: "10vw", height: "10vw" }} />
          </Box>
        ) : data?.careers ? (
          data?.careers?.map((item, idx) => (
            <section>
              <Typography
                variant="h3"
                color="initial"
                sx={{ fontWight: "bold", mt: 5 }}
              >
                {t("Open Positions")}
              </Typography>
              <JobCard
                key={idx}
                id={item.id}
                title={item?.vacancy_name}
                description={
                  item?.category + ". " + item.location + " " + item.country
                }
              />
            </section>
          ))
        ) : (
          <Typography variant="body2" my={2}>
            {t(
              "Sorry, we currently have no open positions. Please check back later."
            )}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
