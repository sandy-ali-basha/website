import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
const session_id = localStorage.getItem("session_id");

export const _get_order = {
    index: async () => {
        return _axios
            .get(
                `/user/get-order?s_id=${session_id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },
    myOrder: async (id) => {
        return _axios
            .get(
                `/user/get-order/${id}?s_id=${session_id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },
    show: async (id) => {
        return _axios
            .get(
                `/user/order/${id}?s_id=${session_id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },
}