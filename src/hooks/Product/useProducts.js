import { _ProductApi } from "api/Product/product";
import { useQuery } from "react-query";

export const useProducts = (body) => {
  const { data, isLoading } = useQuery(
    ["products", body],
    () => _ProductApi.filter(body).then((res) => res),
    {
      keepPreviousData: true,
      enabled: !!body,
    }
  );
  return {
    data,
    isLoading,
  };
};

export const useAllProducts = () => {
  const { data, isLoading } = useQuery(
    ["all-products"],
    () => _ProductApi.index().then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
