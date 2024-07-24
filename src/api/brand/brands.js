import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { _axios } from "../../interceptor/http-config";

export const _Brands = {
  getBrands: async (id) => {
    return _axios
      .get(`/brand`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  getBrand: async (id) => {
    return _axios
      .get(`/brand/${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
