// ** MUI Imports
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Chip, Container, TextField } from "@mui/material";
import { ValueStore } from "store/categoryStore";
import { useTranslation } from "react-i18next";
import { CreditCard, Money, MoneyRounded, QrCode } from "@mui/icons-material";
import { useCart } from "hooks/cart/useCart";
import { AddressStore } from "store/shippingStore";
import Loader from "components/modules/Loader";

const CustomTabList = styled(Tabs)(({ theme }) => ({
  borderBottom: "0 !important",
  "&, & .MuiTabs-scroller": {
    boxSizing: "content-box",
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`,
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    minWidth: 81,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const StepPayment = ({ handleNext }) => {
  // ** State
  const [value, setValue] = ValueStore((state) => [
    state.value,
    state.setValue,
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { t } = useTranslation("index");
  const cart_id = localStorage.getItem("cart_id");
  const { data: cartData, isLoading: cartIsLoading } = useCart(cart_id);

  const shippingAddress = AddressStore((state) => state.shippingAddress);

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" sx={{ ms: 5, mb: 3 }} color="text.primary">
            {t("Pleas Choose Payment method")}
          </Typography>
          <TabContext value={value} sx={{ px: 5 }}>
            <CustomTabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="customized tabs example"
            >
              <Tab
                value="fib"
                label={t("FIB")}
                icon={<QrCode sx={{ fontSize: "4rem" }} />}
              />
              <Tab
                value="cash-in-hand"
                label={t("Cash On Delivery")}
                icon={<MoneyRounded sx={{ fontSize: "4rem" }} />}
              />
              {/* <Tab value="gc" label={t("Gift Card")} /> */}
            </CustomTabList>
            <Grid container sx={{ mt: 2 }}>
              <Grid item md={8} xs={12}>
                <TabPanel
                  value="fib"
                  sx={{ px: 3, borderRadius: 3, boxShadow: 3 }}
                >
                  <CreditCard />
                  <Typography sx={{ mb: 4 }}>
                    {t(
                      "card is a type of payment method where the recipient make payment for the order at the time of delivery rather than in advance."
                    )}
                  </Typography>
                  <Button variant="contained" onClick={handleNext}>
                    {t("Pay With FIB")}
                  </Button>
                </TabPanel>
                <TabPanel
                  value="cash-in-hand"
                  sx={{ px: 3, borderRadius: 3, boxShadow: 3 }}
                >
                  <Money />
                  <Typography sx={{ mb: 4 }}>
                    {t(
                      "Cash on Delivery is a type of payment method where the recipient make payment for the order at the time of delivery rather than in advance."
                    )}
                  </Typography>
                  <Button variant="contained" onClick={handleNext}>
                    {t("Pay On Delivery")}
                  </Button>
                </TabPanel>
                {/*//* Gift Card  */}
                <TabPanel
                  value="gc"
                  sx={{ px: 3, borderRadius: 3, boxShadow: 3 }}
                >
                  <Typography sx={{ mb: 4, fontWeight: 500 }}>
                    Enter Gift Card Details
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Gift Card Number"
                        placeholder="Gift Card Number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Gift Card Pin"
                        placeholder="Gift Card Pin"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={handleNext}>
                        Redeem Gift Card
                      </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography sx={{ mb: 4 }} variant="h6">
                {t("Price Details")}
              </Typography>
              {cartIsLoading ? (
                <Loader />
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/* bag total */}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {/* bag total */}
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
                      <Typography>{t("Sub Total")}</Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {(cartData?.data?.sub_total / 1000).toFixed(3)}{" "}
                        {t("currency")}
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
                        }}
                      >
                        {shippingAddress?.shipping_price > 0 && (
                          <div>
                            {(shippingAddress?.shipping_price / 1000).toFixed(
                              3
                            )}
                            {t("currency")}
                          </div>
                        )}
                        {shippingAddress?.shipping_price === 0 && (
                          <Chip color="success" label={t("FREE")}></Chip>
                        )}
                      </Box>
                    </Box>
                    {/* discount_amount */}
                    {cartData?.data?.discount_amount > 0 && (
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
                        <Typography
                          variant="body1"
                          sx={{ color: "primary.main" }}
                        >
                          {cartData?.data?.sub_total_after_discount}
                        </Typography>
                      </Box>
                    )}
                    {/* points_used */}
                    {cartData?.data?.points_used > 0 && (
                      <Box
                        sx={{
                          my: 2,
                          gap: 2,
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>
                          {t("Sub Total After Points Used")}
                        </Typography>
                        <Typography variant="body1" color="secondary">
                          {(
                            cartData?.data?.sub_total_after_points / 1000
                          ).toFixed(3)}{" "}
                          {t("currency")}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>

            <CardContent>
              <Box
                sx={{
                  mb: 4,
                  rowGap: 1,
                  columnGap: 4,
                }}
              >
                <Typography sx={{ color: "primary.main" }}>
                  {"Deliver to"}:
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {shippingAddress?.title}
                </Typography>
                {shippingAddress?.content}
              </Box>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepPayment;
