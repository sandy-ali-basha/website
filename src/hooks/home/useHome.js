import { _Home } from "api/Home/home";
import { useQuery } from "react-query";

export const useHome = () => {
  const { data, isLoading } = useQuery(
    ["home"],
    () => _Home.settings().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
export const useHomeSlider = () => {
  const { data, isLoading } = useQuery(
    ["homeSlider"],
    () => _Home.slider().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};