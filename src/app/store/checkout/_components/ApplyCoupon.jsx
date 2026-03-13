import { _cart } from "api/cart/_cart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Typography, Box, TextField, Button, Alert } from "@mui/material";

const ApplyCoupon = () => {
  const { t } = useTranslation("index");
  const [couponCode, setCouponCode] = useState();
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState();
  const [success, setSuccess] = useState();
  const [appliedCoupon, setAppliedCoupon] = useState();

  const applyCoupone = () => {
    const cart_id = localStorage.getItem("cart_id");
    const data = {
      cart_id: cart_id,
      coupon_code: couponCode,
    };
    
    _cart.coupon({ data }).then((res) => {
      console.log("Coupon response:", res);
      if (res?.code === 200) {
        // Set applied coupon from response
        setAppliedCoupon(res?.data?.coupon_code);
        
        // Invalidate cart query with exact key match
        queryClient.invalidateQueries(["cart", cart_id]);
        setSuccess(true);
        setCouponCode("");
      } else {
        setAlert(res?.error?.errors?.coupon_code?.[0] || res?.message || "Something went wrong");
      }
    }).catch((error) => {
      console.error("Coupon error:", error);
      setAlert(error?.message || "Failed to apply coupon");
    });
  };
  
  return (
    <>
      <Typography sx={{ mb: 1 }} variant="h6">
        {t("coupon")}
      </Typography>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          size="small"
          sx={{ mr: 2 }}
          placeholder={t("Enter Promo Code")}
          value={couponCode || ""}
          onChange={(e) => {
            setCouponCode(e.target.value);
            setAlert(null); // Clear error when user types
          }}
          disabled={success}
        />

        <Button
          disabled={!couponCode || success}
          onClick={() => applyCoupone()}
          variant="outlined"
        >
          {t("Apply")}
        </Button>
      </Box>
      {alert && <Alert severity="error">{alert}</Alert>}
      {success && (
        <Alert severity="success">
          {t("Coupon applied successfully! You have received a discount.")} 
          {appliedCoupon && ` (${appliedCoupon})`}
        </Alert>
      )}
    </>
  );
};
export default ApplyCoupon;
