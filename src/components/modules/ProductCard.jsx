import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import CardShimmer from "components/customs/loaders/CardShimmer";
import defaultImg from "assets/images/defaultImg.jpg";
import { useTranslation } from "react-i18next";
export default function ProductCard({
  productName,
  Price,
  productImage,
  offer,
  link,
  loading,
}) {
  const { t } = useTranslation("index");
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
      {" "}
      <Link to={link} component="a" style={{ textDecoration: "none" }}>
        {loading ? (
          <CardShimmer
            style={{
              width: "100%",
              height: { xs: "30vh", md: "40vh" },
              borderRadius: "12px",
            }}
          />
        ) : (
          <>
            <CardMedia
              sx={{
                width: "100%",
                height: { xs: "30vh", md: "40vh" },
                borderRadius: "12px",
              }}
              image={productImage?.src || defaultImg}
              title={productName}
            />
          </>
        )}
      </Link>
      <CardContent>
        <Typography variant="body2" color="initial">
          {loading ? (
            <CardShimmer
              style={{
                width: "100%",
                height: "20px",
                borderRadius: "12px",
              }}
            />
          ) : (
            productName
          )}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", lg: "row" },
            mt: 1,
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{
                textDecoration: offer ? "line-through" : "none",
                fontSize: offer ? "small" : "inherit",
              }}
              color={offer ? "text.secondary" : "initial"}
            >
              {loading ? (
                <CardShimmer
                  style={{
                    width: "100%",
                    height: "20px",
                    borderRadius: "12px",
                  }}
                />
              ) : (
                <>{Price} $</>
              )}
            </Typography>

            {offer && (
              <Typography variant="body1" color="initial">
                {Price} $
              </Typography>
            )}
          </Box>
          <Button variant="outlined" size="small">
            {t("Add To Cart")}
          </Button>
        </Box>
      </CardContent>
      {/* Uncomment and use the Image component if necessary
      <img width="100%" src={productImage} alt={productName} /> */}
    </Card>
  );
}
