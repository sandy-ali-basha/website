import { _Brands } from "api/brand/brands";
import { useQuery } from "react-query";

export const useBrand = () => {
  const { data, isLoading } = useQuery(
    ["_Brands"],
    () => _Brands.getBrands().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
