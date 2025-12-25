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

const ChooseCity = ({ onClose }) => {
  const { t } = useTranslation("index");

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem("country") || ""
  );
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("city") || ""
  );

  // Load all countries
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await _countries.index();
      if (response.data) {
        setCountries(response.data);

        // If we already have a saved country, load its cities
        const savedCountry = response.data.find(
          (c) => c.id === Number(localStorage.getItem("country"))
        );
        if (savedCountry) {
          setCities(savedCountry.cities || []);
        }
      }
    };

    fetchCountries();
  }, []);

  // When user selects a country
  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    localStorage.setItem("country", countryId);

    const selected = countries.find((c) => c.id === countryId);

    setCities(selected?.cities || []);

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
    localStorage.setItem("city", selectedCity);
    if (onClose) onClose(); // Close dialog
    window.location.reload(); // Reload to apply changes
  };

  return (  
    <Box sx={{ mt: 2 }}>
      {/* Country Select */}
      <FormControl fullWidth sx={{ mb: 3 }}>
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
      <FormControl fullWidth disabled={!selectedCountry}>
        <InputLabel id="city-select-label">{t("choose city")}</InputLabel>
        <Select
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
