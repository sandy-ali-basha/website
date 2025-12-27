import React, { useState, useEffect } from "react";

import {Box } from "@mui/material";
import { _Attributes } from "api/attributes/attributes";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AttributeAccordionItem from "./AttributeAccordionItem";

export default function CAccordion({
  Attributes,
  handleCheked,
  selectedAttributes = {},
}) {
  const params = useParams();
  const { t } = useTranslation("index");
  const lang = localStorage.getItem("i18nextLng");
  const [expandedId, setExpandedId] = useState(null);
  
  const handleAccordionChange = (id) => (event, isExpanded) => {
    setExpandedId(isExpanded ? id : null);
  };

  const handleCheckboxChange = (attrId, valueId) => {
    handleCheked(attrId, valueId);
  };
  
  useEffect(() => {
    if (params.attr_id) {
      setExpandedId(Number(params.attr_id));
      handleCheked(params.attr_id, params.attr_valueid);
    }
  }, [params.attr_id, params.attr_valueid]);

  return (
    <Box>
      {Attributes?.product_attributes?.map((item) => (
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
