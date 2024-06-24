import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
export const _cart = {
    index: async ({ session_id, id }) => {
        return _axios
            .get(
                `/user/cart?s_id=${session_id}&city_id=${id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },

    uploadData: async ({ data, quantity, session_id, product_id, color,
        size }) => {
        const encodedColor = encodeURIComponent(color);
        return _axios
            .get(`user/cart/addProduct/${product_id}?s_id=${session_id}&quantity=${quantity}&size=${size}&color=${encodedColor}`, data)
            .then((res) => res.data)
    },

    delete: async ({ id, session_id, color, size }) => {
        const encodedColor = encodeURIComponent(color);
        return _axios.delete(`/user/cart/removeProduct/${id}?s_id=${session_id}&color=${encodedColor}&size=${size}`)
            .then((res) => res.data);
    },
    increas: async ({ id, session_id, color, size }) => {
        const encodedColor = encodeURIComponent(color);
        return _axios.delete(`/user/cart/increaseProduct/${id}?s_id=${session_id}&color=${encodedColor}&size=${size}`)
            .then((res) => res.data);
    },

    Minus: async ({ id, session_id, color, size }) => {
        const encodedColor = encodeURIComponent(color);
        return _axios.get(`/user/cart/decreaseProduct/${id}?s_id=${session_id}&color=${encodedColor}&size=${size}`)
            .then((res) => res.data);
    }


};
