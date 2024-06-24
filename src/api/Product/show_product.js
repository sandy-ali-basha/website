import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _show_product = {
    index: async (id) => {
        return _axios
            .get(
                `user/product/${id}`, {
                headers: {
                    lang: ["en", "ar"].includes(
                        localStorage.getItem("i18nextLng")
                    )
                        ? localStorage.getItem("i18nextLng")
                        : "en",
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data.product);
    },
};