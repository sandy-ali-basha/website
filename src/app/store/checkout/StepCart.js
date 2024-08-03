import { Link, useNavigate } from "react-router-dom";

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
import { styled, useTheme } from "@mui/material/styles";
import { Chip, Container, TextField } from "@mui/material";
import CustomTextField from "components/customs/CustomTextField";
// ** Icon Imports
import Icon from "components/modules/icon";
import { useTranslation } from "react-i18next";
import { _AuthApi } from "api/auth";

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
  // ** Hooks
  const theme = useTheme();
  const breakpointMD = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "lg")
  );
  const { t } = useTranslation("index");
  const navigate = useNavigate();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t("My Shopping Bag")} (2 {t("Items")})
          </Typography>
          <StyledList>
            <ListItem sx={{ boxShadow: 3, borderRadius: 3, my: 2 }}>
              <ListItemAvatar
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
                  src="https://picsum.photos/150"
                  alt="Google Home"
                />
              </ListItemAvatar>
              <IconButton
                size="small"
                className="remove-item"
                sx={{ color: "text.primary" }}
              >
                <Icon icon="tabler:x" fontSize={20} />
              </IconButton>
              <Grid container sx={{ mx: 2 }}>
                <Grid item xs={12} md={8}>
                  <ListItemText primary="Google - Google Home - White" />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ mr: 2, color: "text.disabled" }}>
                      {t("Sold By")}:
                    </Typography>
                    <Typography
                      href="/"
                      component={Link}
                      onClick={(e) => navigate("/store/categories/brand/6")}
                      sx={{
                        mr: 2,
                        color: "primary.main",
                        textDecoration: "none",
                      }}
                    >
                      google
                    </Typography>
                    <Chip
                      rounded
                      size="small"
                      skin="light"
                      color="success"
                      label="In Stock"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} sx={{ mt: [4, 4, 6] }}>
                  <Box
                    sx={{
                      gap: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", md: "flex-end" },
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Typography sx={{ color: "primary.main" }}>
                        $299
                      </Typography>
                      <Typography
                        sx={{
                          color: "text.disabled",
                          textDecoration: "line-through",
                          mx: 1,
                        }}
                      >
                        /$359
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: "2",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextField size="small" type="number" defaultValue="1" />
                    <Button variant="outlined" size="small" color="secondary">
                      {t("Move to wishlist")}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          </StyledList>
          <Box
            sx={{
              px: 5,
              gap: 2,
              py: 2.5,
              display: "flex",
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              href="/"
              component={Link}
              onClick={(e) => e.preventDefault()}
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("Add more products from wishlist")}
            </Typography>
            <Icon
              icon={
                theme.direction === "ltr"
                  ? "tabler:chevron-left"
                  : "tabler:chevron-right"
              }
            />
          </Box>
        </Grid>
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
                  <Typography>Bag Total</Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    $1198.00
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
                    href="/"
                    variant="h6"
                    component={Link}
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
                  <Typography>Order Total</Typography>
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

            <Divider sx={{ my: "0 !important" }} />
            <CardContent>
              <Typography sx={{ mb: 1 }} variant="h6">
                {t("coupon")}
              </Typography>
              <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  size="small"
                  sx={{ mr: 2 }}
                  placeholder="Enter Promo Code"
                />
                <Button variant="outlined">{t("Apply")}</Button>
              </Box>
              <Typography sx={{ mb: 1 }} variant="h6">
                {t("Points")}
              </Typography>
              <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  size="small"
                  sx={{ mr: 2 }}
                  type="number"
                  placeholder="Enter points"
                />
                <Button variant="outlined">{t("Apply")}</Button>
              </Box>
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
                <Typography sx={{ fontWeight: 500 }}>$1198.00</Typography>
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
      </Grid>
    </Container>
  );
};

export default StepCart;
