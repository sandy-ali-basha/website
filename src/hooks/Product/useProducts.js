import { _ProductApi } from "api/Product/product";
import { useQuery } from "react-query";

export const useProducts = ({ category, color, size, price0, price1 }) => {
  // const [pages] = shopStore((state) => [
  //   state.pages,
  // ]);
  const { data, isLoading } = useQuery(
    ["product", color, size, price0, price1],
    () => _ProductApi.index({ category, color, size, price0, price1 }).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
