import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function Qoute({ data }) {
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
        key={data?.value}
        style={{
          width: "100%",
          aspectRatio: "16/9",
          objectFit: "cover",
          borderRadius: 10,
        }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={data?.value} type="video/mp4" />
      </video>
    </Box>
  );
}
