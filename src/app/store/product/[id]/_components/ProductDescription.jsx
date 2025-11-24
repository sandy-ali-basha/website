import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import CardShimmer from "components/customs/loaders/CardShimmer";
import { useTranslation } from "react-i18next";

export default function ProductDescription({ data, isLoading, theme }) {
  const product = data?.data;
  const { t } = useTranslation("index");
  return (
    <>
      <Box sx={{ mx: 2 }}>
        {isLoading ? (
          <CardShimmer style={{ width: "80%", height: "50px" }} />
        ) : (
          <>
            <Typography sx={{ py: 2 }} fontWeight="bold">
              {t("Description")}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </>
        )}
      </Box>

      <Box sx={{ px: 2 }}>
        {product?.properties?.map((item, idx) => (
          <Chip key={idx} label={item.title} sx={{ m: 1 }} />
        ))}
      </Box>
    </>
  );
}
