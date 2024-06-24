import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useCareer } from "hooks/careers/useCreers";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function Job() {
  const { id } = useParams();
  const { t } = useTranslation("index");
  const { data, isLoading } = useCareer(id);
  console.log("params.data", data);
  return (
    <Container sx={{ my: 22 }}>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <Typography variant="body2" color="initial">
            {data?.vacancy_name}
          </Typography>
          <Typography
            variant="h4"
            color="initial"
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            {data?.location}, {data?.country}
          </Typography>

          <Box sx={{ mt: 4, width: "80%" }}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h5"
              color="initial"
            >
              {t("About Us")}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 1, fontWeight: "light" }}
              dangerouslySetInnerHTML={{ __html: data?.about_us }}
            ></Typography>

            <Typography
              variant="h5"
              color="initial"
              sx={{ mt: 4, fontWeight: "bold" }}
            >
              description
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 1, fontWeight: "light" }}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></Typography>

          
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              border: 1,
              p: 2,
              borderRadius: 2,
              borderColor: "text.secondary",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 3,
                my: 2,
              }}
            >
              <Chip label={data?.requisition_no} variant="outlined">
           
              </Chip>
              <Button
                variant="contained"
                color="primary"
                href="mailTo:email@gmail.com"
              >
                {t("Apply for this position")}
              </Button>
            </Box>
            <Box>
              <Typography variant="caption" color="initial">
                {t("Job Type")}
              </Typography>
              <Typography variant="body1" color="initial">
                {data?.category}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="initial">
                {t("Location")}
              </Typography>
              <Typography variant="body1" color="initial">
                {data?.location}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="initial">
                {t("Date posted")}
              </Typography>
              <Typography variant="body1" color="initial">
                {data?.time_type}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
