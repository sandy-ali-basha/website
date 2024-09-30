import { Box, Grid, Slider, TextField, Typography } from "@mui/material";
import CAccordion from "components/modules/Accordion";
import SearchInput from "components/modules/SearchInput";
import { useTranslation } from "react-i18next";

const SideDrawer = ({
  valuetext,
  minValue,
  maxValue,
  handleMinChange,
  handleMaxChange,
  data,
  handleCheked,
  searchResults,
  setSearchResults,
}) => {
  const { t } = useTranslation("index");

  return (
    <Box
      sx={{
        borderColor: "divider",
        width: 250,
        px: 2,
        pb: 3,
      }}
    >
      <SearchInput
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />

      <Typography sx={{ mt: 2 }} variant="subtitle1" color="text.secondary">
        {t("Options")}:
      </Typography>
      {/* // * Accourdion */}
      <CAccordion data={data} handleCheked={handleCheked} />

      <Typography sx={{ mt: 2 }} variant="subtitle1" color="text.secondary">
        {t("Price")}
      </Typography>
      <Box dir="ltr">
        <Grid container spacing={2} alignItems="center">
          {/* Input for Minimum Value */}
          <Grid item xs={6}>
            <TextField
              label="Min Price"
              type="number"
              value={minValue}
              onChange={handleMinChange}
              inputProps={{ min: 0, max: maxValue }} // Ensure min doesn't go beyond max
              fullWidth
            />
          </Grid>

          {/* Input for Maximum Value */}
          <Grid item xs={6}>
            <TextField
              label="Max Price"
              type="number"
              value={maxValue}
              onChange={handleMaxChange}
              inputProps={{ min: minValue }} // Ensure max doesn't go below min
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default SideDrawer;
