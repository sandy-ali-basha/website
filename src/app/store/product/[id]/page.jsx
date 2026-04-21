import React, { useCallback, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

// Custom Hooks
import { useProduct } from "./hooks/useProduct";
import { useSlider } from "./hooks/useSlider";
import { useAddToCart } from "hooks/cart/useAddToCart";
import { useFeatures } from "./hooks/useFeatures";

// Components
import ProductImages from "./_components/ProductImages";
import ProductInfo from "./_components/ProductInfo";
import ProductDescription from "./_components/ProductDescription";
import ProductFeatures from "./_components/ProductFeatures";
import ProductSlider from "./_components/ProductSlider";
import ProductAddToCart from "./_components/ProductAddToCart";
import Simillar from "./_components/Simllar";
import ProductVariants from "./_components/ProductVariants";
import AccordionUsage from "./_components/AccordionUsage";
import { PaidRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function Product() {
  const theme = useTheme();
  const { data, isLoading } = useProduct();
  const { data: Slider, isLoading: SliderLoading } = useSlider();
  const { data: features, isLoading: featuresLoading } = useFeatures();
  const { t } = useTranslation("index");
  const { handleAddToCart, loadingCart, selectedVariant, setSelectedVariant } =
    useAddToCart();

  useEffect(() => window.scrollTo(0, 0), []);

  // stable callback to avoid recreating function each render
  const handleVariantSelect = useCallback(
    (variant) => {
      setSelectedVariant(variant);
    },
    [setSelectedVariant]
  );

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProductImages data={data} />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductInfo
            data={data}
            isLoading={isLoading}
            selectedVariant={selectedVariant}
          />
          <ProductVariants
            isLoading={isLoading}
            variants={data?.data?.variants}
            onSelect={handleVariantSelect}
          />
          {data?.data?.points > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "inline-flex", gap: 1, my: 2, px: 2 }}
            >
              <PaidRounded color="warning" /> {t("you earn")} {data?.data?.points}{" "}
              {t("points by purchasing this product")}
            </Typography>
          )}
          <ProductFeatures features={features} loading={featuresLoading} />
          <ProductAddToCart
            data={data}
            isLoading={isLoading}
            loadingCart={loadingCart}
            handleAddToCart={handleAddToCart}
          />
        </Grid>
      </Grid>

      <Box sx={{ m: 3 }}>
        <ProductDescription data={data} isLoading={isLoading} theme={theme} />
      </Box>
      <Box sx={{ m: 3 }}>
        <AccordionUsage data={data} isLoading={isLoading} />
      </Box>
      <Box sx={{ my: 5, px: 3 }}>
        <ProductSlider Slider={Slider} isLoading={SliderLoading} />
      </Box>

      <Simillar id={data?.data?.id} />
    </Container>
  );
}
