import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MenuButton from "components/modules/NavBar/MenuButton";
import { LocationOn } from "@mui/icons-material";
function CitySelector({
  selectedCityLabel,
  isCityResolving,
  cities,
  t,
}) {

  const visibleCities = cities.filter((item) => {
    const count = Number(item?.products_count);
    return Number.isNaN(count) || count > 0;
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {!!selectedCityLabel && (
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "12px", md: "14px" },
            display: { xs: "none", sm: "block" },
            maxWidth: "110px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedCityLabel}
        </Typography>
      )}
      {isCityResolving && (
        <CircularProgress
          size={16}
          thickness={6}
          sx={{ color: "white", mx: 1 }}
        />
      )}
      <MenuButton
        tooltip={t("change city")}
        icon={<LocationOn sx={{ color: "white" }} />}
        menuItems={visibleCities.map((item) => ({
          ...item,
          key: item.id,
        }))}
        defaultValue={localStorage.getItem("city")}
      />
    </Box>
  );
}

export default CitySelector;
