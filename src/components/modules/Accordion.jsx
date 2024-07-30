import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useQuery } from "react-query";
import { _Attributes } from "api/attributes/attributes";
import { useParams } from "react-router-dom";

export default function CAccordion({ data, handleCheked }) {
  const params = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    Number(params.attr_id)
  );
  const [selectedValueId, setSelectedValueId] = useState(
    Number(params.attr_value_id)
  );

  const { data: AttrValuesData, isLoading: AttrValuesLoading } = useQuery(
    ["_Attributes_values", selectedCategoryId],
    () =>
      _Attributes
        .getAttributeValues(selectedCategoryId)
        .then((res) => res?.data),
    { enabled: !!selectedCategoryId }
  );

  useEffect(() => {
    setSelectedCategoryId(Number(params.attr_id));
    setSelectedValueId(Number(params.attr_value_id));
  }, [params.attr_id, params.attr_value_id]);

  const handleAccordionChange = (id) => (event, isExpanded) => {
    if (isExpanded) {
      setSelectedCategoryId(id);
    } else {
      setSelectedCategoryId(null);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedValueId(Number(event.target.value));
    handleCheked(selectedCategoryId, event.target.value);
  };

  return (
    <div>
      {data?.product_attributes?.map((item, idx) => (
        <Accordion
          key={idx}
          expanded={selectedCategoryId === item.id}
          onChange={handleAccordionChange(item.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id={item.id.toString()}
          >
            {item.title}
          </AccordionSummary>
          {AttrValuesLoading ? (
            <AccordionDetails>Loading...</AccordionDetails>
          ) : (
            <AccordionDetails>
              <RadioGroup value={selectedValueId} onChange={handleRadioChange}>
                {AttrValuesData?.product_attributes_values?.map(
                  (option, idx) => (
                    <FormControlLabel
                      sx={{
                        fontSize: 2,
                        borderTop: 1,
                        py: 2,
                        borderColor: "#ddd",
                      }}
                      key={idx}
                      id={option.id}
                      control={<Radio value={option.id} />}
                      label={option.value}
                    />
                  )
                )}
              </RadioGroup>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </div>
  );
}
