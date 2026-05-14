import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { _countries } from "api/country/countries";
import { _Brands } from "api/brand/brands";
import { useQuery } from "react-query";
import { useEffect, useMemo, useState } from "react";
import { CITY_CHANGED_EVENT, setSelectedCity } from "utils/citySelection";
import { useFetchCategories } from "hooks/useFetchCategories";
import { useCityStore } from "store/cityStore";
import { useHome } from "hooks/home/useHome";

const isActiveRegion = (region) => {
  if (region?.is_active === null || region?.is_active === undefined) return true;
  if (typeof region?.is_active === "boolean") return region.is_active;
  return Number(region?.is_active) === 1;
};

const mergeCities = (regionsResponse) => {
  const regions = Array.isArray(regionsResponse?.data)
    ? regionsResponse.data
    : [];

  const activeRegions = regions.filter(isActiveRegion);
  const regionCities = activeRegions.flatMap((region) => region?.cities || []);

  const map = new Map();
  regionCities.forEach((city) => {
    if (!city?.id) return;
    const existing = map.get(city.id) || {};
    map.set(city.id, { ...existing, ...city });
  });

  return Array.from(map.values());
};

export const useNavBar = () => {
  const [isCityResolving, setIsCityResolving] = useState(
    localStorage.getItem("city_resolving") === "1"
  );

  const { t, i18n } = useTranslation("navbar");

  const [selectedCityLabel, setSelectedCityLabel] = useState(
    localStorage.getItem("city_label") || ""
  );

  const setCities = useCityStore((state) => state.setCities);

  const navigate = useNavigate();

  useEffect(() => {
    const onResolvingChanged = (event) => {
      setIsCityResolving(Boolean(event?.detail?.resolving));
    };

    window.addEventListener("city-resolving-changed", onResolvingChanged);

    return () => {
      window.removeEventListener("city-resolving-changed", onResolvingChanged);
    };
  }, []);

  useEffect(() => {
    const syncLabelFromStorage = () => {
      setSelectedCityLabel(localStorage.getItem("city_label") || "");
    };

    const onCityChanged = (event) => {
      const nextLabel = event?.detail?.cityLabel;
      if (nextLabel) {
        setSelectedCityLabel(nextLabel);
        return;
      }

      syncLabelFromStorage();
    };

    window.addEventListener(CITY_CHANGED_EVENT, onCityChanged);

    return () => {
      window.removeEventListener(CITY_CHANGED_EVENT, onCityChanged);
    };
  }, []);

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
    const regionsResponse = await _countries.index();

    const mergedCities = mergeCities(regionsResponse);
    setCities(mergedCities);

    return mergedCities.map((city) => ({
      id: city.id,
      label:
        city.label ||
        city.name ||
        city.value ||
        city.name_en ||
        city.name_ar ||
        "",
      onClick: () => {
        setSelectedCity({
          cityId: city.id,
          cityLabel:
            city.label ||
            city.name ||
            city.value ||
            city.name_en ||
            city.name_ar ||
            "",
        });
      },
    }));
  });

  useEffect(() => {
    if (selectedCityLabel || !cities.length) return;

    const selectedCityId = localStorage.getItem("city");
    if (!selectedCityId) return;

    const selectedCity = cities.find(
      (city) => String(city.id) === String(selectedCityId)
    );

    if (!selectedCity?.label) return;

    localStorage.setItem("city_label", selectedCity.label);
    setSelectedCityLabel(selectedCity.label);
  }, [cities, selectedCityLabel]);

  const pages = [
    {
      id: "1",
      onClick: () => navigate("/store"),
      label: t("Products"),
    },
    // {
    //   id: "4",
    //   onClick: () => navigate("/store/offers"),
    //   label: t("Special Offers"),
    // },
    {
      id: 7,
      label: t("pharmacies"),
      onClick: () => navigate("/pharmacy-locator"),
    },
    {
      id: "5",
      onClick: () => navigate("/contact-us"),
      label: t("Contact Us"),
    },
  ];

  const { data: brands = [] } = useQuery(["brands"], async () =>
    _Brands.getBrands().then((res) => res?.data?.brands || [])
  );

  const { categories } = useFetchCategories();
  const { data: homeTabs } = useHome();

  const navOffer = useMemo(() => {
    if (!homeTabs) return null;

    const offerBlock = homeTabs.find(
      (block) =>
        block?.type === "setting" && block?.data?.name === "home.page.navbar"
    );

    const offerData = offerBlock?.data;
    const isActive =
      offerData &&
      (offerData.active === true ||
        offerData.active === 1 ||
        Number(offerData.active) === 1);

    if (!isActive) return null;

    const lang = i18n?.resolvedLanguage || i18n?.language || "en";
    const langKey = lang?.slice(0, 2) || "en"; // Use 2-letter language code (ar, en, kr)

    const items = Array.isArray(offerData?.value?.items)
      ? offerData.value.items
      : null;

    const serializeItem = (item) => {
      const activeLang = item?.[langKey] || item?.en || item?.ar || item?.kr || {};

      return {
        title: activeLang?.title || "",
        text: activeLang?.text || "",
        link: item?.link || "",
      };
    };

    const offerItems = items
      ? items.map(serializeItem)
      : [
          {
            title: localized?.title || "",
            text: localized?.text || "",
            link: offerData?.value?.link || "",
          },
        ];

    return {
      items: offerItems.filter(
        (item) => item.title || item.text || item.link
      ),
    };
  }, [homeTabs, i18n]);

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
    isCityResolving,
    brands,
    categories: visibleNavbarCategories,
    t,
    navOffer,
  };
};
