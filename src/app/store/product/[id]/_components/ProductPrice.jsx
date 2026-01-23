import React from "react";
import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PaidRounded } from "@mui/icons-material";

export default function ProductPrice({ variant }) {

  const { t } = useTranslation("index");
  if (!variant) return null;
  const start = variant?.compare_price_start_date
    ? new Date(variant.compare_price_start_date)
    : null;

  const end = variant?.compare_price_end_date
    ? new Date(variant.compare_price_end_date)
    : null;

  const now = new Date();

  const isValidDateRange =
    start instanceof Date &&
    end instanceof Date &&
    !isNaN(start) &&
    !isNaN(end);

  const isActiveDiscount =
    variant.compare_price &&
    variant.compare_price < variant.price &&
    isValidDateRange &&
    now >= start &&
    now <= end;

  // Calculate time left
  let timeLeft = "";
  if (isActiveDiscount) {
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    if (days > 0) {
      timeLeft = `${days}d ${hours}h`;
    } else {
      timeLeft = `${hours}h ${minutes}m`;
    }
  }

  return (
    <Box sx={{ mt: 1 }}>
      {/* Compare Price */}
      {variant.compare_price > 0 && isActiveDiscount && (
        <Typography
          component="span"
          variant="h6"
          sx={{
            textDecoration: "line-through",
            color: "text.disabled",
            mr: 1,
          }}
        >
          {variant.compare_price} {variant.currency?.code}
        </Typography>
      )}

      {/* Main Price */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, display: "inline-block" }}
      >
        {variant.price} {variant.currency?.code}
      </Typography>

      {/* Discount Timer */}
      {variant.compare_price > 0 && isActiveDiscount && (
        <Typography
          variant="body2"
          sx={{ color: "error.main", fontWeight: 500, mt: 0.5 }}
        >
          {t("Discount ends in")}: {timeLeft}
        </Typography>
      )}
      {variant?.points > 0 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "inline-flex", gap: 1, my: 2, px: 2 }}
        >
          <PaidRounded color="warning" /> {t("you earn")} {variant?.points}{" "}
          {t("points by purchasing this product")}
        </Typography>
      )}
    </Box>
  );
}
