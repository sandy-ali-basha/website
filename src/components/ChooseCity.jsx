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
import { _cities } from "api/country/country";
import { getCityLabel, setSelectedCity as persistSelectedCity } from "utils/citySelection";

const isActiveRegionOrCity = (item) => {
  if (item?.is_active === null || item?.is_active === undefined) return true;
  if (typeof item?.is_active === "boolean") return item.is_active;
  return Number(item?.is_active) === 1;
};

const ChooseCity = ({ onClose }) => {
  const { t } = useTranslation("index");

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem("country") || ""
  );
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("city") || ""
  );

  const loadCitiesByCountry = async (countryId) => {
    if (!countryId) {
      setCities([]);
      return;
    }

    setLoadingCities(true);
    try {
      const response = await _cities.viewCity(countryId);
      setCities((response?.data?.state || []).filter(isActiveRegionOrCity));
    } finally {
      setLoadingCities(false);
    }
  };

  // Load countries list once, then load saved country cities lazily
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await _countries.index();
      if (response.data) {
        setCountries(response.data.filter(isActiveRegionOrCity));

        const savedCountryId = localStorage.getItem("country");
        if (savedCountryId) {
          await loadCitiesByCountry(savedCountryId);
        }
      }
    };

    fetchCountries();
  }, []);

  // When user selects a country
  const handleCountryChange = (event) => {
    const countryId = String(event.target.value);
    setSelectedCountry(countryId);
    localStorage.setItem("country", countryId);
    loadCitiesByCountry(countryId);

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
    const selectedCityObj = cities.find(
      (city) => String(city.id) === String(selectedCity)
    );

    persistSelectedCity({
      cityId: selectedCity,
      cityLabel: getCityLabel(selectedCityObj),
      countryId: selectedCountry,
    });

    if (onClose) onClose();
  };

  return (  
    <Box sx={{ mt: 2 }}>
      {/* Country Select */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="country-select-label">{t("choose country")}</InputLabel>
        <Select
        sx={{width:["70dvw","40dvw"]}}
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
      <FormControl fullWidth disabled={!selectedCountry || loadingCities}>
        <InputLabel id="city-select-label">{t("choose city")}</InputLabel>
        <Select
        sx={{width:["70dvw","40dvw"]}}

          labelId="city-select-label"
          label={t("choose city")}
          value={selectedCity}
          onChange={handleCityChange}
        >
          {cities.map((city) => (
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