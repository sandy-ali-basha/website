import React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import defaultImg from "assets/images/defaultImg.jpg";
import CardShimmer from "components/customs/loaders/CardShimmer";

export default function CategoryCard({ img, label, link }) {
  console.log(img);
  const loading = true;

  return (
    <Card
      sx={{
        width: "-webkit-fill-available",
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Link
        to={"/store/categories/" + link}
        component="a"
        sx={{ textDecoration: "none" }}
      >
        {loading ? (
          <>
            <CardShimmer
              sx={{
                width: "100%",
                height: 140,
                borderRadius: "12px",
              }}
            />
          </>
        ) : (
          <>
            <CardMedia
              sx={{
                height: 140,
              }}
              image={img || defaultImg}
              title={label}
            />
          </>
        )}

        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            color="initial"
            sx={{ textAlign: "center", textDecoration: "none" }}
          >
            {label}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
