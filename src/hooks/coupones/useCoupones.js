import { _coupones } from "api/coupones/coupones";
import { useQuery } from "react-query";

export const useCoupones = (id) => {
  const { data, isLoading } = useQuery(
    [`offers`],
    () => _coupones.index(id).then((res) => res.data.dicounts),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
