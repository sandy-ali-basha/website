import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
export default function JobCard({ id, title, description }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/careers/job/${id}`);
  };

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
      <Button onClick={handleButtonClick} variant="contained" color="secondary">
      View details
    </Button>
    </Box>
  );
}
///* Card-26 */
