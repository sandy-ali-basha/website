import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _addresses = {
  index: async () => {
    return _axios
      .get(`/addresses`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  get: async (id) => {
    return _axios
      .get(`/addresses/${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  order: (data) => _axios.post("/order", data).then((res) => res.data),

  delete: (id) => _axios.delete(`/addresses/${id}`).then((res) => res.data),

  update: ({ editedID, formData, loading, setLoading, setOpen }) =>
    _axios.post(`/addresses/${editedID}`, formData).then((res) => {
      setLoading(false);
      setOpen(false);
    }),

  post: ( data ) =>
    _axios.post(`/addresses`, data).then((res) => res?.data),
};
