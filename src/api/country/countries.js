
    import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
    import { _axios } from "../../interceptor/http-config";

export const _countries = {

    index: async (id) => {
        return _axios
            .get(
                `/regions`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },
};