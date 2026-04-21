import { Link } from "react-router-dom";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { styled } from "@mui/material/styles";
import { Alert, Card, Chip, Container } from "@mui/material";
// ** Icon Imports
import Icon from "components/modules/icon";
import { useTranslation } from "react-i18next";
import { useCart } from "hooks/cart/useCart";
import QuantityInput from "./_components/QuantityInput";
import CardShimmer from "components/customs/loaders/CardShimmer";
import { _cart } from "api/cart/_cart";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";
import ApplyCoupon from "./_components/ApplyCoupon";
import ApplyPoints from "./_components/ApplyPoints";
import emptyCart from "assets/images/empty-cart.webp";
import Simillar from "../product/[id]/_components/Simllar";
import { useEffect, useRef, useState } from "react";
import RenderVariants from "./_components/RenderVariants";
import BestSellers from "components/modules/home/BestSellers";
import { useFreeShipping } from "hooks/home/useHome";
import ProductPrice from "../product/[id]/_components/ProductPrice";

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  "& .MuiListItem-root": {
    padding: theme.spacing(2),

    "& .MuiListItemText-root": {
      marginTop: 0,
      marginBottom: theme.spacing(2),
      "& .MuiTypography-root": {
        color: theme.palette.text.secondary,
      },
    },
    "& .remove-item": {
      top: "0.5rem",
      right: "0.625rem",
      position: "absolute",
      color: theme.palette.text.disabled,
    },
  },
}));

const StepCart = ({ handleNext }) => {
  const breakpointMD = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "lg"),
  );
  const { t } = useTranslation("index");
  const cart_id = localStorage.getItem("cart_id");
  const { data, isLoading } = useCart(cart_id);
  const { data: freeShippingData } = useFreeShipping();
  const [message, setMessage] = useState(false);
  const queryClient = useQueryClient();
  const userData = localStorage.getItem("userData");
  const freeShippingLimit = freeShippingData?.free_shipping_limit || 0;
  const cartSubtotal = data?.data?.sub_total || 0;

  const hasFreeShipping =
    freeShippingLimit > 0 && cartSubtotal >= freeShippingLimit;
  const remainingForFreeShipping = Math.max(
    freeShippingLimit - cartSubtotal,
    0,
  );

  const isCloseToFreeShipping =
    freeShippingLimit > 0 &&
    remainingForFreeShipping > 0 &&
    remainingForFreeShipping <= freeShippingLimit * 0.2;

  const shownRemainingRef = useRef(null);

  useEffect(() => {
    const cart_count = data?.data?.products?.length || 0;
    localStorage.setItem("cart_count", Math.max(cart_count));
  }, [data]);

  useEffect(() => {
    if (!cart_id || !data?.data?.products?.length) return;

    if (hasFreeShipping || !isCloseToFreeShipping) {
      shownRemainingRef.current = null;
      return;
    }

    const remainingAmount = `${(remainingForFreeShipping / 1000).toFixed(3)}}`;

    if (shownRemainingRef.current === remainingAmount) return;
    shownRemainingRef.current = remainingAmount;
    setMessage(true);
  }, [
    cart_id,
    data?.data?.products?.length,
    hasFreeShipping,
    isCloseToFreeShipping,
    remainingForFreeShipping,
    t,
  ]);
  const handleDeleteItem = (params) => {
    const data = {
      product_id: params?.id,
      variant_id: params?.variant_id,
    };

    _cart.delete({ data, cart_id }).then((res) => {
      // Invalidate the "cart" query to refetch the updated cart data
      if (res?.code === 200) {
        queryClient.invalidateQueries("cart");
        const currentCartCount =
          parseInt(localStorage.getItem("cart_count")) || 0;
        localStorage.setItem("cart_count", Math.max(currentCartCount - 1, 0));
        Swal.fire({
          icon: "success",
          title: "Success",
          text: t("Deleted successfully"),
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res?.error?.message,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
    });
  };

  return !cart_id ? (
    <Card
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img alt=" " src={emptyCart} style={{ width: "40vw" }} />
      <Typography>{t("Your shopping page is empty")}</Typography>
    </Card>
  ) : (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          {message && (
            <Alert
              severity="info"
              sx={{ mb: 2 }}
              onClose={() => setMessage(false)}
            >
              {t("Complete your cart with {{amount}} to get free shipping", {
                amount: shownRemainingRef.current,
              })}
            </Alert>
          )}

          {cart_id && (
            <>
              {isLoading ? (
                <Typography variant="h5" sx={{ mb: 2 }}>
                  <CardShimmer style={{ width: "100px", height: "20px" }} />
                </Typography>
              ) : (
                data?.data?.products?.length > 0 && (
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {t("My Shopping Bag")} ({data?.data?.products?.length}{" "}
                    {t("Items")})
                  </Typography>
                )
              )}
              {data?.data?.products?.length < 0 ||
                (!data?.data?.products && (
                  <Card
                    sx={{
                      minHeight: "80vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img alt=" " src={emptyCart} style={{ width: "40vw" }} />
                    <Typography>
                      {t("Your shopping page is empty")}
                      {data?.data?.products?.length}
                    </Typography>
                  </Card>
                ))}
              <StyledList>
                {isLoading ? (
                  <ListItem sx={{ boxShadow: 3, borderRadius: 3, my: 2 }}>
                    <Grid container sx={{ mx: 1 }}>
                      <Grid item xs={12} md={4}>
                        <CardShimmer
                          style={{ width: "10vh", height: "10vh" }}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <CardShimmer
                          style={{ width: "100%", height: "10vh" }}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                ) : (
                  data?.data?.products?.length > 0 &&
                  data?.data?.products?.map((item, idx) => (
                    <ListItem
                      key={idx}
                      sx={{ boxShadow: 3, borderRadius: 3, my: 2 }}
                    >
                      <ListItemAvatar
                        key={item?.product_id}
                        sx={{
                          display: "flex",
                          borderRadius: 3,
                          width: "15%",
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "inherit",
                          }}
                          src={item?.images[0]?.image_path}
                          alt={item?.name}
                        />
                      </ListItemAvatar>
                      <IconButton
                        size="small"
                        className="remove-item"
                        sx={{ color: "text.primary" }}
                        onClick={() => handleDeleteItem(item)}
                      >
                        <Icon icon="tabler:x" fontSize={20} />
                      </IconButton>
                      <Grid container sx={{ mx: 1 }}>
                        <Grid item xs={12} md={8}>
                          <Link
                            to={`/store/product/${item?.id}/${item.name}`}
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemText primary={item?.name} />
                          </Link>

                          {/* ⬇️ Display Variants Here ⬇️ */}
                          <RenderVariants options={item?.options} />

                          {/* ⬆️ Display Variants Here ⬆️ */}

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <Typography sx={{ mr: 1, color: "text.disabled" }}>
                              {t("Sold By")}:
                            </Typography>
                            <Typography
                              component={Link}
                              to={`/store/categories/brand/${item?.brand?.id}`}
                              sx={{
                                mr: 2,
                                color: "primary.main",
                                textDecoration: "none",
                              }}
                            >
                              {item?.brand?.name}
                            </Typography>
                            <Chip
                              rounded
                              size="small"
                              skin="light"
                              color={item?.stock > 0 ? "success" : "warning"}
                              label={
                                item?.stock > 10
                                  ? t("In Stock")
                                  : item?.stock === 1
                                    ? t("Only 1 unit left")
                                    : item?.stock > 1 && item?.stock <= 10
                                      ? t("Few units left")
                                      : t("Out Of Stock")
                              }
                            />
                          </Box>
                          <ProductPrice variant={item?.variant} />

                        </Grid>
                        <Grid item xs={12} md={4} sx={{ mt: [4, 4, 6] }}>
                          <Box
                            sx={{
                              gap: 1,
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-end",
                            }}
                          >
                            <QuantityInput
                              product={item}
                              quantity={item?.quantity}
                              max={item?.stock}
                              cartID={cart_id}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))
                )}
              </StyledList>
            </>
          )}
        </Grid>
        {data?.data?.products?.length > 0 && (
          <>
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    {t("Price Details")}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        mb: 2,
                        gap: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{t("Bag Total")}</Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {data?.data?.discount_amount > 0
                          ? data?.data?.sub_total_after_points.toLocaleString()
                          : data?.data?.sub_total.toLocaleString()}{" "}
                      </Typography>
                    </Box>

                    {data?.data?.discount_amount > 0 && (
                      <>
                        {data?.data?.coupon_code && (
                          <Box
                            sx={{
                              mb: 2,
                              gap: 2,
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>{t("Coupon Applied")}</Typography>
                            <Chip
                              label={data?.data?.coupon_code}
                              color="success"
                              size="small"
                            />
                          </Box>
                        )}

                        <Box
                          sx={{
                            mb: 2,
                            gap: 2,
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>{t("Discount Amount")}</Typography>
                          <Typography variant="h6" sx={{ color: "primary.main" }}>
                            {data?.data?.discount_amount.toLocaleString()}{" "}
                          </Typography>
                        </Box>
                      </>
                    )}

                    {data?.data?.points_used > 0 && (
                      <Box
                        sx={{
                          mb: 2,
                          gap: 2,
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>{t("Points Used")}</Typography>
                        <Typography variant="body2" color="secondary">
                          {data?.data?.points_used}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>

                <Divider sx={{ my: "0 !important" }} />
                {userData && (
                  <CardContent>
                    <ApplyCoupon />
                    <ApplyPoints />
                  </CardContent>
                )}

                <Divider sx={{ my: "0 !important" }} />
                {hasFreeShipping && (
                  <CardContent sx={{ pt: 2, pb: 0 }}>
                    <Chip
                      color="success"
                      label={t("You got free shipping")}
                      sx={{ width: "100%", fontWeight: 600 }}
                    />
                  </CardContent>
                )}
                <CardContent
                  sx={{ py: (theme) => `${theme.spacing(3.5)} !important` }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      gap: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{t("Order Total")}</Typography>
                    <Box>
                      <Typography
                        sx={{
                          color: "text.secondary",
                          textDecoration:
                            data?.data?.discount_amount > 0 ||
                              data?.data?.points_used > 0
                              ? "line-through"
                              : "none",
                          fontSize:
                            data?.data?.discount_amount > 0 ||
                              data?.data?.points_used > 0
                              ? "small"
                              : "initial",
                        }}
                      >
                        {data?.data?.sub_total.toLocaleString()}
                      </Typography>
                      <Typography variant="h5" sx={{ color: "primary.main" }}>
                        {data?.data?.discount_amount > 0
                          ? data?.data?.sub_total_after_points.toLocaleString()
                          : data?.data?.sub_total.toLocaleString()}{" "}
                      </Typography>

                      {data?.data?.points_used > 0 && (
                        <Typography
                          variant="h6"
                          sx={{
                            color: "secondary.main",
                            textDecoration: "none",
                          }}
                        >
                          {data?.data?.sub_total_after_points.toLocaleString()}{" "}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  ...(breakpointMD ? { justifyContent: "flex-end" } : {}),
                }}
              >
                <Button
                  fullWidth={!breakpointMD}
                  variant="contained"
                  onClick={handleNext}
                  sx={{ borderRadius: 3 }}
                  color="secondary"
                  disabled={!userData}
                >
                  {userData ? t("Place Order") : t("pleas Log in to order")}
                </Button>
              </Box>
            </Grid>
            <Simillar id={data?.data?.products[0]?.id} />
          </>
        )}
      </Grid>
    </Container>
  );
};

export default StepCart;
