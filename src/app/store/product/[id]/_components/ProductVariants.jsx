import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Skeleton,
  Typography,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ProductPrice from "./ProductPrice";
import { _cities } from "api/country/country";

export default function ProductVariants({
  variants = [],
  loading = false,
  onSelect,
  selectedVariantProp = null,
}) {
  const [localSelected, setLocalSelected] = useState(null);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const initCalledRef = useRef(false);
  const { t } = useTranslation("index");

  // Map city id from localStorage to city name
  const [localCityName, setLocalCityName] = useState(null);

  useEffect(() => {
    const cityId = localStorage.getItem("city");
    if (!cityId) return;

    _cities
      .index()
      .then((cities) => {
        const cityObj = cities?.data?.state.find(
          (c) => c.id === parseInt(cityId)
        );
        if (cityObj) setLocalCityName(cityObj.value);
        console.log("Mapped City Name:", cityObj?.value);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter variants based on city name
  useEffect(() => {
    if (!variants || !localCityName) return;

    const filtered = variants.filter(
      (v) => v.city.toLowerCase() === localCityName.toLowerCase()
    );
    setFilteredVariants(filtered);
    
  }, [localCityName, variants]);

  const selectedVariant = selectedVariantProp || localSelected;

  // Initialize first available variant
  useEffect(() => {
    if (loading) return;
    if (!filteredVariants || filteredVariants.length === 0) return;

    if (selectedVariantProp) return;

    if (!initCalledRef.current) {
      const firstAvailable =
        filteredVariants.find((v) => v.quantity > 0) || filteredVariants[0];
      if (firstAvailable) {
        setLocalSelected(firstAvailable);
        onSelect?.(firstAvailable);
      }
      initCalledRef.current = true;
    }
  }, [filteredVariants, loading, selectedVariantProp, onSelect]);

  const handleSelect = (variant) => {
    if (!variant || variant.quantity === 0) return;

    if (selectedVariantProp) {
      onSelect?.(variant);
      return;
    }

    setLocalSelected(variant);
    onSelect?.(variant);
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {filteredVariants.length > 0
          ? t("Product Options")
          : t("No Options Available")}
      </Typography>

      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Skeleton
                  variant="rectangular"
                  height={130}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : filteredVariants.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              const isDisabled = variant.inventory === 0;

              return (
                <Grid item xs={12} sm={6} md={4} key={variant.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderColor: isSelected ? "primary.main" : "grey.300",
                      opacity: isDisabled ? 0.55 : 1,
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      transition: "all .15s ease",
                    }}
                  >
                    <CardActionArea
                      disabled={isDisabled}
                      onClick={() => handleSelect(variant)}
                    >
                      <CardContent>
                        <Typography
                          variant="body2"
                          sx={{ bg: "text.secondary", mb: 1 }}
                          color="text.primary"
                        >
                          {t("Pack of")} : {variant?.unit_quantity}
                        </Typography>
                        <Divider sx={{ color: "text.secondary" }} />
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ my: 1, flexWrap: "wrap" }}
                        >
                          {variant.options?.map((opt, i) => (
                            <Chip
                              key={i}
                              label={opt}
                              size="small"
                              color={isSelected ? "warning" : "default"}
                              sx={{ textTransform: "capitalize" }}
                            />
                          ))}
                        </Stack>
                        <ProductPrice variant={variant} />

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            color: isDisabled
                              ? "error.main"
                              : variant.inventory < 10
                              ? "warning.main"
                              : "text.secondary",
                          }}
                        >
                          {isDisabled
                            ? "Out of stock"
                            : variant.inventory < 10
                            ? `Hurry up! Only ${variant.inventory} left`
                            : `Available: ${variant.inventory}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
}
