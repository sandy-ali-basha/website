export const CITY_CHANGED_EVENT = "city-changed";

export const getCityLabel = (city = {}) =>
  city?.name || city?.value || city?.inv_name || city?.name_en || city?.name_ar || "";

export const setSelectedCity = ({ cityId, cityLabel, countryId } = {}) => {
  if (!cityId) return;

  localStorage.setItem("city", String(cityId));

  if (cityLabel) {
    localStorage.setItem("city_label", String(cityLabel));
  }

  if (countryId) {
    localStorage.setItem("country", String(countryId));
  }

  window.dispatchEvent(
    new CustomEvent(CITY_CHANGED_EVENT, {
      detail: {
        cityId: String(cityId),
        cityLabel: cityLabel || "",
        countryId: countryId ? String(countryId) : undefined,
      },
    })
  );
};
