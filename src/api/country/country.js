
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
                `/cities?country_id=${id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },

};
export const _currencies ={
    getAll: async () => {
        return _axios
            .get(
                `/currencies`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },
}