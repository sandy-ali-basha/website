import {
  Box,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const OrderReview = ({ item }) => {
  console.log("item", item);
  const { t } = useTranslation("index");

  const columns = useMemo(() => {
    return [t("Product"), t("Price"), t("Quantity"), t("Total")];
  }, [t]);

  const rows = useMemo(() => {
    return item?.lines?.map((order) => (
      <TableRow key={order.id}>
        <TableCell>{order.description}</TableCell> {/* Product */}
        <TableCell>{order.unit_price.value}</TableCell> {/* Price */}
        <TableCell>{order.unit_quantity}</TableCell> {/* Quantity */}
        <TableCell>{order.total.value}</TableCell> {/* Total */}
      </TableRow>
    ));
  }, [item]);

  return (
    <Box p={3}>
      {/* Order Information and Status */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h4" sx={{ color: "text.main" }}>
          {t("Order")} #{item?.reference ?? "N/A"}
        </Typography>

        {/* Order Status Chips */}
        <Box display="flex" gap={2}>
          <Chip
            label={item?.status}
            color={
              item?.status === "awaiting-payment"
                ? "info"
                : item?.status === "payment-offline"
                ? "primary"
                : "success"
            }
          />
        </Box>
      </Box>

      <Typography color="textSecondary" variant="body1">
        {t("Order Date")}: {item?.order_date ?? "N/A"}{" "}
        {/* Example order date */}
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={8}>
          {/* Products Table */}
          <Box sx={{ px: 2 }}>
            <Typography variant="h6" sx={{ color: "text.main" }} gutterBottom>
              {t("Products")}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </Box>
        </Grid>

        {/* Shipping and Billing Info */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, color: "text.main" }}>
            <Typography variant="h6" gutterBottom>
              {t("Summary")}
            </Typography>
            <Typography>
              {t("Subtotal")}: {item?.sub_total ?? "N/A"}
            </Typography>
            {item?.points_used > 0 && (
              <Typography>
                {t("sub total after points")}:{" "}
                {item?.sub_total_after_points ?? "N/A"}
              </Typography>
            )}
            {item?.tax_total && (
              <Typography>
                {t("Tax")}: {item?.tax_total ?? "N/A"}
              </Typography>
            )}
            {item?.total && (
              <Typography>
                {t("Total")}: {item?.total ?? "N/A"}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, color: "text.main" }}>
            <Typography variant="body1">{t("Shipping Address")}</Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {
                item?.address?.find((addr) => addr.type === "shipping")
                  ?.line_one
              }
              , {item?.address?.find((addr) => addr.type === "shipping")?.city},{" "}
              {item?.address?.find((addr) => addr.type === "shipping")?.state},{" "}
              {
                item?.address?.find((addr) => addr.type === "shipping")
                  ?.postcode
              }
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Email")}:{" "}
              {item?.address?.find((addr) => addr.type === "shipping")
                ?.contact_email ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Phone")}:{" "}
              {item?.address?.find((addr) => addr.type === "shipping")
                ?.contact_phone ?? "N/A"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, color: "text.main" }}>
            <Typography variant="body1">{t("Billing Address")}</Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {item?.address?.find((addr) => addr.type === "billing")
                ?.line_one ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Email")}:{" "}
              {item?.address?.find((addr) => addr.type === "billing")
                ?.contact_email ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Phone")}:{" "}
              {item?.address?.find((addr) => addr.type === "billing")
                ?.contact_phone ?? "N/A"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default OrderReview;
