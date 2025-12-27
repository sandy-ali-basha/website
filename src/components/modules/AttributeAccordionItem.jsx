import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControlLabel, Checkbox, Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import i18n from "i18n";
import { useParams } from "react-router-dom";
import { _Attributes } from "api/attributes/attributes";

// * 🔹 Subcomponent for a single accordion item
export default function AttributeAccordionItem({
  item,
  expandedId,
  onChange,
  handleCheckboxChange,
  selectedAttributes,
  lang,
  t,
}) {
  const { data: AttrValuesData, isLoading: AttrValuesLoading } = useQuery(
    ["_Attributes_values", item.id],
    () => _Attributes.getAttributeValues(item.id).then((res) => res?.data),
    { enabled: expandedId === item.id }
  );

  const { attr_valueid } = useParams();
  const selectedAttrValueId = attr_valueid ? Number(attr_valueid) : null;

  return (
    <Accordion
      key={item.id}
      expanded={expandedId === item.id}
      onChange={onChange(item.id)}
      disableGutters
      elevation={0} // ✅ Fix MUI elevation warning
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">
          {item?.translations?.find((t) => t.locale === i18n.language)?.title ||
            item.name}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2 }}>
        {AttrValuesLoading && expandedId === item.id ? (
          <Typography variant="body2">{t("Loading...")}</Typography>
        ) : (
          <>
            {AttrValuesData?.product_attributes_values?.map((option) => {
              const valueLabel = option.translations?.find(
                (t) => t.locale === lang
              )?.value;

              return (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      checked={selectedAttrValueId === option.id}
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
            })}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
