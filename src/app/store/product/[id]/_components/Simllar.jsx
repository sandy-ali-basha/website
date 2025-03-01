import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ProductCard from "components/modules/ProductCard";
import { useSimillerProduct } from "hooks/Product/useSimillerProduct";
import { useTranslation } from "react-i18next";

export default function Simillar({ id }) {
  const { data } = useSimillerProduct(id);

  const { t } = useTranslation("index");
  return (
    <Container>
      {data?.data?.products?.length > 0 && (
        <>
          <Typography sx={{ px: 2, mb: 2, mt: 5 }} variant="h4">
            {t("You May Also Like")}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs="12" md="4">
              {data?.data?.products?.map((item, idx) => (
                <ProductCard
                  productImage={item?.image}
                  productName={item?.name}
                  Price={item?.price?.value}
                  link={`/store/product/${item?.id}/${item.name}`}
                  purchasable={item?.purchasable === "always"}
                  offer={item?.compare_price}
                />
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
