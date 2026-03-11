import React from "react";
import { Box } from "@mui/material";
import AttributeAccordionItem from "./AttributeAccordionItem";

export default function CAccordion({
  Attributes,
  handleCheked,
  filters,
  setExpandedId,
  expandedId,
  lang,
  t,
}) {
  
  const handleAccordionChange = (id) => (event, isExpanded) => {
    setExpandedId(isExpanded ? id : null);
  };

  const handleCheckboxChange = (attrId, valueId) => {
    handleCheked(attrId, valueId);
  };

  return (
    <Box>
      {Attributes?.product_attributes?.filter(item => item.active_filter !== 0).map((item) => (
        <AttributeAccordionItem
          key={item.id}
          item={item}
          expandedId={expandedId}
          onChange={handleAccordionChange}
          handleCheckboxChange={handleCheckboxChange}
          lang={lang}
          t={t}
          filters={filters}
        />
      ))}
    </Box>
  );
}
