import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { _Attributes } from "api/attributes/attributes";
import { useTranslation } from "react-i18next";

export default function AttributeAccordionItem({
  item,
  expandedId,
  onChange,
  handleCheckboxChange,
  lang,
  filters,
}) {
  const { t } = useTranslation("index");

  // فقط fetch إذا كان الـAccordion موسع
  const { data: AttrValuesData, isLoading: AttrValuesLoading } = useQuery(
    ["_Attributes_values", item.id],
    () => _Attributes.getAttributeValues(item.id).then((res) => res?.data),
    { enabled: expandedId === item.id },
  );

  return (
    <Accordion
      key={item.id}
      expanded={expandedId === item.id}
      onChange={onChange(item.id)}
      disableGutters
      elevation={0}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">
          {item?.translations?.find((t) => t.locale === lang)?.title ||
            item.name}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2 }}>
        {AttrValuesLoading ? (
          <Typography variant="body2">{t("Loading...")}</Typography>
        ) : (
          AttrValuesData?.product_attributes_values?.map((option) => {
            const valueLabel = option.translations?.find(
              (t) => t.locale === lang,
            )?.value;

            return (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={filters?.[item.id]?.includes(option.id) || false}
                    onChange={() => handleCheckboxChange(item.id, option.id)}
                  />
                }
                label={valueLabel}
                sx={{
                  display: "block",
                  borderTop: "1px solid #f8f8f8ff",
                  py: 1,
                  fontSize: "0.6rem",
                }}
              />
            );
          })
        )}
      </AccordionDetails>
    </Accordion>
  );
}
