import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

const ButtonLoader = (props) => {
  const { loading, disableOnLoading, ...rest } = props;

  return (
    <Button
      {...rest}
      variant="contained"
      disabled={disableOnLoading === true && loading}
    >
      {props.loading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            style={{ width: "25px", height: "25px", color: "white" }}
          />
        </Box>
      )}
      <Typography sx={{ visibility: props.loading ? "hidden" : "visible" }}>
        {props.children}
      </Typography>
    </Button>
  );
};

export default ButtonLoader;
