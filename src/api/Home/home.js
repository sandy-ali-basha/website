import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _Home = {
  category: async () => {
    return _axios.get(`/user/get-category`, {
      headers: {
        ...HttpRequestInterceptor()
      }
    }).then((res) => res.data);
  },
  heroImage: async () => {
    return _axios.get(`/user/heroImage`).then((res) => res.data);
  },
};
