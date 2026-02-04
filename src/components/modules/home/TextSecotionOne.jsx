import { Box, Button, Grid, Typography } from "@mui/material";
import i18next from "i18next";
import { useState } from "react";

const TextSectionOne = ({data}) => {
  // Get the text
  const text = data.text?.[i18next.language] || "";
  const [showMore, setShowMore] = useState(false);
  // Define the max length before showing "View More"
  const maxLength = 1200; // adjust the length as needed

  // Function to toggle between showing more or less
  const handleToggle = () => {
    setShowMore(!showMore);
  };

  // Determine if the text is long enough to be truncated
  const isLongText = text.length > maxLength;
  const displayedText = showMore ? text : text.substring(0, maxLength);

  return (
    <Grid container sx={{ py: 5 }} spacing="5">
      <Grid md="4">
        <Box sx={{ width: { xs: "70%", lg: "100%" }, mx: "auto" }}>
          <img src={data?.image} alt="" style={{ width: "100%" }} />
        </Box>
      </Grid>
      <Grid md="8" sx={{ px: 5 }}>
        <Typography
          dangerouslySetInnerHTML={{
            __html: displayedText,
          }}
        ></Typography>
        {isLongText && (
          <Button onClick={handleToggle}>
            {showMore ? "View Less" : "View More"}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
export default TextSectionOne;
