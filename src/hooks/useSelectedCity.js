import { useEffect, useState } from "react";
import { CITY_CHANGED_EVENT } from "utils/citySelection";

export const useSelectedCity = () => {
  const [cityId, setCityId] = useState(localStorage.getItem("city") || "");

  useEffect(() => {
    const updateFromStorage = () => {
      setCityId(localStorage.getItem("city") || "");
    };

    const onCityChanged = (event) => {
      const nextCity = event?.detail?.cityId;
      if (nextCity) {
        setCityId(String(nextCity));
        return;
      }
      updateFromStorage();
    };

    window.addEventListener(CITY_CHANGED_EVENT, onCityChanged);
    window.addEventListener("storage", updateFromStorage);

    return () => {
      window.removeEventListener(CITY_CHANGED_EVENT, onCityChanged);
      window.removeEventListener("storage", updateFromStorage);
    };
  }, []);

  return cityId;
};
