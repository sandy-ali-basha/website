import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CAccordion from "components/modules/Accordion";
import SearchInput from "components/modules/SearchInput";
import { useTranslation } from "react-i18next";

const SideDrawer = ({
  valuetext,
  minValue,
  maxValue,
  handleMinChange,
  handleMaxChange,
  Attributes,
  handleCheked,
  ClearFilter,
  searchResults,
  setSearchResults,
  searchTerm,
  setSearchTerm,
  filters,
  expandedId,
  setExpandedId,
}) => {
  const { t } = useTranslation("index");
  const lang = localStorage.getItem("i18nextLng");

  return (
    <Box sx={{ borderColor: "divider", width: 250, px: 2, pb: 3 }}>
      <SearchInput
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Typography sx={{ mt: 2 }} variant="subtitle1" color="text.secondary">
        {t("Options")}:
      </Typography>

      <CAccordion
        Attributes={Attributes}
        handleCheked={handleCheked}
        filters={filters}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        lang={lang}
        t={t}
      />

      <Typography sx={{ mt: 2 }} variant="subtitle1" color="text.secondary">
        {t("Price")} {t("currency")}
      </Typography>

      <Box dir="ltr">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label={t("Min Price")}
              type="number"
              value={minValue || ""}
              onChange={handleMinChange}
              inputProps={{ min: 0, max: maxValue }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("Max Price")}
              type="number"
              value={maxValue || ""}
              onChange={handleMaxChange}
              inputProps={{ min: minValue }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button variant="outlined" sx={{ mt: 2 }} onClick={ClearFilter} fullWidth>
          {t("Clear Filter")}
        </Button>
      </Box>
    </Box>
  );
};
export default SideDrawer;
