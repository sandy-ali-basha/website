import { useQuery } from "react-query";

import { _show_product } from "api/Product/show_product";

export const useShowProduct = (id) => {
    const { data, isLoading } = useQuery(
        [`product/${id}`],
        () => _show_product.index(id).then((res) => res),
        {
            keepPreviousData: true,
        }
    );
    return {
        data,
        isLoading,
    };
};
