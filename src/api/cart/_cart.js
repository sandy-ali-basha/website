import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
export const _cart = {
  index: async (id) => {
    try {
      const response = await _axios.get(`/cart/${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      throw error;
    }
  },

  uploadData: async ({ data, quantity, product_id, color, size }) => {
    const encodedColor = encodeURIComponent(color);
    return _axios
      .get(
        `user/cart/addProduct/${product_id}?quantity=${quantity}&size=${size}&color=${encodedColor}`,
        data
      )
      .then((res) => res.data);
  },

  AddToCart: async ({ data, cart_id }) => {
    return _axios
      .post(`cart${cart_id ? "/" + cart_id : ""}`, data)
      .then((res) => res.data);
  },

  delete: async ({ id, color, size }) => {
    const encodedColor = encodeURIComponent(color);
    return _axios
      .delete(
        `/user/cart/removeProduct/${id}?color=${encodedColor}&size=${size}`
      )
      .then((res) => res.data);
  },
  increas: async ({ id, color, size }) => {
    const encodedColor = encodeURIComponent(color);
    return _axios
      .delete(
        `/user/cart/increaseProduct/${id}?color=${encodedColor}&size=${size}`
      )
      .then((res) => res.data);
  },

  Minus: async ({ id, color, size }) => {
    const encodedColor = encodeURIComponent(color);
    return _axios
      .get(
        `/user/cart/decreaseProduct/${id}?color=${encodedColor}&size=${size}`
      )
      .then((res) => res.data);
  },
};
