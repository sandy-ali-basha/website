import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MailToLink from "./components/mailToLink";

export default function ContactUs() {
  return (
    <Container sx={{ my: 20 }}>
      <Box sx={{ width: { md: "50%" } }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", mb: 1 }}
          color="initial"
        >
          Talk with Dawaa Alhayat Expert
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We’ll help you find the right plan for your team.
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid item md="6">
          <Box
            sx={{
              border: 2,
              borderColor: "rgba(0, 0, 0, 0.12)",
              borderRadius: 2,
              px: 2,
              py: 3,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", sm: "column" },
              }}
            >
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 4, mx: 1 }}
                label="First Name"
                variant="outlined"
                type="text"
              />
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 4, mx: 1 }}
                label="Last Name"
                variant="outlined"
                type="text"
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 4, mx: 1 }}
                label="Email Address"
                variant="outlined"
                type="email"
              />
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 4, mx: 1 }}
                label="Message"
                variant="outlined"
                multiline
                rows={4}
              />
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button variant="contained" sx={{ mx: "auto" }}>
                  SEND
                </Button>
              </Box>
            </Box>
          </Box>
          <Typography sx={{ mt: 3 }} variant="caption" color="text.secondary">
            We typically get back to all requests within 24 hours.
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
          item
          md="6"
        >
          <Box sx={{ width: { md: "45vw", sm: "90vw" } }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.1563795604266!2d44.0297013!3d36.211393799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4007239623882d59%3A0x168fa754f4658b3b!2z2LTYsdmD2Kkg2K_ZiNin2KEg2KfZhNit2YrYp9ipIC0gRGF3YWEgQWxoYXlhdCBjb21wYW55!5e0!3m2!1sar!2seg!4v1717020932521!5m2!1sar!2seg"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              style={{
                border: "0",
                borderRadius: "10px",
                width: "100%",
                height: "70vh",
              }}
            ></iframe>
          </Box>
          <Box sx={{ textAlign: "start", width: "100%", mt: 3, ms: 2 }}>
            <Typography variant="body1" color="initial">
              Need white glove customer support?
            </Typography>
            <MailToLink text="Contact Customer Support" email="dn@gmail.com" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
