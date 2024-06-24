import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function Qoute() {
  return (
    <Container>
      <Box
        sx={{
          my: 10,
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <video
          style={{
            width: "100%",
            height: "80vh",
            objectFit: "cover",
            borderRadius: 10,
          }}
          autoPlay
          loop
          muted
          data-poster="https://static.vecteezy.com/system/resources/thumbnails/040/532/569/original/a-bunch-of-green-and-blue-balloons-floating-in-the-air-loop-animation-video.jpg"
        >
          <source
            src="https://static.vecteezy.com/system/resources/previews/040/532/569/mp4/a-bunch-of-green-and-blue-balloons-floating-in-the-air-loop-animation-video.mp4"
            type="video/mp4"
          ></source>
          <source
            src="https://static.vecteezy.com/system/resources/previews/040/532/569/a-bunch-of-green-and-blue-balloons-floating-in-the-air-loop-animation-video.webm"
            type="video/webm"
          ></source>
          Your browser does not support the video tag.
        </video>
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            backdropFilter: "blur(20px)",
            p: 5,
            mx: 10,
            borderRadius: "10px",
            background: "#ffffff10",
          }}
        >
          <Typography variant="h4" color="initial" sx={{ fontWeight: "bold" }}>
            Each of our gummy vitamin supplements are vegan, halal, and free of
            lactose and gluten.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
