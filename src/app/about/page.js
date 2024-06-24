import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
  
import image1 from "assets/images/aboutus.png";
export default function About() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 12,mb:4 }}>
      <Grid container spacing={2}>
        <Grid item md="6">
          <Typography variant="h3">
            Our expertise is derived from a variety of fields from nutrient
            research.
          </Typography>
        </Grid>
        <Grid item md="6">
          <Typography variant="body1">
            Our expertise is derived from a variety of fields from nutrient
            research, global pharmaceutical companies, and everyday interests in
            health and wellness. We’ve been working across the pharmaceutical
            and wellbeing industries to meet customers needs for over 40 years.
            Fine’s story started in Ontario-Canada, and kept growing and
            expanding over the world. To achieve our customers demands in high
            quality products and fast delivery, {" "}ur expertise is derived from a variety of fields from nutrient
            research, global pharmaceutical companies, and everyday interests in
            health and wellness. We’ve been working across the pharmaceutical
          
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ borderRadius: 3, mt: 3 }}>
        <img
          src={image1}
          style={{ borderRadius: "inherit", width: "100%" ,height:'60vh',objectFit:'cover'}}
        />
      </Box>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold",mt:3 }}>
        values
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
        values We have a core set of values which drive the way we work: from
        everyday interactions with our customers to the formulation of our
        products.
        values We have a core set of values which drive the way we work: from
        everyday interactions with our customers to the formulation of our
        products.
        values We have a core set of values which drive the way we work: from
        everyday interactions with our customers to the formulation of our
        products.
        values We have a core set of values which drive the way we work: from
        everyday interactions with our customers to the formulation of our
        products.
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item md="6" sx={{borderRadius:3}}>
          <img
            src={image1}
            style={{
              borderRadius: "inherit",
              width: "100%",
              objectFit: "cover",

            }}
          />
        </Grid>
        <Grid md="6" container>
          <Grid md="6">
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                height:'96%',
                mx:1,
                borderRadius: 3,

              }}
            >
              <Typography
                variant="h6"
                color="initial"
                sx={{ textAlign: "center" }}
              >
                Passionate
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center" }}
              >
                Passion drives us in the pursuit of accessible health and
                wellbeing for our customers. It’s at the core of everything we
                do. We build strong relationships with others who share this
                passion.
              </Typography>
            </Box>
          </Grid>
          <Grid md="6">
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                height:'96%',
                mx:1,
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                color="initial"
                sx={{ textAlign: "center" }}
              >
                Passionate
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center" }}
              >
                Passion drives us in the pursuit of accessible health and
                wellbeing for our customers. It’s at the core of everything we
                do. We build strong relationships with others who share this
                passion.
              </Typography>
            </Box>
          </Grid>
          <Grid md="6">
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                height:'96%',
                mx:1,
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                color="initial"
                sx={{ textAlign: "center" }}
              >
                Passionate
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center" }}
              >
                Passion drives us in the pursuit of accessible health and
                wellbeing for our customers. It’s at the core of everything we
                do. We build strong relationships with others who share this
                passion.
              </Typography>
            </Box>
          </Grid>
          <Grid md="6">
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                height:'96%',
                mx:1,
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                color="initial"
                sx={{ textAlign: "center" }}
              >
                Passionate
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center" }}
              >
                Passion drives us in the pursuit of accessible health and
                wellbeing for our customers. It’s at the core of everything we
                do. We build strong relationships with others who share this
                passion.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
