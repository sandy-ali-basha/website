import { Link } from "react-router-dom";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Card, Container, TextField } from "@mui/material";
import { ValueStore } from "store/categoryStore";
import { useTranslation } from "react-i18next";
import { CreditCard, Money } from "@mui/icons-material";
import { useCart } from "hooks/cart/useCart";

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

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          {/* <Alert
          severity="success"
          icon={<Icon icon="tabler:bookmarks" />}
          sx={{ mb: 4, borderRadius: 3 }}
        >
          <AlertTitle>Back Offers</AlertTitle>
          <div>
            <Typography sx={{ color: "success.main" }}>
              - 10% Instant Discount on Bank of America Corp Bank Debit and
              Credit cards
            </Typography>
          </div>
        </Alert> */}
          <TabContext value={value}>
            <CustomTabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="customized tabs example"
            >
              <Tab value="fib" label="Card" />
              <Tab value="cash-in-hand" label="Cash On Delivery" />
              {/* <Tab value="gc" label="Gift Card" /> */}
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
                    {t("Pay With Card")}
                  </Button>
                </TabPanel>
                <TabPanel
                  value="cash-in-hand"
                  sx={{ px: 3, borderRadius: 3, boxShadow: 3 }}
                >
                  <Money />
                  <Typography sx={{ mb: 4 }}>
                    Cash on Delivery is a type of payment method where the
                    recipient make payment for the order at the time of delivery
                    rather than in advance.
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
                  <Typography>{t("Bag Total")}</Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {cartData?.data?.discount_amount > 0
                      ? cartData?.data?.sub_total_after_points
                      : cartData?.data?.sub_total}{" "}
                    IQD
                  </Typography>
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
                    <Typography>{t("Coupon Discount")}</Typography>
                    <Typography variant="h6" sx={{ color: "primary.main" }}>
                      {cartData?.data?.sub_total_after_discount}
                    </Typography>
                  </Box>
                )}
                {/* points_used */}
                {cartData?.data?.points_used > 0 && (
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
                      {cartData?.data?.sub_total_after_points}
                    </Typography>
                  </Box>
                )}

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
                    {t("well be calculating in the next step")}
                  </Box>
                </Box>
              </Box>
            </CardContent>
            <Divider sx={{ my: "0 !important" }} />
            <CardContent>
              <Box
                sx={{
                  mb: 4,
                  rowGap: 1,
                  columnGap: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>Total</Typography>
                <Typography sx={{ fontWeight: 500 }}>$1198.00</Typography>
              </Box>
              <Box
                sx={{
                  mb: 4,
                  rowGap: 1,
                  columnGap: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Deliver to:</Typography>
                <Chip
                  rounded
                  size="small"
                  skin="light"
                  color="primary"
                  label="Home"
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontWeight: 500 }}>
                  John Doe (Default),
                </Typography>
                <Typography>4135 Parkway Street,</Typography>
                <Typography>Los Angeles, CA, 90017.</Typography>
                <Typography sx={{ mb: 4 }}>Mobile : +1 906 568 2332</Typography>
              </Box>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepPayment;
