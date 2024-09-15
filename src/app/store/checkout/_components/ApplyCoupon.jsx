import { _cart } from "api/cart/_cart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";

const { Typography, Box, TextField, Button } = require("@mui/material");

const ApplyCoupon = () => {
  const { t } = useTranslation("index");
  const [couponCode, setCouponCode] = useState();
  const queryClient = useQueryClient();

  const applyCoupone = () => {
    const data = {
      cart_id: localStorage.getItem("cart_id"),
      coupon_code: couponCode,
    };
    _cart.coupon({ data }).then((res) => {
      if (res?.code === 200) {
        queryClient.invalidateQueries("cart");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "applied successfully",
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
          text: res?.errors?.errors?.coupon_code[0],
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
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
          placeholder="Enter Promo Code"
          onChange={(e) => setCouponCode(e.target.value)}
        />

        <Button
          disabled={!couponCode}
          onClick={() => applyCoupone()}
          variant="outlined"
        >
          {t("Apply")}
        </Button>
      </Box>
    </>
  );
};
export default ApplyCoupon;
