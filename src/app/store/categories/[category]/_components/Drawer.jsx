import { Box, Slider, TextField, Typography } from "@mui/material";
import CAccordion from "components/modules/Accordion";
import { useTranslation } from "react-i18next";

const SideDrawer = ({ valuetext, value, handleChange, data, handleCheked }) => {
  const { t } = useTranslation("index");
  return (
    <Box
      sx={{
        borderColor: "divider",
        width: 250,
        px: 2,
        py: 3,
      }}
    >
      <Typography variant="subtitle1" color="text.secondary">
        {t("Search")}:
      </Typography>
      <TextField size="small" sx={{ width: "100%" }} placeholder="search" />
      <Typography sx={{ mt: 2 }} variant="subtitle1" color="text.secondary">
        {t("Options")}:
      </Typography>
      {/* //Accourdion */}
      <CAccordion data={data} handleCheked={handleCheked} />

      <Typography sx={{ mt: 2 }} variant="subtitle1" color="text.secondary">
        {t("Price")}
      </Typography>
      <Slider
        getAriaLabel={() => "Price"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};
export default SideDrawer;
