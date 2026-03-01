import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { _cities } from "api/country/country";
import { _countries } from "api/country/countries";
import { _Brands } from "api/brand/brands";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { useFetchCategories } from "hooks/useFetchCategories";


const cityLabel = (city = {}) =>
  city?.name || city?.value || city?.inv_name || city?.name_en || city?.name_ar || "";

const mergeCities = (citiesResponse, regionsResponse) => {
  const directCities = citiesResponse?.data?.state || [];
  const regionCities = (regionsResponse?.data || []).flatMap(
    (region) => region?.cities || []
  );

  const map = new Map();
  [...directCities, ...regionCities].forEach((city) => {
    if (!city?.id) return;
    const existing = map.get(city.id) || {};
    map.set(city.id, { ...existing, ...city });
  });

  return Array.from(map.values());
};

export const useNavBar = () => {
  const { t } = useTranslation("navbar");

  const navigate = useNavigate();

  const settings = [
    {
      id: 1,
      label: t("My account"),
      onClick: () => navigate("/profile/account"),
    },
    {
      id: 2,
      label: t("Change Password"),
      onClick: () => navigate("/profile/security"),
    },
    // { id: 3, label: t("Billing"), onClick: () => navigate("/profile/billing") },
    {
      id: 4,
      label: t("My Orders"),
      onClick: () => navigate("/profile/orders"),
    },
    {
      id: 5,
      label: t("My Addresses"),
      onClick: () => navigate("/profile/addresses"),
    },
    {
      id: 6,
      label: t("My Points"),
      onClick: () => navigate("/profile/points"),
    },
   
    {
      id: 8,
      label: t("Log out"),
      onClick: () => {
        localStorage.clear();
        window.location.reload();
      },
    },
  ];

  const { data: cities = [] } = useQuery(["cities"], async () => {
    const [citiesResponse, regionsResponse] = await Promise.all([
      _cities.index(),
      _countries.index(),
    ]);

    return mergeCities(citiesResponse, regionsResponse).map((city) => ({
      id: city.id,
      label: cityLabel(city),
      onClick: () => {
        localStorage.setItem("city", city.id);
        window.location.reload();
      },
    }));
  });

  const selectedCityLabel = useMemo(() => {
    const selectedCityId = localStorage.getItem("city");
    if (!selectedCityId) return "";

    const selectedCity = cities.find(
      (city) => String(city.id) === String(selectedCityId)
    );

    return selectedCity?.label || "";
  }, [cities]);

  const pages = [
    {
      id: "1",
      onClick: () => navigate("/store"),
      label: t("Products"),
    },
    {
      id: "4",
      onClick: () => navigate("/store/offers"),
      label: t("Special Offers"),
    },
    {
      id: 7,
      label: t("pharmacies"),
      onClick: () => navigate("/pharmacy-locator"),
    },
    { id: "5", onClick: () => navigate("/contact-us"), label: t("Contact Us") },
  ];

  const { data: brands } = useQuery(["brands"], async () =>
    _Brands.getBrands().then((res) => res?.data.brands)
  );

  const { categories } = useFetchCategories();

  const visibleNavbarCategories = categories.filter((category) => {
    if (typeof category?.navActive === "boolean") {
      return category.navActive;
    }

    return Number(category?.navActive) === 1;
  });

  return {
    settings,
    pages,
    navigate,
    cities,
    selectedCityLabel,
    brands,
    categories:
      visibleNavbarCategories.length > 4
        ? visibleNavbarCategories.slice(0, 4)
        : visibleNavbarCategories,
    t,
  };
};
