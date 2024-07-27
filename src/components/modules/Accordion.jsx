import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CAccordion() {
  const data = {
    filters: {
      categories: [
        {
          label: "Shop by life stage",
          options: [
            { id: "0", name: "For children" },
            { id: "1", name: "For adult b" },
            // Add more options as needed
          ],
        },
        {
          label: "Categories",
          options: [
            { id: "0", name: "Vegetables and miracle drugs" },
            { id: "1", name: "Amino acids" },
            { id: "2", name: "Bee products" },
            // Add more categories as needed
          ],
        },
      ],
      priceRange: {
        label: "Price",
        min: 0,
        max: 100,
        // Set the appropriate min and max values
      },
    },
  };

  return (
    <div>
      {data?.filters?.categories?.map((item, idx) => {
        return (
          <Accordion key={idx} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id={item?.label}
            >
              {item?.label}
            </AccordionSummary>
            {item?.options.map((option, idx) => {
              return (
                <AccordionDetails key={idx}>
                  <FormControlLabel
                    id={option.id}
                    control={<Checkbox />}
                    label={option.name}
                  />
                </AccordionDetails>
              );
            })}
          </Accordion>
        );
      })}
    </div>
  );
}
