import { _show_product } from "api/Product/show_product";
import { useQuery } from "react-query";

export const useGetAccourdion = (id) => {
  const { data, isLoading } = useQuery(
    ["product-acc", id], // ✅ use a stable key array
    () => _show_product.acc(id),
    {
      keepPreviousData: true,
      enabled: !!id, // ✅ only fetch if id exists
    }
  );
  return {
    data,
    isLoading,
  };
};