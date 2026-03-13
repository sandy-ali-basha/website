import React, { useMemo } from "react";
import { Box, Typography, Chip } from "@mui/material";
import CardShimmer from "components/customs/loaders/CardShimmer";
import { PaidRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import Seo from "components/Seo";

export default function ProductInfo({ data, isLoading, selectedVariant }) {
  const { t } = useTranslation("index");
  const navigate = useNavigate();
  const product = data?.data;

  // Choose which data to show — variant overrides product
  const displayData = useMemo(() => {
    if (selectedVariant) {
      return {
        name: product?.name,
        price: selectedVariant,
        compare_price: selectedVariant.compare_price,
        points: selectedVariant.points,
        brand: product?.brand,
        product_type: product?.product_type,
        attributes: product?.attributes,
      };
    }
    return product;
  }, [product, selectedVariant]);

  const uniqueAttributes = useMemo(() => {
    const attrs = displayData?.attributes || [];
    const seen = new Set();
    return attrs.filter((item) => {
      const value = item?.value;
      if (!value || seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }, [displayData?.attributes]);

  if (!product) return null;

  return (
    <>
      <Seo
        title={product?.name || "Product"}
        description={
          product?.short_description ||
          product?.description?.replace(/<[^>]*>?/gm, "").slice(0, 160)
        }
        keywords={product?.tags?.map((tag) => tag.name).join(", ")}
        image={product?.images?.[0]?.url}
        type="product"
      />
      {/* Name */}
      {isLoading ? (
        <CardShimmer />
      ) : (
        <Typography
          sx={{ px: 2 }}
          color="initial"
          variant="h5"
          fontWeight="bold"
        >
          {displayData?.name}
        </Typography>
      )}

      {/* Pricing */}
      <Box sx={{ display: "flex", my: 1, px: 2, flexWrap: "wrap", gap: 1 }}>
        <Typography variant="h4">{t("Price")} :</Typography>{" "}
        <ProductPrice variant={displayData?.price} />
      </Box>

      {/* Brand & Attributes */}
      <Box sx={{ display: "flex", my: 1, px: 2, flexWrap: "wrap" }}>
        {displayData?.brand && (
          <Chip
            onClick={() =>
              navigate(`/store/categories/brand/${displayData?.brand?.id}`)
            }
            label={displayData?.brand?.name}
            sx={{ m: 1 }}
          />
        )}

        {displayData?.product_type && (
          <Chip
            label={displayData?.product_type?.name}
            sx={{ m: 1 }}
            variant="outlined"
          />
        )}

        {uniqueAttributes.map((item, idx) => (
          <Chip
            key={idx}
            label={item.value}
            sx={{ m: 1 }}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </>
  );
}

