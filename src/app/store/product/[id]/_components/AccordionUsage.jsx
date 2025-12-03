import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from "components/modules/Loader";

export default function AccordionUsage({ data, isLoading }) {
  console.log(data);
  console.log(data);

  return (
    <>
      {isLoading && <Loader />}
      {data?.data?.accordions &&
        data?.data?.accordions.map((item, idx) => (
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
