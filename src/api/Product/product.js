import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _ProductApi = {
  index: async ({ category, color, size, price0, price1, pages }) => {
    const Price = localStorage.getItem("Price");
    try {
      const response = await _axios.get(
        `/product${color ? `&productColors=${color?.id}` : ""}${
          size ? `&productSizes=${size}` : ""
        }${price0 ? `&price[0]=${price0 / Price}` : ""}${
          price1 ? `&price[1]=${price1 / Price}` : ""
        }${category ? `&category_id=${category}` : ""}`,
        {
          headers: {
            ...HttpRequestInterceptor(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
