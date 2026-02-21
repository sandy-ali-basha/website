import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _Home = {
  settings: async () => {
    return _axios
      .get(`/home/settings`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  tabs: async () => {
    return _axios
      .get(`/home/tabs`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },

  tabs: async () => {
    return _axios
      .get(`/home/tabs`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },

  slider: async () => {
    return _axios
      .get(`/home/slides`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },

  getMultiLinksBanners: () =>
    _axios
      .get("home/multi-link-banners", {
        headers: {
          translations: "true",
        },
      })
      .then((res) => res.data?.data[0]),

  getShowHideSections: async () => {
    try {
      const res = await _axios.get("/feature-flags");
      return res.data?.data;
    } catch (error) {
      console.error("Failed to get feature flags:", error);
      throw error;
    }
  },

  getSection: ({ id }) =>
    _axios.get("home_page/section/" + id).then((res) => res.data?.data),

  freeShipping: async () => {
    return _axios
      .get(`/home/free_shipping`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
