import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _ProductApi = {
  index: async ({  price0, price1 }) => {
    try {
      const response = await _axios.get(
        `/product${price0 ? `&price[0]=${price0}` : ""}${
          price1 ? `&price[1]=${price1}` : ""
        }`,
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
