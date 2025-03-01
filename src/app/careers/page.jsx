import { Box, Container, Typography, Grid } from "@mui/material";
import React from "react";
import careerimg from "assets/images/careers.webp";
import careerimg1 from "assets/images/career2.webp";
import careerimg3 from "assets/images/career3.webp";
import careerimg4 from "assets/images/careerimg (1).webp";
import careerimg5 from "assets/images/careerimg (2).webp";
import JobCard from "./component/JobCard";
import { useCareers } from "hooks/careers/useCreers";
import { LoaderIcon } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Careers() {
  const { data, isLoading } = useCareers();
  const { t } = useTranslation("index");

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <Box sx={{ mt: 10 }}>
      <Container
        sx={{
          pt: 7,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: { xs: "column-reverse", sm: "row" },
            my: 1,
          }}
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
            <Typography variant="h5" color="initial" sx={{ mt: 2 }}>
              {t("At")}
              <span style={{ color: "#5d2c8f" }}> {t("Dawaa Al Hayat")} </span>
              {t(
                ", we're driven by a commitment to excellence in healthcare. We're always searching for talented individuals who share our passion for improving lives."
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
        <Grid container spacing={2} sx={{ my: 1 }}>
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
              src={careerimg1}
            />
          </Grid>
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
            <Typography variant="h5" color="initial" sx={{ mt: 2 }}>
              {t("What we offer our employees:")}
            </Typography>
            <Typography variant="h6" color="initial" sx={{ mt: 2 }}>
              {t("A")}
              <span style={{ color: "#5d2c8f" }}> {t("Positive")}</span>{" "}
              {t("and inclusive work environment. We believe in")}{" "}
              <span style={{ color: "#01aec6" }}> {t("Diversity")} </span>
              {t("and")}{" "}
              <span style={{ color: "#5d2c8f" }}> {t("Inclusion")}</span>{" "}
              {t(
                ",and we strive to create a work environment where everyone feels"
              )}{" "}
              <span style={{ color: "#01aec6" }}> {t("Welcome")} </span> &
              <span style={{ color: "#5d2c8f" }}> {t("Valued")} </span>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: { xs: "column-reverse", sm: "row" },
            my: 1,
          }}
        >
          <Grid
            item
            sm={8}
            sx={{
              minHeight: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="initial" sx={{ mt: 2 }}>
              {t("Excellent opportunities for")}{" "}
              <span style={{ color: "#5d2c8f" }}> {t("Growth")}</span>{" "}
              {t("and")}
              <span style={{ color: "#01aec6" }}>
                {" "}
                {t("Development")}
              </span> .{" "}
              {t(
                "We provide comprehensive training and development programs to help our employees reach their full potential."
              )}
            </Typography>
          </Grid>
          <Grid
            item
            sm={4}
            sx={{
              minHeight: "40vh",
              px: 4,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              alt="join us"
              style={{
                position: "absolute",
                width: "70%",
                mx: "auto",
                objectFit: "contain",
              }}
              src={careerimg4}
            />
            <img
              alt="join us"
              style={{
                position: "absolute",
                width: "70%",
                mx: "auto",
                objectFit: "contain",
              }}
              src={careerimg5}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ my: 1 }}>
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
              style={{
                width: "100%",
                mx: "auto",
                objectFit: "contain",
              }}
              src={careerimg3}
            />
          </Grid>
          <Grid
            item
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="initial" sx={{ mt: 2 }}>
              {t("A work culture based on")}{" "}
              <span style={{ color: "#5d2c8f" }}> {t("Respect")}</span>{" "}
              {t("and")}
              <span style={{ color: "#01aec6" }}> {t("Collaboration")}</span>.
              {t("We believe in")}{" "}
              <span style={{ color: "#5d2c8f" }}> {t("Teamwork")}</span>{" "}
              {t("and encourage collaboration among our team members")}
            </Typography>
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
