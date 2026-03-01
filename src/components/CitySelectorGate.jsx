import React, { useEffect, useState } from "react";
import ChooseCityDialog from "components/ChooseCityDialog";
import { _cities } from "api/country/country";
import { _countries } from "api/country/countries";

const normalizeCityName = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "");

const hasSimilarCityNamePart = (source = "", target = "") => {
  if (!source || !target) return false;

  if (source === target || source.includes(target) || target.includes(source)) {
    return true;
  }

  const minChunkLength = 5;
  for (let i = 0; i <= target.length - minChunkLength; i += 1) {
    const chunk = target.slice(i, i + minChunkLength);
    if (source.includes(chunk)) {
      return true;
    }
  }

  return false;
};

const collectAppCities = (citiesResponse, regionsResponse) => {
  const directCities = citiesResponse?.data?.state || [];

  const regionCities = (regionsResponse?.data || []).flatMap((region) =>
    (region?.cities || []).map((city) => ({
      ...city,
      regionName: region?.name,
      regionNameEn: region?.name_en,
      regionNameAr: region?.name_ar,
    }))
  );

  const citiesById = new Map();

  [...directCities, ...regionCities].forEach((city) => {
    if (!city?.id) return;
    const existing = citiesById.get(city.id) || {};
    citiesById.set(city.id, { ...existing, ...city });
  });

  return Array.from(citiesById.values());
};

const cityNameCandidatesFromLocation = (address = {}) => {
  return [
    address.city,
    address.town,
    address.village,
    address.municipality,
    address.county,
    address.state_district,
    address.state,
  ].filter(Boolean);
};

const AUTO_LOCATE_FAIL_MESSAGE =
  "We couldn't locate your city automatically. Please choose your city.";

const setCityResolving = (value) => {
  localStorage.setItem("city_resolving", value ? "1" : "0");
  window.dispatchEvent(
    new CustomEvent("city-resolving-changed", { detail: { resolving: value } })
  );
};

const CitySelectorGate = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isCityResolving, setIsCityResolving] = useState(
    !localStorage.getItem("city")
  );
  const [cityDialogMessage, setCityDialogMessage] = useState(
    "Select your city for a customized shopping journey"
  );

  useEffect(() => {
    const showCityDialog = (message) => {
      setCityDialogMessage(message);
      setOpen(true);
      setIsCityResolving(false);
      setCityResolving(false);
    };

    const tryAutoSelectCity = async () => {
      const savedCity = localStorage.getItem("city");
      if (savedCity) {
        setOpen(false);
        setIsCityResolving(false);
        setCityResolving(false);
        return;
      }

      setIsCityResolving(true);
      setCityResolving(true);

      if (!navigator.geolocation) {
        showCityDialog(AUTO_LOCATE_FAIL_MESSAGE);
        return;
      }

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60 * 60 * 1000,
          });
        });

        const { latitude, longitude } = position.coords;

        const geocodeResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const geocodeData = await geocodeResponse.json();

        const locationCandidates = [
          ...cityNameCandidatesFromLocation(geocodeData?.address || {}),
          ...(geocodeData?.display_name?.split(",") || []),
        ]
          .map(normalizeCityName)
          .filter(Boolean);

        const [citiesResponse, regionsResponse] = await Promise.all([
          _cities.index(),
          _countries.index(),
        ]);
        const appCities = collectAppCities(citiesResponse, regionsResponse);

        const matchedCity = appCities.find((city) => {
          const cityNames = [
            city?.name,
            city?.name_en,
            city?.name_ar,
            city?.value,
            city?.inv_name,
          ]
            .filter(Boolean)
            .map(normalizeCityName);

          return cityNames.some((cityName) =>
            locationCandidates.some((candidate) =>
              hasSimilarCityNamePart(candidate, cityName)
            )
          );
        });

        if (matchedCity?.id) {
          localStorage.setItem("city", String(matchedCity.id));
          setOpen(false);
          setIsCityResolving(false);
          setCityResolving(false);
          return;
        }

        showCityDialog(AUTO_LOCATE_FAIL_MESSAGE);
      } catch (error) {
        showCityDialog(AUTO_LOCATE_FAIL_MESSAGE);
      }
    };

    tryAutoSelectCity();
  }, []);

  useEffect(() => {
    if (!isCityResolving) {
      setCityResolving(false);
    }
  }, [isCityResolving]);

  return (
    <>
      <ChooseCityDialog
        open={open}
        setOpen={setOpen}
        description={cityDialogMessage}
      />

      {children}
    </>
  );
};

export default CitySelectorGate;
