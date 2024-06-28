import { Box, Button, Chip, Container, Typography, Grid } from "@mui/material";

import React from "react";
import careerimg from "assets/images/careers.png";
import careerimg1 from "assets/images/careers-img.png";
import careerimg2 from "assets/images/pic.png";
import careerimg3 from "assets/images/pic2.png";

import { Star } from "@mui/icons-material";
import JobCard from "./component/JobCard";
import { useCareers } from "hooks/careers/useCreers";
import Loader from "components/modules/Loader";
import { LoaderIcon } from "react-hot-toast";
export default function Careers() {
  const { data, isLoading } = useCareers();
  return (
    <Container sx={{ pt: 7 }}>
      <Grid container spacing={2}>
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
          <Chip label="Explore" color="primary" variant="outlined" />
          <Typography
            variant="h2"
            color="initial"
            sx={{ fontWeight: "bold", mt: 1 }}
          >
            Your Dream Jobs
          </Typography>
          <Typography variant="body1" color="initial" sx={{ mt: 2 }}>
            find jobs according to your interest, Here are +1000 jobs
            opportunities for your better future .
          </Typography>
        </Grid>
        <Grid item sm={6} sx={{ px: 4, textAlign: "center" }}>
          <img
            alt="join us"
            sx={{ width: "80%", mx: "auto", objectFit: "contain" }}
            src={careerimg}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md="4">
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
            <Box>
              <Star label="Careers at Dawaa alhayat" size="large" />
              <Typography
                variant="h3"
                color="initial"
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                Join us
              </Typography>

              <Chip
                label={"Careers at Dawaa alhayat"}
                size="small"
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
              ></Chip>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Our values are part of who we are, what we believe in, what we
              aspire to be, and they are reflected in our actions. They are our
              commitment to one another, and the collective personality of our
              organization. We always strive to lean into the fact that when
              properly practiced, sometimes our values will push us outside of
              our comfort zone. Our values are part of who we are, what we
              believe in, what we aspire to be, and they are reflected in our
              actions. They are our commitment to one another
            </Typography>
          </Box>
        </Grid>
        <Grid item xs="8">
          <Grid container spacing={2}>
            <Grid item md="6">
              <Box
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "10px",
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <img alt="" src={careerimg1} />
                <Typography variant="h6" color="initial">
                  Help customers succeed
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We come to work every day committed to driving success for our
                  customers. We create value for our community by building and
                  providing meaningful solutions to solve our customer's
                  problems and needs.
                </Typography>
              </Box>
            </Grid>
            <Grid item md="6">
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
                  <img alt="careerimg2" src={careerimg2} />
                  <img alt="careerimg3" src={careerimg3} />
                </Box>
                <Typography variant="h6" color="initial" sx={{ mt: 2 }}>
                  Our values guide everything
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  we serve a global community and we need a diverse team to do
                  that successfully. Women, people of colour, members of the
                  LGBTQ+ community, individuals with disabilities, and veterans
                  are strongly encouraged to appl
                </Typography>
              </Box>
            </Grid>
            <Grid item md="6">
              <Box
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "10px",
                  p: 4,
                  textAlign: "center",
                }}
              >
                <img alt="" src={careerimg1} />
                <Typography variant="h6" color="initial">
                  benefits
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We’re committed to providing our team with the freedom and
                  flexibility that comes with working remotely, and support our
                  team by providing everyone with the tools you need to do your
                  best work, in the work environment of your choice.
                </Typography>
              </Box>
            </Grid>
            <Grid item md="6">
              <Box
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "10px",
                  p: 4,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" color="initial">
                  benefits
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We’re committed to providing our team with the freedom and
                  flexibility that comes with working remotely, and support our
                  team by providing everyone with the tools you need to do your
                  best work, in the work environment of your choice.
                </Typography>
                <img alt="" src={careerimg1} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <section>
        <Typography
          variant="h3"
          color="initial"
          sx={{ fontWight: "bold", mt: 5 }}
        >
          Open Positions
        </Typography>
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
            <JobCard
              key={idx}
              id={item.id}
              title={item?.vacancy_name}
              description={
                item?.category_name + ". " + item.location + " " + item.country
              }
            />
          ))
        ) : (
          "sorry we currently have no open position poleas check out later "
        )}
      </section>
    </Container>
  );
}
