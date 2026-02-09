import { _pharmacies } from "api/pharmacies/pharmacies";
import { useQuery } from "react-query";

export const usePharmacies = () => {
  const { data, isLoading } = useQuery(
    ["pharmacies"],
    () => _pharmacies.index().then((res) => res),
    {
      keepPreviousData: true,
    }
  );

  return {
    data: data?.data?.pharmacies || [],
    isLoading,
  };
};
