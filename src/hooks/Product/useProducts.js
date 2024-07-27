import { _ProductApi } from "api/Product/product";
import { useQuery } from "react-query";

export const useProducts = ({ price0, price1 }) => {
  const { data, isLoading } = useQuery(
    ["product", price0, price1],
    () => _ProductApi.index({ price0, price1 }).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
