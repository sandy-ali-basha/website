import React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import CardShimmer from "components/customs/loaders/CardShimmer";
import defaultImg from "assets/images/defaultImg.jpg";
import { useTranslation } from "react-i18next";
import { useAddToCart } from "hooks/cart/useAddToCart";
import { AddShoppingCart } from "@mui/icons-material";
export default function ProductCard({
  productName,
  Price,
  productImage,
  offer,
  link,
  loading,
  id,
  purchasable,
}) {
  const { handleAddToCart, loadingCart } = useAddToCart();
  const { t } = useTranslation("index");

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3, height: "100%" }}>
      {" "}
      <Link
        disabled={!loading}
        to={link}
        component="a"
        style={{ textDecoration: "none" }}
      >
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
                backgroundSize: "contain",
              }}
              image={productImage || defaultImg}
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
                <>
                  {offer > 0 ? offer.toLocaleString() : Price.toLocaleString()}{" "}
                  {t("currency")}
                </>
              )}
            </Typography>
            {offer > 0 && (
              <Typography variant="body1" color="initial">
                {Price.toLocaleString()} {t("currency")}
              </Typography>
            )}
          </Box>

          {purchasable && !loading && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleAddToCart(id)}
            >
              {/* <CircularProgress style={{ width: "100%", height: "auto" }} /> */}
              {loadingCart ? (
                <CircularProgress style={{ width: "50%", height: "auto" }} />
              ) : (
                <AddShoppingCart style={{ width: "50%" }} />
              )}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
