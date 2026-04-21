import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { _countries } from "api/country/countries";
import { getCityLabel, setSelectedCity as persistSelectedCity } from "utils/citySelection";

const isActiveRegionOrCity = (item) => {
  if (item?.is_active === null || item?.is_active === undefined) return true;
  if (typeof item?.is_active === "boolean") return item.is_active;
  return Number(item?.is_active) === 1;
};

const ChooseCity = ({ onClose }) => {
  const { t } = useTranslation("index");

  const [countries, setCountries] = useState([]);
  const [loadingCities] = useState(false); // No longer used, but kept for compatibility

  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem("country") || ""
  );
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("city") || ""
  );



  // Load countries list once
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await _countries.index();
      if (response.data) {
        setCountries(response.data.filter(isActiveRegionOrCity));
      }
    };
    fetchCountries();
  }, []);

  // When user selects a country
  const handleCountryChange = (event) => {
    const countryId = String(event.target.value);
    setSelectedCountry(countryId);
    localStorage.setItem("country", countryId);
    // Reset city
    setSelectedCity("");
  };

  // When user selects city
  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
  };

  // When clicking Save
  const handleSave = () => {
    const selectedCountryObj = countries.find(
      (country) => String(country.id) === String(selectedCountry)
    );
    const citiesList = selectedCountryObj?.cities?.filter(isActiveRegionOrCity) || [];
    const selectedCityObj = citiesList.find(
      (city) => String(city.id) === String(selectedCity)
    );

    persistSelectedCity({
      cityId: selectedCity,
      cityLabel: getCityLabel(selectedCityObj),
      countryId: selectedCountry,
    });

    if (onClose) onClose();
  };

  // Get cities for selected country
  const selectedCountryObj = countries.find(
    (country) => String(country.id) === String(selectedCountry)
  );
  const citiesList = selectedCountryObj?.cities?.filter(isActiveRegionOrCity) || [];

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Country Select */}
      <FormControl sx={{ width: ["70dvw", "40dvw", "40dvw", "30dvw"], mx: "auto", mb: 2 }}>
        <InputLabel id="country-select-label">{t("choose country")}</InputLabel>
        <Select
          labelId="country-select-label"
          label={t("choose country")}
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* City Select */}
      <FormControl
        sx={{ width: ["70dvw", "40dvw", "40dvw", "30dvw"], mx: "auto" }}
        disabled={!selectedCountry}
      >
        <InputLabel id="city-select-label">{t("choose city")}</InputLabel>
        <Select
          labelId="city-select-label"
          label={t("choose city")}
          value={selectedCity}
          onChange={handleCityChange}
        >
          {citiesList.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Save Button */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!selectedCountry || !selectedCity}
        >
          {t("save")}
        </Button>
      </Stack>
    </Box>
  );
};

export default ChooseCity;