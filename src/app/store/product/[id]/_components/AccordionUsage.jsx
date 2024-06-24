import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export default function AccordionUsage({ data }) {
  return (
    <>
      {data.map((item, idx) => (
        <Accordion
          sx={{
            borderRadius: 3,
            my: 1,
            border: 0,
            "&::before": {
              background: "none",
            },
          }}
          key={idx}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            {item.title}
          </AccordionSummary>
          <AccordionDetails
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
