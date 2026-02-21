import { _Home } from "api/Home/home";
import { useQuery } from "react-query";

export const useHome = () => {
  const { data, isLoading } = useQuery(["home"], () =>
    _Home.tabs().then((res) => res?.data),
  );
  return {
    data,
    isLoading,
  };
};
export const useHomeSections = () => {
  const { data, isLoading } = useQuery(["homeSections"], () =>
    _Home.settings().then((res) => res?.data),
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
    },
  );
  return {
    data,
    isLoading,
  };
};

export const useHomeSection = (id) => {
  const { data, isLoading, refetch } = useQuery(
    ["getHomeSection", id], // 👈 include id in key
    () =>
      _Home
        .getSection({
          id, // 👈 pass id to API
        })
        .then((res) => res),
    {
      enabled: !!id, // query runs only when id exists
    },
  );

  return {
    data,
    isLoading,
    refetch,
  };
};

export const useFreeShipping = () => {
  const { data, isLoading } = useQuery(
    ["freeShipping"],
    () => _Home.freeShipping().then((res) => res?.data),
  );

  return {
    data,
    isLoading
  };
};
