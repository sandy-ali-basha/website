import { _cart } from "api/cart/_cart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
const { Typography, Box, TextField, Button, Alert } = require("@mui/material");

const ApplyPoints = ({ points }) => {
  const { t } = useTranslation("index");
  const [couponCode, setCouponCode] = useState();
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState();
  const ApplyPoint = () => {
    const data = {
      cart_id: localStorage.getItem("cart_id"),
      points_to_use: couponCode,
    };
    _cart.points({ data }).then((res) => {
      if (res?.code === 200) {
        queryClient.invalidateQueries("cart");
      } else
        setAlert(
          res?.error?.errors.length > 0
            ? res?.error?.errors?.points_to_use[0]
            : res?.error?.message || t("something went wrong")
        );
    });
  };
  return (
    <>
      <Typography sx={{ mb: 1 }} variant="h6">
        {t("Points")}
      </Typography>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          size="small"
          sx={{ mr: 2 }}
          placeholder={t("Enter Points")}
          type="number"
          onChange={(e) => setCouponCode(e.target.value)}
        />

        <Button
          disabled={!couponCode}
          onClick={() => ApplyPoint()}
          variant="outlined"
        >
          {t("Apply")}
        </Button>
      </Box>
      {alert && <Alert severity="error">{alert}</Alert>}
    </>
  );
};
export default ApplyPoints;
