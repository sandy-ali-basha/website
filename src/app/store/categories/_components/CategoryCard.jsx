import React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardShimmer from "components/customs/loaders/CardShimmer";

export default function CategoryCard({ img, label, link, loading }) {
  return (
    <Card
      sx={{
        width: "-webkit-fill-available",
        boxShadow: 3,
        borderRadius: 3,
        borderLeft: "4px solid",
        borderColor: "primary.light",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link
        to={"/store/categories/" + link}
        component="a"
        sx={{ textDecoration: "none", paddingBottom: "16px !important" }}
      >
        <CardContent>
          {loading ? (
            <>
              <CardShimmer
                style={{
                  width: "15vw",
                  height: "50px",
                  borderRadius: 2,
                }}
              />
            </>
          ) : (
            <Typography
              gutterBottom
              variant="h6"
              color="initial"
              sx={{
                textAlign: "center",
                textDecoration: "underline !important",
                textDecorationColor: "#fff !important",
              }}
            >
              {label}
            </Typography>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
