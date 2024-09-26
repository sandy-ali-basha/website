
    import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
    import { _axios } from "../../interceptor/http-config";

export const _cities = {

    index: async (id) => {
        return _axios
            .get(
                `/cities`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },
    viewCity: async (id) => {
        return _axios
            .get(
                `/user/cities?country_id=${id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },

};