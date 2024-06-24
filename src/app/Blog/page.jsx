import { Box, Chip, Container, Typography } from "@mui/material";
  
import React from "react";
import img from "../../assets/images/hero-image (3).jpg";
import BlogCard from "./_components/BlogCard";

export default function Blog() {
  const blogPost = {
    id: "2",
    img: img,
    title: "Freelancers: Should You Show Up as You or a Company?",
    body: "lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    date: "12/05/2026",
  };
  return (
    <Container sx={{ mt: 20 }}>
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
          src={img}
          alt="company"
        />
        <Typography variant="body2" color="initial" sx={{ fontWeight: "300" }}>
          What to call your design business is one of the biggest questions
          freelance designers face. As a designer you are running a business,
          whether you have an LLC that clients write checks out to or not. But
          you are also a person who designs, and your reputation is likely tied
          to your first and last name. (Unless you’re so famous people only
          refer to you by one of themz.)
        </Typography>
      </Box>
      <BlogCard {...blogPost}></BlogCard>
    </Container>
  );
}
