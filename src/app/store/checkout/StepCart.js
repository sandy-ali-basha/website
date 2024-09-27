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
import { Card, Chip, Container } from "@mui/material";
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
    theme.breakpoints.between("sm", "lg")
  );
  const { t } = useTranslation("index");
  const cart_id = localStorage.getItem("cart_id");
  const { data, isLoading } = useCart(cart_id);
  const queryClient = useQueryClient();
  const handleDeleteItem = (id) => {
    _cart.delete({ id, cart_id }).then((res) => {
      // Invalidate the "cart" query to refetch the updated cart data
      if (res?.code === 200) {
        queryClient.invalidateQueries("cart");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Deleted successfully",
          toast: true,
          position: "top-end",
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
          position: "top-end",
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
          {cart_id && (
            <>
              {isLoading ? (
                <Typography variant="h5" sx={{ mb: 2 }}>
                  <CardShimmer style={{ width: "100px", height: "20px" }} />
                </Typography>
              ) : (
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {t("My Shopping Bag")} ({data?.data?.products?.length}{" "}
                  {t("Items")})
                </Typography>
              )}
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
                        onClick={() => handleDeleteItem(item?.id)}
                      >
                        <Icon icon="tabler:x" fontSize={20} />
                      </IconButton>
                      <Grid container sx={{ mx: 1 }}>
                        <Grid item xs={12} md={8}>
                          <Link
                            to={`/store/product/${item?.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemText primary={item?.name} />
                          </Link>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                              color={item?.stock > 0 ? "success" : "warrinig"}
                              label={
                                item?.stock > 0
                                  ? t("In Stock")
                                  : t("Out Of Stock")
                              }
                            />
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography sx={{ color: "text.main" }}>
                              {item?.price}
                            </Typography>
                            {/* <Typography
                              sx={{
                                color: "text.disabled",
                                textDecoration: "line-through",
                                mx: 1,
                              }}
                            >
                              /{item?.price}
                            </Typography> */}
                          </Box>
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
                              productID={item?.id}
                              quantity={item?.quantity}
                              max={item?.stock}
                              cartID={cart_id}
                            />
                          </Box>
                        </Grid>
                        {/* <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                        alignItems: "flex-end",
                      }}
                    >
                      <TextField size="small" type="number" defaultValue="1" />
                      <Button variant="outlined" size="small" color="secondary">
                        {t("Move to wishlist")}
                      </Button>
                    </Box>
                  </Grid> */}
                      </Grid>
                    </ListItem>
                  ))
                )}
              </StyledList>
            </>
          )}
        </Grid>
        {data?.data?.products?.length > 0 && (
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
                      {data?.data?.sub_total}IQD
                    </Typography>
                  </Box>
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
                    <Typography>{t("Coupon Discount")}</Typography>
                    <Typography
                      variant="h6"
                      onClick={(e) => e.preventDefault()}
                      sx={{ color: "primary.main", textDecoration: "none" }}
                    >
                      {t("Apply Coupon")}
                    </Typography>
                  </Box>
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
                    <Typography>{t("Order Total")}</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {data?.data?.sub_total}IQD
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      gap: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{t("Delivery Charges")}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography
                        sx={{
                          mr: 2,
                          textDecoration: "line-through",
                          color: "text.disabled",
                        }}
                      >
                        {data?.data?.sub_total}
                      </Typography>
                      <Chip
                        rounded
                        size="small"
                        skin="light"
                        color="success"
                        label="Free"
                      />
                    </Box>
                  </Box> */}
                </Box>
              </CardContent>

              <Divider sx={{ my: "0 !important" }} />
              <CardContent>
                <ApplyCoupon id={data?.id} />
                <ApplyPoints id={data?.id} />
              </CardContent>

              <Divider sx={{ my: "0 !important" }} />
              <CardContent
                sx={{ py: (theme) => `${theme.spacing(3.5)} !important` }}
              >
                <Box
                  sx={{
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>{t("Total")}</Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {data?.data?.sub_total}
                  </Typography>
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
              >
                {t("Place Order")}
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default StepCart;
