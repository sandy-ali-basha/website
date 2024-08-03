import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
export const _cart = {
  index: async ({ id }) => {
    return _axios
      .get(`/user/cart?city_id=${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
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
  AddToCart: async ({ data }) => {
    console.log('Sending data:', data);
    return _axios.post(`cart`, data).then((res) => res.data);
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
