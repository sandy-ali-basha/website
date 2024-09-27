import { Link } from "react-router-dom";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

// ** Icon Imports
import Icon from "components/modules/icon";
import { Chip, Container } from "@mui/material";

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  "& .MuiListItem-root": {
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,

    "&:first-of-type": {
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    "&:last-of-type": {
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
    "&:not(:last-of-type)": {
      borderBottom: 0,
    },
    "& .MuiListItemText-root": {
      marginTop: 0,
      marginBottom: theme.spacing(4),
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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

const HorizontalList = styled(List)(({ theme }) => ({
  padding: 0,
  display: "flex",
  borderRadius: 6,
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiListItem-root": {
    padding: theme.spacing(6),
    "&:not(:last-of-type)": {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  [theme.breakpoints.down("md")]: {
    display: "block",
    "& .MuiListItem-root": {
      "&:not(:last-of-type)": {
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  },
}));

const StepConfirmation = ({ orderResponse }) => {
  // const orderDate = new Date(orderResponse.created_at).toLocaleString();

  const billingAddress = orderResponse.address.find(
    (addr) => addr.type === "billing"
  );
  const shippingAddress = orderResponse.address.find(
    (addr) => addr.type === "shipping"
  );
  const customer = orderResponse.customer[0];
  const items = orderResponse.lines;

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" sx={{ mb: 4 }}>
              Thank You! 😇
            </Typography>
            <Typography sx={{ mb: 4, color: "text.secondary" }}>
              Your order{" "}
              <Box
                href="/"
                component={Link}
                onClick={(e) => e.preventDefault()}
                sx={{ color: "primary.main", textDecoration: "none" }}
              >
                #{orderResponse.reference}
              </Box>{" "}
              has been placed!
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              We sent an email to{" "}
              <Box
                href="/"
                component={Link}
                onClick={(e) => e.preventDefault()}
                sx={{ color: "primary.main", textDecoration: "none" }}
              >
                {billingAddress.contact_email}
              </Box>{" "}
              with your order confirmation and receipt.
            </Typography>
            <Typography sx={{ mb: 4, color: "text.secondary" }}>
              {` If the email hasn't arrived within two minutes, please check your spam folder to see if the email was routed there.`}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& svg": { color: "text.secondary" },
              }}
            >
              {/* <Icon icon="tabler:clock" fontSize={20} /> */}
              {/* <Typography sx={{ ml: 1.5, color: "text.secondary" }}>
                <Typography
                  component="span"
                  sx={{ fontWeight: 500, color: "text.secondary" }}
                >
                  Time placed:
                </Typography>{" "}
                {orderDate}
              </Typography> */}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <HorizontalList>
            {/* Shipping Address */}
            <ListItem
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 1.5, display: "flex" }}>
                  <Icon icon="tabler:map-pin" fontSize={20} />
                </Box>
                <Typography variant="h6">Shipping</Typography>
              </Box>
              <Typography>{`${shippingAddress.first_name} ${shippingAddress.last_name}`}</Typography>
              <Typography>{shippingAddress.line_one}</Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.state},{" "}
                {shippingAddress.postcode}
              </Typography>
              <Typography sx={{ mb: 4 }}>
                {shippingAddress.country?.name}
              </Typography>
              <Typography>{shippingAddress.contact_phone}</Typography>
            </ListItem>

            {/* Billing Address */}
            <ListItem
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 1.5, display: "flex" }}>
                  <Icon icon="tabler:credit-card" fontSize={20} />
                </Box>
                <Typography variant="h6">Billing Address</Typography>
              </Box>
              <Typography>{`${billingAddress.first_name} ${billingAddress.last_name}`}</Typography>
              <Typography>{billingAddress.line_one}</Typography>
              <Typography>
                {billingAddress.city}, {billingAddress.state},{" "}
                {billingAddress.postcode}
              </Typography>
              <Typography sx={{ mb: 4 }}>
                {billingAddress.country?.name}
              </Typography>
              <Typography>{billingAddress.contact_phone}</Typography>
            </ListItem>

            {/* Shipping Method */}
            <ListItem
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 1.5, display: "flex" }}>
                  <Icon icon="tabler:ship" fontSize={20} />
                </Box>
                <Typography variant="h6">Shipping Method</Typography>
              </Box>
              <Typography sx={{ mb: 4, fontWeight: 500 }}>
                Preferred Method:
              </Typography>
              <Typography>Standard Delivery</Typography>
              <Typography>(Normally 3-4 business days)</Typography>
            </ListItem>
          </HorizontalList>
        </Grid>

        {/* Order Items */}
        <Grid item xs={12} md={8} xl={9}>
          <StyledList sx={{ boxShadow: 3 }}>
            {items.map((item) => (
              <ListItem key={item.id}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={8}>
                    <ListItemText primary={item.description} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ mr: 1, color: "text.disabled" }}>
                        Sold By:
                      </Typography>
                      <Typography
                        href="/"
                        component={Link}
                        onClick={(e) => e.preventDefault()}
                        sx={{
                          mr: 4,
                          color: "primary.main",
                          textDecoration: "none",
                        }}
                      >
                        Seller
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    sm={4}
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "flex-start", sm: "flex-end" },
                    }}
                  >
                    <Typography sx={{ color: "primary.main" }}>
                      ${item.unit_price.value / 100}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </StyledList>
        </Grid>

        {/* Price Details */}
        <Grid item xs={12} md={4} xl={3}>
          <Box
            sx={{
              mb: 4,
              borderRadius: 3,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography sx={{ mb: 4 }} variant="h6">
                Price Details
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    mb: 4,
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Order Total</Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    ${orderResponse.sub_total / 100}
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
                  <Typography>Delivery Charges</Typography>
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
                <Typography sx={{ fontWeight: 500 }}>Total</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  ${orderResponse.sub_total / 100}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepConfirmation;
