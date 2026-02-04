import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function Qoute({ data }) {
  console.log("Qoute data:", data);
  return (
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
          aspectRatio: "16/9",
          objectFit: "cover",
          borderRadius: 10,
        }}
        autoPlay
        loop
        muted
      >
        <source src={data?.vedio} type="video/mp4"></source>
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}
