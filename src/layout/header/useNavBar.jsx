import { Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { settingsStore } from "store/settingsStore";
import CartItem from "components/modules/cart/CartItem";
import { useNavigate } from "react-router-dom";

export const useNavBar = () => {
  const [anchorElCart, setAnchorElCart] = useState(null);
  const { t } = useTranslation("navbar");

  const openCart = Boolean(anchorElCart);

  const navigate = useNavigate();

  const GoToCart = () => {
    return (
      <Button
        sx={{ width: "100%" }}
        variant="outlined"
        onClick={() => navigate("/store/checkout")}
      >
        {t("Show Cart")}
      </Button>
    );
  };

  const CartMenuItems = [
    {
      id: 1,
      label: <CartItem />,
      onClick: () => navigate("/store/checkout"),
    },
    {
      id: 2,
      label: <CartItem />,
      onClick: () => navigate("/store/checkout"),
    },
    {
      id: 3,
      label: <CartItem />,
      onClick: () => navigate("/store/checkout"),
    },
    {
      id: 4,
      label: <GoToCart />,
      onClick: () => navigate("/store/checkout"),
    },
  ];

  const settings = [
    {
      id: 2,
      label: t("My account"),
      onClick: () => navigate("/profile/account"),
    },
    {
      id: 3,
      label: t("Change Password"),
      onClick: () => navigate("/profile/security"),
    },
    { id: 4, label: t("Billing"), onClick: () => navigate("/profile/billing") },
    {
      id: 5,
      label: t("My Addresses"),
      onClick: () => navigate("/profile/addresses"),
    },
    {
      id: 6,
      label: t("My Orders"),
      onClick: () => navigate("/profile/orders"),
    },
    { id: 7, label: t("Login"), onClick: () => navigate("/Login") },
  ];

  const pages = [
    { id: "0", onClick: () => navigate("/"), label: t("Home") },
    {
      id: "1",
      onClick: () => navigate("/store/categories"),
      label: t("Products"),
    },
    { id: "2", onClick: () => navigate("/about"), label: t("About Us") },
    { id: "3", onClick: () => navigate("/careers"), label: t("Careers") },
    {
      id: "4",
      onClick: () => navigate("/store/offers"),
      label: t("Special Offers"),
    },
    { id: "5", onClick: () => navigate("/contact-us"), label: t("Contact Us") },
  ];

  return {
    CartMenuItems,
    settings,
    pages,
  };
};
