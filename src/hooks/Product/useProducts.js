import { _ProductApi } from "api/Product/product";
import { useQuery } from "react-query";

export const useProducts = (body) => {
  const { data, isLoading } = useQuery(
    ["product", body],
    () => _ProductApi.filter(body).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
