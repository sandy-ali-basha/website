import { _contact } from "api/contact/contact";
import { useQuery } from "react-query";

export const useContactLocations = () => {
  const { data, isLoading } = useQuery(
    ["ContactLocations"],
    () => _contact.locations().then((res) => res),
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading,
  };
};
