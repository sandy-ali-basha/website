import { Box, Container, Grid, Typography } from "@mui/material";
  
import React from "react";
import logo1 from "../../../assets/images/partners/logo.png";
import logo2 from "../../../assets/images/partners/Logo2.png";
import logo3 from "../../../assets/images/partners/Logo3.png";
import logo4 from "../../../assets/images/partners/Logo4.png";
import logo5 from "../../../assets/images/partners/Logo5.png";
import logo6 from "../../../assets/images/partners/Logo6.png";
import logo7 from "../../../assets/images/partners/Logo7.png";
import logo8 from "../../../assets/images/partners/Logo5.png";
export default function Partners() {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];
  return (
    <Container sx={{ my: "2rem" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <hr style={{ width: "100%" }} />
        <Typography
          sx={{ textAlign: "center", width: "20%" }}
          variant="body2"
          color="initial"
        >
          Our Partners
        </Typography>
        <hr style={{ width: "100%" }} />
      </Box>
      <Grid container sx={{ my: "2rem" }} spacing="2">
        {logos.map((item, index) => (
          <Grid md="3" sm="6" item key={index} >
            <img alt="logo" style={{ width: "70%", objectFit: "contain" }} src={item} />
          </Grid>
        ))}
      </Grid>
      <hr />
    </Container>
  );
}
