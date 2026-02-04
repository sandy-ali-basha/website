import { Button, Grid, Typography } from "@mui/material";
import i18next from "i18next";

const Cta = ({data}) => {
  return (
    <Grid
      container
      sx={{
        background: "#F4F4F4",
        my: 6,
        borderRadius: 2,
        px: 5,
        py: 4,
      }}
    >
      <Grid item sm="6">
        <Typography variant="h5" color="initial">
          {data?.title?.[i18next.language] ?? ""}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data?.subtitle?.[i18next.language] ?? " "}
        </Typography>
      </Grid>
      <Grid
        sm="6"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          sx={{ px: 3 }}
          href={data?.subtitle?.[i18next.language]}
        >
          {"Shop Now"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Cta;
