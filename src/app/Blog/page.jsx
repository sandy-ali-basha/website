import { Box, Chip, Container, Typography } from "@mui/material";

import React from "react";
import img from "../../assets/images/hero-image (3).jpg";
import BlogCard from "./_components/BlogCard";
import { useBlogs } from "hooks/blog/useBlog";
import CardShimmer from "components/customs/loaders/CardShimmer";

export default function Blog() {

  const { data, isLoading } = useBlogs();
  console.log(data);
  return (
    <Container sx={{ mt: 20 }}>
      <Chip sx={{ background: "rgba(194, 238, 252, 1)" }} label="Blog"></Chip>
      <Typography variant="h2" sx={{ fontWeight: "bold", mt: 3 }}>
        {isLoading ? (
          <CardShimmer style={{ width: "100%", height: "20px" }} />
        ) : (
          data?.posts[0]?.title
        )}
      </Typography>
      <Box sx={{ mt: 6, mb: 5, width: "80%" }}>
        <Typography variant="body2" color="text.secondary">
          {isLoading ? (
            <CardShimmer style={{ width: "100%", height: "20px" }} />
          ) : (
            data?.posts[0]?.date
          )}
        </Typography>

        {isLoading ? (
          <CardShimmer
            style={{ width: "80vw", borderRadius: "10px", height: "70vh" }}
          />
        ) : (
          <img
            style={{
              width: "80vw",
              borderRadius: "10px",
              height: "70vh",
              objectFit: "cover",
            }}
            src={data?.posts[0]?.image}
            alt="company"
          />
        )}

        <Typography
          variant="body2"
          color="initial"
          sx={{ fontWeight: "300" }}
          dangerouslySetInnerHTML={{ __html: data?.posts[0]?.text }}
        ></Typography>
        {isLoading && <CardShimmer style={{ width: "100%", height: "20px" }} />}
        {isLoading && <CardShimmer style={{ width: "90%", height: "20px" }} />}
      </Box>

      {data?.posts?.length > 1 &&
        data?.posts
          ?.slice(1)
          .map((item, index) => <BlogCard key={index} {...item} />)}
    </Container>
  );
}
