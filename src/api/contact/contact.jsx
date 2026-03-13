import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { _axios } from "../../interceptor/http-config";

export const _contact = {
  post: (data, setLoading) =>
    _axios.post(`/contact`, data).then((res) => {
      setLoading(true);
      return res;
    }),

  index: async () => {
    return _axios
      .get(`/contact_info`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res?.data);
  },

  locations: async () => {
    return _axios
      .get(`/contact_info/locations`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res?.data);
  },
};
