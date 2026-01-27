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
import { useAddToCart } from "hooks/cart/useAddToCart";
import { AddShoppingCart } from "@mui/icons-material";

export default function ProductCard({ product, loading }) {
  const { handleAddToCart, loadingCart } = useAddToCart();
  if (!product) return <></>;

  const productImage = product?.images
    ? product?.images[0]?.image_path
    : product.image
      ? product.image.image_path
      : "";
  const productName = product.name;
  const link = `/store/product/${product?.id}/${product.name.replace(/\s+/g, "-")}`;
  const purchasable = product.purchasable === "always";

  const id = product.id;
  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 3,
        height: "100%",
        position: "relative",
      }}
    >
      {product.tag && (
      <Box
        sx={{
          position: "absolute",
          top: 35,
          right: -1,
          backgroundColor: "#ff4444",
          color: "white",
          padding: "5px 24px 5px 12px",
          borderRadius: "8px 0px 0px 8px",
          fontSize: "12px",
          fontWeight: "bold",
          zIndex: 10,
          boxShadow:
            "0px 3px 3px 0px rgba(0, 0, 0, 0.25), inset 3px 0px 3px 0px rgb(0 0 0 / 20%)",
        }}
      >
        {product.tag}
      </Box>
      )}
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
          {purchasable && !loading && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleAddToCart(id)}
            >
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
