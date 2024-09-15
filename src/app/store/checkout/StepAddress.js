// ** React Imports
import { useEffect, useState } from "react";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Custom Components Imports
import {
  Card,
  Chip,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CustomRadioBasic from "components/customs/custom-radio/basic";
import CustomRadioIcons from "components/customs/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAddresses } from "hooks/addresses/useAddresses";
import Loader from "components/modules/Loader";
import { useTranslation } from "react-i18next";
import { useCart } from "hooks/cart/useCart";
import CardShimmer from "components/customs/loaders/CardShimmer";

const StepAddress = ({
  handleNext,
  selectedBasicRadio,
  setSelectedBasicRadio,
}) => {
  // const [selectedIconRadio, setSelectedIconRadio] = useState("standard");
  const { data = { addresses: [] }, isLoading } = useAddresses();
  const { t } = useTranslation("index");

  const addresses = data?.addresses || [];

  const addressData = addresses.map((address, index) => ({
    value: address.id,
    isSelected: address.id === selectedBasicRadio,
    title: `${address.title} ${address.first_name} ${address.last_name} ${
      address.billing_default ? "(Default)" : ""
    }`,
    meta: address.shipping_default && (
      <Chip
        rounded
        size="small"
        skin="light"
        label={"Shipping Default"}
        color={"primary"}
      />
    ),
    content: (
      <Box
        sx={{
          mt: 0.5,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body2" sx={{ mb: "auto" }}>
          {address.line_one}, {address.city}, {address.state}, {address.country}
          .<br />
          {address.postcode && `Postcode: ${address.postcode}.`}
          <br />
          {address.contact_phone && `Mobile: ${address.contact_phone}.`}
        </Typography>
      </Box>
    ),
  }));

  useEffect(() => {
    const defaultAddress = addresses.find(
      (address) => address.shipping_default
    );
    if (defaultAddress) {
      setSelectedBasicRadio(defaultAddress.id);
    }
  }, [addresses, setSelectedBasicRadio]);
  // const dataIcons = [
  //   {
  //     isSelected: true,
  //     value: "standard",
  //     title: (
  //       <Typography variant="h6" sx={{ mb: 1 }}>
  //         Standard
  //       </Typography>
  //     ),
  //     content: (
  //       <>
  //         <Chip
  //           rounded
  //           size="small"
  //           skin="light"
  //           label="Free"
  //           color="success"
  //           sx={{ top: 12, right: 12, position: "absolute" }}
  //         />
  //         <Typography variant="body2" sx={{ my: "auto", textAlign: "center" }}>
  //           Get your product in 1 Week.
  //         </Typography>
  //       </>
  //     ),
  //   },
  //   {
  //     value: "express",
  //     title: (
  //       <Typography variant="h6" sx={{ mb: 1 }}>
  //         Express
  //       </Typography>
  //     ),
  //     content: (
  //       <>
  //         <Chip
  //           rounded
  //           label="$10"
  //           size="small"
  //           skin="light"
  //           color="secondary"
  //           sx={{ top: 12, right: 12, position: "absolute" }}
  //         />
  //         <Typography variant="body2" sx={{ my: "auto", textAlign: "center" }}>
  //           Get your product in 3-4 days.
  //         </Typography>
  //       </>
  //     ),
  //   },
  //   {
  //     value: "overnight",
  //     title: (
  //       <Typography variant="h6" sx={{ mb: 1 }}>
  //         Overnight
  //       </Typography>
  //     ),
  //     content: (
  //       <>
  //         <Chip
  //           rounded
  //           label="$15"
  //           size="small"
  //           skin="light"
  //           color="secondary"
  //           sx={{ top: 12, right: 12, position: "absolute" }}
  //         />
  //         <Typography variant="body2" sx={{ my: "auto", textAlign: "center" }}>
  //           Get your product in 1 day.
  //         </Typography>
  //       </>
  //     ),
  //   },
  // ];

  // ** Hook
  const theme = useTheme();
  const navigate = useNavigate();
  const breakpointMD = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  // const icons = [
  //   {
  //     icon: "tabler:users",
  //     iconProps: {
  //       fontSize: "2.125rem",
  //       style: { marginBottom: 8 },
  //       color: theme.palette.text.secondary,
  //     },
  //   },
  //   {
  //     icon: "tabler:crown",
  //     iconProps: {
  //       fontSize: "2.125rem",
  //       style: { marginBottom: 8 },
  //       color: theme.palette.text.secondary,
  //     },
  //   },
  //   {
  //     icon: "tabler:brand-telegram",
  //     iconProps: {
  //       fontSize: "2.125rem",
  //       style: { marginBottom: 8 },
  //       color: theme.palette.text.secondary,
  //     },
  //   },
  // ];

  const handleBasicRadioChange = (prop) => setSelectedBasicRadio(prop);
  // const handleIconRadioChange = (prop) => setSelectedIconRadio(prop);
  const handleAddNewAddress = () => navigate("/profile/addresses");

  const cart_id = localStorage.getItem("cart_id");
  const { data: cartData, isLoading: cartIsLoading } = useCart(cart_id);
  if (isLoading) {
    return (
      <Typography sx={{ textAlign: "center", minHeight: "50vh" }}>
        <Loader />
      </Typography>
    );
  }

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Typography sx={{ mb: 4 }} variant="h6">
            {"Select your preferable address"}
          </Typography>
          <Grid container spacing={4}>
            {addressData.map((item, index) => (
              <CustomRadioBasic
                key={index}
                data={item}
                name={`custom-radios-address ${index}`}
                selected={selectedBasicRadio}
                gridProps={{ sm: 6, xs: 12 }}
                handleChange={handleBasicRadioChange}
              />
            ))}
          </Grid>
          <Button variant="tonal" sx={{ mt: 4 }} onClick={handleAddNewAddress}>
            {t("Add new address")}
          </Button>
          {/* //*Delivery */}
          {/* <Typography variant="h6" sx={{ mt: 6, mb: 4 }}>
            {t("Choose Delivery Speed")}
          </Typography>
          <Grid container spacing={4}>
            {dataIcons.map((item, index) => (
              <CustomRadioIcons
                key={index}
                data={item}
                icon={icons[index].icon}
                selected={selectedIconRadio}
                name="custom-radios-delivery"
                gridProps={{ sm: 4, xs: 12 }}
                iconProps={icons[index].iconProps}
                handleChange={handleIconRadioChange}
              />
            ))}
          </Grid> */}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography sx={{ mb: 4 }} variant="h6">
                {t("Estimated Delivery Date")}
              </Typography>
              <List>
                {cartIsLoading ? (
                  <ListItem sx={{ my: 2 }}>
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
                  cartData?.data?.products?.length > 0 &&
                  cartData?.data?.products?.map((item, idx) => (
                    <ListItem
                      key={idx}
                      sx={{ boxShadow: 1, borderRadius: 3, my: 2 }}
                    >
                      <ListItemAvatar
                        key={item?.id}
                        sx={{
                          display: "flex",
                          borderRadius: 3,
                          width: "20%",
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
                      <Grid container sx={{ mx: 1 }}>
                        <Grid item xs={12} md={8}>
                          <Link
                            to={`/store/product/${item?.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemText primary={item?.name} />
                          </Link>

                          <Box sx={{ display: "flex" }}>
                            <Typography sx={{ color: "text.main" }}>
                              {item?.price}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
            <Divider sx={{ m: "0 !important" }} />
            <CardContent>
              <Typography sx={{ mb: 4 }} variant="h6">
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
                  <Typography>{t("Order Total")}</Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    $1198.00
                  </Typography>
                </Box>
                <Box
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
                      $5.00
                    </Typography>
                    <Chip
                      rounded
                      size="small"
                      skin="light"
                      color="success"
                      label="Free"
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
            <Divider sx={{ m: "0 !important" }} />
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
                  {cartData?.data?.sub_total}
                </Typography>
              </Box>
            </CardContent>
          </Card>
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
              sx={{ borderRadius: 3, boxShadow: 3 }}
            >
              {t("Place Order")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepAddress;
