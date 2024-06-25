import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import img from "../../../assets/images/hero-image (3).jpg";
import { _AuthApi } from "api/auth";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import LanguageSelector from "components/LanguageSelector";

const ResetPassword = () => {
  const { t } = useTranslation("index");
  let schema = yup.object().shape({
    password: yup
      .string()
      .required(t("Password is required"))
      .min(6, t("The Password must be of six characters"))
      .max(20, t("The Password must be of 20 characters")),

    password_confirmation: yup
      .string()
      .required(t("Confirm password is required"))
      .min(6, t("The confirm password must be of six characters"))
      .max(20, t("The confirm password must be of 20 characters"))
      .oneOf([yup.ref("password")], t("your password does not match")),
  });
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setNewPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  const onSubmit = async (e) => {
    _AuthApi
      .resetPass(token, {
        email,
        password,
        password_confirmation,
      })
      .then((res) => {
        if (res?.code == 200) {
          setMessage(true);
          setTimeout(() => navigate("/"), [2000]);
        } else {
          setError(res?.error || t("An unexpected error occurred"));
        }
      });
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          pt: 20,
          pb: 7,
        }}
      >
        <img
          src={img}
          alt="gummie"
          objectFit="cover"
          quality={100}
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100%",
            zIndex: "-1",
          }}
        />
        <Box
          sx={{
            width: { md: "35%", sm: "80%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            flexDirection: "column",
            textAlign: "center",
            boxShadow: 5,
            p: 2,
            borderRadius: 2,
            background: "white",
            minHeight: "50vh",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6">{t("Reset Your Password")}</Typography>
            <Typography variant="body1">
              {t("Enter your credentials to continue")}
            </Typography>
          </Grid>
          <Box
            sx={{ width: "100%", mt: "30px" }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              type="password"
              sx={{ width: "100%" }}
              placeholder="Enter your password"
              {...register("password", { validate: true })}
              id="password"
              value={password}
              label={t("New Password")}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <TextField
              type="password"
              sx={{ my: 1, width: "100%" }}
              placeholder="Confirm Password"
              {...register("password_confirmation", { validate: true })}
              id="password_confirmation"
              value={password_confirmation}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
            />
            {errors.password_confirmation && (
              <Alert severity="error">
                {errors.password_confirmation.message}
              </Alert>
            )}
            {error?.message && (
              <Alert sx={{ my: 1 }} severity="error">
                {error?.message}
              </Alert>
            )}
            {error?.errors && Object.keys(error?.errors).length > 0 && (
              <>
                {Object.keys(error?.errors).map((key, idx) => (
                  <Alert key={idx} severity="error" sx={{ mt: 1 }}>
                    {error?.errors[key]}
                  </Alert>
                ))}
              </>
            )}
            {message && (
              <Alert severity="success">
                {t("Password Reset Successfully ,redirect you to login")}
              </Alert>
            )}
            <Button
              disableOnLoading
              loading={false}
              fullWidth
              type="submit"
              variant="contained"
            >
              {t("Update Password")}
            </Button>
          </Box>
        </Box>
        <Box sx={{ position: "fixed", bottom: "10px", right: "10px" }}>
          <LanguageSelector />
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
