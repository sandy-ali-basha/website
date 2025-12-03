import React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CardShimmer from "components/customs/loaders/CardShimmer";
import defaultImg from "assets/images/defaultImg.jpg";
import { useTranslation } from "react-i18next";
import { useAddToCart } from "hooks/cart/useAddToCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { calculateDiscountPercent } from "utils/calculate-disocunt-percent";

export default function ProductCard({ product, loading }) {
  const { handleAddToCart, loadingCart } = useAddToCart();
  const { t } = useTranslation("index");
  const navigate = useNavigate();

  if (!product) return <></>;

  const productImage = product?.images
    ? product?.images[0]?.image_path
    : product.image
      ? product.image.image_path
      : "";
  const productName = product.name;
  const link = `/store/product/${product?.id}/${product.name}`;
  const purchasable = product.purchasable === "always";
  const price =
    product.compare_price > 0 ? product.compare_price : product.price;
  const discount =
    product.compare_price > 0
      ? calculateDiscountPercent(product.compare_price, product.price)
      : undefined;

  const priceAfterDiscount =
    product.compare_price > 0 ? product.price : product.compare_price;

  const id = product.id;

  return (
    <Card
      sx={{ height: "100%", backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Box
        sx={{
          background: (theme) => theme.palette.grey[300],
          position: "relative",
          "&:hover div": {
            opacity: 1,
          },
          "&:hover .image": {
            transform: "scale(0.9)",
          },
        }}
      >
        {loading ? (
          <CardShimmer
            style={{
              width: "100%",
              height: { xs: "30vh", sm: "45vh" },
              borderRadius: "12px",
            }}
          />
        ) : (
          <>
            <Box
              sx={{
                border: { xs: "1px solid #e1e1e1", md: "none" },
                width: "100%",
                height: { xs: "30vh", sm: "45vh" },
              }}
            >
              <CardMedia
                sx={{
                  backgroundSize: "contain",
                  width: "100%",
                  height: "100%",
                  transform: "scale(0.8)",
                  transition: "1s ease-in-out",
                }}
                image={productImage || defaultImg}
                title={productName}
                className="image"
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: "0",
                bottom: "0",
                width: "100%",
                height: { xs: "35vh", sm: "45vh" },
                background: "#26262636",
                opacity: "0",
                transition: "0.3s ease-in-out",
                zIndex: 1,
                display: { xs: "none", md: "block" },
              }}
            ></Box>

            {discount > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  left: "10px",
                  top: "10px",
                  background: (theme) => theme.palette.background.paper,
                  color: (theme) => theme.palette.error.main,
                  zIndex: 2,
                  padding: "3px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "500",
                  boxShadow: (theme) => theme.shadows[6],
                }}
              >
                -{discount} %
              </Box>
            )}

            {/* disktop buttons */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                bottom: "20px",
                transform: "translateX(-50%)",
                display: { xs: "none", md: "flex" },
                gap: "15px",
                zIndex: 2,
                opacity: 0,
                transition: "0.6s ease-in-out",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  borderRadius: "40px",
                  bgcolor: "white",
                  color: "black",
                  position: "relative",
                  overflow: "hidden",
                  height: "30px",
                  width: "90px",

                  "& svg": {
                    transition: "0.3s ease-in-out",
                  },
                  "& span": {
                    transition: "0.3s ease-in-out",
                  },

                  "&:hover": {
                    background: "#222222",
                    color: "white",
                  },

                  "&:hover span": {
                    transform: "translateY(50px)",
                  },

                  "&:hover svg": {
                    bottom: "50%",
                    transform: "translateY(50%)",
                  },
                }}
                onClick={() => navigate(link)}
              >
                <VisibilityIcon
                  sx={{
                    position: "absolute",
                    bottom: "40px",
                    fontSize: "20px",
                  }}
                />

                <Typography
                  variant="p"
                  fontSize="12px"
                  sx={{
                    position: "absolute",
                    bottom: "50%",
                    transform: "translateY(50%)",
                  }}
                >
                  {t("Quick view")}
                </Typography>
              </Button>

              {purchasable && !loading && (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "40px",
                    bgcolor: "white",
                    color: "black",
                    position: "relative",
                    overflow: "hidden",
                    height: "30px",
                    width: "90px",

                    "& .cart-icon": {
                      transition: "0.3s ease-in-out",
                    },
                    "& span": {
                      transition: "0.3s ease-in-out",
                    },

                    "&:hover": {
                      background: "#222222",
                      color: "white",
                    },

                    "&:hover span": {
                      transform: "translateY(50px)",
                    },

                    "&:hover .cart-icon": {
                      bottom: "50%",
                      transform: "translateY(50%)",
                    },
                  }}
                  onClick={() => handleAddToCart(id)}
                  disabled={loadingCart}
                >
                  {loadingCart ? (
                    <CircularProgress
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  ) : (
                    <>
                      <ShoppingCartIcon
                        className="cart-icon"
                        sx={{
                          position: "absolute",
                          bottom: "40px",
                          fontSize: "20px",
                        }}
                      />

                      <Typography
                        variant="p"
                        fontSize="12px"
                        sx={{
                          position: "absolute",
                          bottom: "50%",
                          transform: "translateY(50%)",
                        }}
                      >
                        {t("Quick shop")}
                      </Typography>
                    </>
                  )}
                </Button>
              )}
            </Box>

            {/* mobile buttons */}
            <ButtonGroup
              size="large"
              aria-label="Large button group"
              sx={{
                width: "100%",
                display: { xs: "flex", md: "none" },
                backgroundColor: "white",
              }}
            >
              <Button
                sx={{
                  flex: 1,
                  color: "#595959",
                  borderColor: "#e1e1e1",
                  borderRadius: "0",

                  "&:hover": {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
                onClick={() => navigate(link)}
              >
                <VisibilityIcon
                  sx={{
                    fontSize: "20px",
                  }}
                />
              </Button>

              {purchasable && !loading && (
                <Button
                  sx={{
                    flex: 1,
                    color: "#595959",
                    borderColor: "#e1e1e1",
                    borderRadius: "0",

                    "&:hover": {
                      color: (theme) => theme.palette.primary.main,
                    },
                  }}
                  onClick={() => handleAddToCart(id)}
                  disabled={loadingCart}
                >
                  {loadingCart ? (
                    <CircularProgress
                      style={{
                        fontSize: "20px",
                      }}
                    />
                  ) : (
                    <ShoppingCartIcon
                      sx={{
                        fontSize: "20px",
                      }}
                    />
                  )}
                </Button>
              )}
            </ButtonGroup>
          </>
        )}
      </Box>
      <CardContent sx={{ padding: 0 }}>
        <Link
          disabled={!loading}
          to={link}
          component="a"
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body2"
            fontSize={15}
            margin="10px 0"
            sx={{
              color: "#222222",
              transition: "0.3s ease-in-out",
              "&:hover": {
                color: "#06c5e6",
              },
            }}
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
              productName
            )}
          </Typography>
        </Link>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textDecoration: discount ? "line-through" : "none",
              fontSize: discount ? "small" : "medium",
            }}
            color={discount ? "text.secondary" : "#545454"}
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
                {price.toLocaleString()} {t("currency")}
              </>
            )}
          </Typography>
          {discount > 0 && (
            <Typography
              variant="body1"
              color={(theme) => theme.palette.primary.main}
            >
              {priceAfterDiscount.toLocaleString()} {t("currency")}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
