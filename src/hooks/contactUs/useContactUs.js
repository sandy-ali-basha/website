import { _contact } from "api/contact/contact";
import { useQuery } from "react-query";

export const useContactUs = (id) => {
  const { data, isLoading } = useQuery(
    [`ContactUs`],
    () => _contact.index(id).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};