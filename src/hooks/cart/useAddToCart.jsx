import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { _cart } from "api/cart/_cart";
import { _currencies } from "api/country/country";

export const useAddToCart = (coupon_code) => {
  const { t } = useTranslation("index");
  const [loadingCart, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  // fetch currencies once
  const fetchCurrencies = useCallback(async () => {
    try {
      const res = await _currencies.getAll();
      if (res?.data) setCurrencies(res.data);
      return res?.data || [];
    } catch (err) {
      console.error("Failed to fetch currencies", err);
      return [];
    }
  }, []);

  const userData = localStorage.getItem("userData");
  const user_data = userData ? JSON.parse(userData) : null;

  const handleAddToCart = useCallback(
    async (productId) => {
      if (!selectedVariant) {
        Swal.fire({
          icon: "warning",
          title: t("Please select a variant first"),
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          customClass: { container: "custom-swal" },
        });
        return;
      }

      setLoading(true);

      // Ensure currencies are loaded
      let currencyList = currencies;
      if (!currencyList.length) {
        currencyList = await fetchCurrencies(); // wait until currencies are fetched
      }

      const cart_id = localStorage.getItem("cart_id");
      const currencyName = selectedVariant?.currency?.name;
      const currencyObj = currencyList.find(
        (c) => c.name.toLowerCase() === currencyName?.toLowerCase()
      );
      const currency_id = currencyObj?.id || 1; // fallback

      const data = {
        currency_id,
        user_id: user_data ? user_data?.id : null,
        products: [
          { 
            variant_id: selectedVariant?.id,
            id: productId,
            qty: 1,
          },
        ],
      };

      try {
        const res = await _cart.AddToCart({ data, cart_id });

        if (!cart_id && res?.data?.id) {
          localStorage.setItem("cart_id", res.data.id);
        }

        if (res?.code === 200) {
          const currentCartCount =
            parseInt(localStorage.getItem("cart_count")) || 0;
          localStorage.setItem("cart_count", currentCartCount + 1);

          Swal.fire({
            icon: "success",
            title: t("Added To Cart Successfully"),
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 5000,
            customClass: { container: "custom-swal" },
          });
        } else {
          const message = res?.error?.message || t("An error occurred");
          const errors = res?.error?.errors || {};
          const errorMessage =
            Object.keys(errors).length > 0
              ? message + " - " + Object.values(errors).flat().join(", ")
              : message;

          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 8000,
            customClass: { container: "custom-swal" },
          });
        }
      } catch (err) {
        console.error("AddToCart Error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: t("An unexpected error occurred. Please try again."),
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 5000,
          customClass: { container: "custom-swal" },
        });
      } finally {
        setLoading(false);
      }
    },
    [selectedVariant, currencies, fetchCurrencies, t]
  );

  return {
    loadingCart,
    handleAddToCart,
    setSelectedVariant,
    selectedVariant,
  };
};
