import { _cart } from "api/cart/_cart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export const useAddToCart = (coupon_code) => {
  const { t } = useTranslation("index");
  const [loadingCart, setLoading] = useState(false);
  const cart_id = localStorage.getItem("cart_id");
  const handleAddToCart = (id) => {
    const data = {
      products: {
        [id]: {
          qty: 1,
        },
      },
    };
    console.log("cart_id", cart_id);
    setLoading(true);
    _cart
      .AddToCart({ data, cart_id })
      .then((res) => {
        console.log("res?.data?.id", res?.data?.id);
        if (!cart_id) localStorage.setItem("cart_id", res?.data?.id);

        if (res?.code === 200) {
          Swal.fire({
            icon: "success",
            title: t(t("Added To Cart Successfully")),
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 5000,
            customClass: {
              container: "custom-swal",
            },
          });
        } else {
          const message = res?.error?.message || t("An error occurred");
          const errors = res?.error?.errors || {};
          let errorMessage = message;
          if (Object.keys(errors).length > 0) {
            errorMessage += " - " + Object.values(errors).flat().join(", ");
          }
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 8000,
            customClass: {
              container: "custom-swal",
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: t("An unexpected error occurred. Please try again."),
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 5000,
          customClass: {
            container: "custom-swal",
          },
        });
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  return {
    loadingCart,
    handleAddToCart,
  };
};
