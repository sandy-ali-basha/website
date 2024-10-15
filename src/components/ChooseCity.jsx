import { _cities } from "api/country/country";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ChooseCity = () => {
  const { t } = useTranslation("index");
  const [cities, setCities] = useState([]);
  const getCities = async () => {
    _cities.index().then((response) => {
      if (response.data.state) {
        const formattedCities = response.data.state.map((city) => ({
          id: city.id,
          label: city.name,
          onClick: () => {
            localStorage.setItem("city", city.id);
            window.location.reload();
          },
        }));
        setCities(formattedCities);
      }
    });
  };
  useMemo(() => {
    getCities();
  }, []);

  return (
    <FormControl fullWidth sx={{ mt: 4 }}>
      <InputLabel id="demo-simple-select-label">{t("change city")}</InputLabel>
      <Select label={t("change city")}>
        {cities.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default ChooseCity;
