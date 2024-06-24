import { Box, Chip, Container, Typography } from "@mui/material";
  
import React from "react";
import img from "../../../assets/images/careers-img.png";

export default function BlogPost() {
  return (
    <Container sx={{ my: 20 }}>
      <Chip sx={{ background: "rgba(194, 238, 252, 1)" }} label="Blog"></Chip>
      <Typography variant="h2" sx={{ fontWeight: "bold", mt: 3 }}>
        Courtside: Dawaa Alhayat Blog
      </Typography>
      <Box sx={{ mt: 6, width: "80%" }}>
        <Typography variant="body2" color="text.secondary">
          December 21, 2022
        </Typography>
        <Typography variant="h3" sx={{ fontWight: "bold", mb: 2 }}>
          Freelancers: Should You Show Up as You or a Company?
        </Typography>
        <img
          style={{
            width: "80vw",
            borderRadius: "10px",
            height: "70vh",
            objectFit: "cover",
          }}
          alt="should you show up"
          src={img}
        />
        <Typography
          sx={{ mt: 2, fontWeight: "300" }}
          variant="body1"
          color="initial"
        >
          What to call your design business is one of the biggest questions
          freelance designers face. As a designer you are running a business,
          whether you have an LLC that clients write checks out to or not. But
          you are also a person who designs, and your reputation is likely tied
          to your first and last name. (Unless you’re so famous people only
          refer to you by one of themz.)
        </Typography>
        <Typography
          sx={{ mt: 2 }}
          variant="body1"
          color="initial"
          sx={{ fontWeight: "300" }}
        >
          What to call your design business is one of the biggest questions
          freelance designers face. As a designer you are running a business,
          whether you have an LLC that clients write checks out to or not. But
          you are also a person who designs, and your reputation is likely tied
          to your first and last name. (Unless you’re so famous people only
          refer to you by one of themz.)
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2 }}
          color="initial"
          sx={{ fontWeight: "300" }}
        >
          What to call your design business is one of the biggest questions
          freelance designers face. As a designer you are running a business,
          whether you have an LLC that clients write checks out to or not. But
          you are also a person who designs, and your reputation is likely tied
          to your first and last name. (Unless you’re so famous people only
          refer to you by one of themz.)
        </Typography>
      </Box>
    </Container>
  );
}
