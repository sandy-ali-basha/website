import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _User = {
  index: async ({ query, page, limit = 10 }) => {
    return _axios
      .get(
        `/admin/user?page=${page}&count=${limit}${query !== "" ? `&search=${query}` : ""
        }`
        , {
          headers: {
            ...HttpRequestInterceptor()
          }
        })
      .then((res) => res.data);
  },
  post: (data, setLoading, navigate) =>
    _axios.post("/user/user", data).then((res) => {
      setLoading(true);
      navigate(-1);
    }),
  delete: (id) => _axios.delete(`/user/user/${id}`).then((res) => res.data),

  update: ({ editedID, formData, loading, setLoading, setOpen }) =>
    _axios.post(`/user/user/${editedID}`, formData).then((res) => {
      setLoading(false);
      setOpen(false);
    }),
};
