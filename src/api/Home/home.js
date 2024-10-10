import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _Home = {
  settings: async () => {
    return _axios.get(`/home/settings`, {
      headers: {
        ...HttpRequestInterceptor()
      }
    }).then((res) => res.data);
  },
 
  slider: async () => {
    return _axios.get(`/home/slides`, {
      headers: {
        ...HttpRequestInterceptor()
      }
    }).then((res) => res.data);
  },
 
};
