import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MailToLink from "./components/mailToLink";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { _contact } from "api/contact/contact";
import * as yup from "yup";
import ButtonLoader from "components/customs/ButtonLoader";
import Swal from "sweetalert2";
import { LocationCity } from "@mui/icons-material";
import { MapPin } from "react-feather";

export default function ContactUs() {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  let schema = yup.object().shape({
    first_name: yup.string().trim().required(t("first name is required")),
    last_name: yup.string().trim().required(t("last name is required")),
    email: yup.string().trim().email().required(t("email is required")),
    message: yup.string().trim().required(t("message is required")),
  });

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    setLoading(true);
    try {
      await _contact.post(data);
    } finally {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      setLoading(false);
    }
  }

  const hanldeCreate = (input) => {
    mutate(input);
    setLoading(true);
  };
  return (
    <Container sx={{ my: 20 }}>
      <Box sx={{ width: { md: "50%" } }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", mb: 1 }}
          color="initial"
        >
          {t("Talk with Dawaa Alhayat Expert")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t("We’ll help you find the right Prodcuts for your Health.")}
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
              component="form"
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
                name="first_name"
                {...register("first_name")}
                error={errors?.first_name}
                helperText={errors?.first_name?.message || ""}
              />
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 4, mx: 1 }}
                label="Last Name"
                variant="outlined"
                type="text"
                name="last_name"
                {...register("last_name")}
                error={errors?.last_name}
                helperText={errors?.last_name?.message || ""}
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 4, mx: 1 }}
                label="Email Address"
                variant="outlined"
                type="email"
                name="email"
                {...register("email")}
                error={errors?.email}
                helperText={errors?.email?.message || ""}
              />
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 4, mx: 1 }}
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                name="message" // Should match schema
                {...register("message")} // Should match schema
                error={errors?.message}
                helperText={errors?.message?.message || ""}
              />
              <Box sx={{ textAlign: "center", mt: 4 }}>
                {loading ? (
                  <ButtonLoader
                    variant="contained"
                    sx={{ mx: "auto" }}
                    type="submit"
                    loading={true}
                    disabled={loading}
                  >
                    Waiting..
                  </ButtonLoader>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ mx: "auto" }}
                    type="submit"
                    disabled={loading}
                    onClick={() => handleSubmit(hanldeCreate)()}
                  >
                    {t("SEND")}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Typography sx={{ mt: 3 }} variant="caption" color="text.secondary">
            {t("We typically get back to all requests within 24 hours.")}
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
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d43592.783752407915!2d44.029617!3d36.21132!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4007239623882d59%3A0x168fa754f4658b3b!2z2LTYsdmD2Kkg2K_ZiNin2KEg2KfZhNit2YrYp9ipIC0gRGF3YWEgQWxoYXlhdCBjb21wYW55!5e1!3m2!1sar!2seg!4v1728900655861!5m2!1sar!2seg"
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
            <Typography variant="body1" color="initial">
              Erbil Office: <br />
              Dawaa Alhayat Company <br />
              Shoresh Street,Khanzad، 2nd Floor , Building 206، Erbil، Erbil IQ
            </Typography>
          </Box>
          <Box sx={{ width: "100%", mt: 3, display: "flex", gap: 1 }}>
            <MapPin sx={{ px: 1 }} />{" "}
            <Typography variant="body1" color="initial">
              Baghdad Office:
            </Typography>
            <a href="https://maps.app.goo.gl/NgbhGFS5KkDjLGXDA" color="initial">
              Dawaa Alhayat Scientific bureau Al Amiriya, Baghdad, Iraq
            </a>
          </Box>
          <Box sx={{ width: "100%", mt: 3, display: "flex", gap: 1 }}>
            <MapPin />{" "}
            <Typography variant="body1" color="initial">
              Sulaymaniya office:
            </Typography>
            <a href="https://maps.app.goo.gl/bBXyAZ89f1pXREmJ7" color="initial">
              Al sulaymaniya , German Village 1 , Villa No.47
            </a>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
