import React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia, Link, Typography } from "@mui/material";

export default function CategoryCard({ img, label, link }) {
  console.log(img);
  return (
    <Card sx={{ width: "-webkit-fill-available", mx: 1, my: 2, boxShadow: 3,borderRadius:3 }}>
      <Link
        href={"/store/categories/" + link}
        component="a"
        sx={{ textDecoration: "none" }}
      >
        <CardMedia sx={{ height: 140 }} image={img} title={label} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            color="initial"
            sx={{ textAlign: "center" }}
          >
            {label}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
