import React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardShimmer from "components/customs/loaders/CardShimmer";

export default function CategoryCard({ label, link, loading }) {
  return (
    <Link
      to={"/store/categories/" + link}
      component="a"
      style={{ textDecoration: "none" }}
    >
      {" "}
      <Card
        sx={{
          width: "-webkit-fill-available",
          boxShadow: 3,
          borderRadius: 3,
          borderLeft: "2px solid",
          borderColor: "primary.light",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ p: "0px !important" }}>
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
              variant="body1"
              color="initial"
              sx={{
                textAlign: "center",
                textDecoration: "underline !important",
                textDecorationColor: "#fff !important",
                fontSize: 17,
                p: 0,
              }}
            >
              {label}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
