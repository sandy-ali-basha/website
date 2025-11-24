import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControlLabel, Checkbox, Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { _Attributes } from "api/attributes/attributes";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18n";

// 🔹 Subcomponent for a single accordion item
function AttributeAccordionItem({ item, expandedId, onChange, handleCheckboxChange, selectedAttributes, lang, t }) {
  const { data: AttrValuesData, isLoading: AttrValuesLoading } = useQuery(
    ["_Attributes_values", item.id],
    () => _Attributes.getAttributeValues(item.id).then((res) => res?.data),
    { enabled: expandedId === item.id }
  );

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
          {item?.translations?.find((t) => t.locale === i18n.language)?.title || item.name}
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

export default function CAccordion({ data, handleCheked, selectedAttributes = {} }) {
  const params = useParams();
  const { t } = useTranslation("index");
  const lang = localStorage.getItem("i18nextLng");

  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (params.attr_id) {
      setExpandedId(Number(params.attr_id));
    }
  }, [params.attr_id]);

  const handleAccordionChange = (id) => (event, isExpanded) => {
    setExpandedId(isExpanded ? id : null);
  };

  const handleCheckboxChange = (attrId, valueId) => {
    handleCheked(attrId, valueId);
  };

  return (
    <Box>
      {data?.product_attributes?.map((item) => (
        <AttributeAccordionItem
          key={item.id}
          item={item}
          expandedId={expandedId}
          onChange={handleAccordionChange}
          handleCheckboxChange={handleCheckboxChange}
          selectedAttributes={selectedAttributes}
          lang={lang}
          t={t}
        />
      ))}
    </Box>
  );
}
