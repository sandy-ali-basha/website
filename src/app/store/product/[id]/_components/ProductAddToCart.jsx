import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProductAddToCart({
  data,
  isLoading,
  loadingCart,
  handleAddToCart,
}) {
  const { t } = useTranslation("index");

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Button
        size="large"
        sx={{ width: "90%", p: 1, mt: 2, borderRadius: 3 }}
        variant="contained"
        color="secondary"
        onClick={() => handleAddToCart(data?.data?.id)}
        disabled={isLoading}
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
