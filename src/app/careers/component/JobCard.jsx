import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";

export default function JobCard({ id, title, description }) {
  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: 4,
        borderRadius: 2,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        p: 2,
        my: 2,
      }}
    >
      <Box>
        <Typography variant="h5" color="initial">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Button href={"/careers/job" + id} variant="contained" color="secondary">
        View details
      </Button>
    </Box>
  );
}
///* Card-26 */
