
import { _about } from "api/about/about";
import { useQuery } from "react-query";

export const useAbout = () => {
  const { data, isLoading } = useQuery(
    ["about"],
    () => _about.index().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
