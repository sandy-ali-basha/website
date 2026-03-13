import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNoOptionsStore } from "store/noOptionsStore";

export default function ProductAddToCart({
  data,
  isLoading,
  loadingCart,
  handleAddToCart,
}) {
  const { t } = useTranslation("index");
const noOptionsForCity = useNoOptionsStore(
    (state) => state.noOptionsForCity
  );
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Button
        size="large"
        sx={{ width: "90%", p: 1, mt: 2, borderRadius: 3 }}
        variant="contained"
        color="secondary"
        onClick={() => handleAddToCart(data?.data?.id)}
        disabled={isLoading || loadingCart || noOptionsForCity}
      >
        {loadingCart ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          <Typography>{t("Add To Cart")}</Typography>
        )}
      </Button>
    </Box>
  );
}
