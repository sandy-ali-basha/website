import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Stack,
  Grid,
  Typography,
} from "@mui/material";
import { _countries } from "api/country/countries";
import i18next from "i18next";
import { _cities } from "api/country/country";

const TabCountry = () => {
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
      setCities(response?.data?.state || []);
    } finally {
      setLoadingCities(false);
    }
  };

  // Load countries list once, then load saved country cities lazily
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await _countries.index();
      if (response.data) {
        setCountries(response.data);

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
    localStorage.setItem("city", selectedCity);
    window.location.reload();
  };

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      <Grid item md="8" sx="12">
        <Typography variant="h6" color="text.main" sx={{ mb: 3 }}>
          {t("Select your city for a customized shopping journey")}
        </Typography>
        {/* Country Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="country-select-label">
            {t("choose country")}
          </InputLabel>
          <Select
            labelId="country-select-label"
            label={t("choose country")}
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                 {country[`name_${i18next.language}`] || country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* City Select */}
        <FormControl fullWidth disabled={!selectedCountry || loadingCities}>
          <InputLabel id="city-select-label">{t("choose city")}</InputLabel>
          <Select
            labelId="city-select-label"
            label={t("choose city")}
            value={selectedCity}
            onChange={handleCityChange}
          >
            {cities?.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                  {city[`name_${i18next.language}`] || city.name}
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
      </Grid>
    </Grid>
  );
};

export default TabCountry;
