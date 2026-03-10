import React, { useState, useMemo, useRef, useEffect } from "react";
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
import { useQuery } from "react-query";
import ProductPrice from "./ProductPrice";
import { _cities } from "api/country/country";
import { useSelectedCity } from "hooks/useSelectedCity";

export default function ProductVariants({
  variants = [],
  onSelect,
  selectedVariantProp = null,
  isLoading,
}) {
  const { t } = useTranslation("index");

  const [localSelected, setLocalSelected] = useState(null);
  const initCalledRef = useRef(false);

  /* =========================
     Fetch City Name
  ========================== */
  const cityId = useSelectedCity();

  const { data: localCityName, isLoading: cityLoading } = useQuery(
    ["city-name", cityId],
    async () => {
      if (!cityId) return null;

      const storedCityLabel = localStorage.getItem("city_label");
      if (storedCityLabel) return storedCityLabel;

      const res = await _cities.index();
      const cityObj = res?.data?.state?.find((c) => c.id === parseInt(cityId));
      return cityObj?.value || cityObj?.name || null;
    },
    {
      enabled: !!cityId,
      staleTime: Infinity,
    }
  );

  /* =========================
    Filter Variants
  ========================== */
  const filteredVariants = useMemo(() => {
    if (!variants || !localCityName) return [];
    return variants.filter(
      (v) => v.city?.toLowerCase() === localCityName.toLowerCase()
    );
  }, [variants, localCityName]);

  const selectedVariant = selectedVariantProp || localSelected;

  /* =========================
   Init First Variant (by city)
========================== */
  useEffect(() => {
    if (
      isLoading ||
      cityLoading ||
      selectedVariantProp ||
      filteredVariants.length === 0 ||
      initCalledRef.current
    ) {
      return;
    }

    const firstAvailable =
      filteredVariants.find((v) => v.storage_qty > 0) || filteredVariants[0];

    if (firstAvailable) {
      setLocalSelected(firstAvailable);
      onSelect?.(firstAvailable);
      initCalledRef.current = true;
    }
  }, [filteredVariants, isLoading, cityLoading, selectedVariantProp, onSelect]);

  useEffect(() => {
    initCalledRef.current = false;
    setLocalSelected(null);
  }, [localCityName]);

  const handleSelect = (variant) => {
    if (!variant || variant.storage_qty === 0) return;

    if (selectedVariantProp) {
      onSelect?.(variant);
    } else {
      setLocalSelected(variant);
      onSelect?.(variant);
    }
  };

  const showLoading = isLoading || cityLoading;

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {showLoading
          ? t("Loading options...")
          : filteredVariants.length > 0
          ? t("Product Options")
          : t("No Options Available")}
      </Typography>

      <Grid container spacing={2}>
        {showLoading
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
              const isDisabled = variant.storage_qty === 0;

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
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {t("Pack of")} : {variant.unit_quantity}
                        </Typography>

                        <Divider />

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ my: 1, flexWrap: "wrap" }}
                        >
                          {variant.options?.map(
                            (opt, i) =>
                              opt.toLowerCase() !== "default" && (
                                <Chip
                                  key={i}
                                  label={opt}
                                  size="small"
                                  color={isSelected ? "warning" : "default"}
                                  sx={{
                                    textTransform: "capitalize",
                                  }}
                                />
                              )
                          )}
                        </Stack>

                        <ProductPrice variant={variant} />

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            color: isDisabled
                              ? "error.main"
                              : variant.storage_qty < 10
                              ? "warning.main"
                              : "text.secondary",
                          }}
                        >
                          {isDisabled
                            ? t("Out of stock")
                            : variant.storage_qty < 10
                            ? t("Hurry up! Only {{count}} left", {
                                count: variant.storage_qty,
                              })
                            : t("Available: {{count}}", {
                                count: variant.storage_qty,
                              })}
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
