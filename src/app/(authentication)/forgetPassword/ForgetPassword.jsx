import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _AuthApi } from "api/auth";
import img from "../../../assets/images/hero-image (3).jpg";
import { useTranslation } from "react-i18next";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("This must be a valid email")
    .required("Email is required"),
});

const ForgetPassword = () => {
  const { t } = useTranslation("index");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(0);
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = async (data) => {
    if (timer === 0) {
      _AuthApi.forgetPass({ email }).then((res) => {
        if (res?.code === 200) {
          setMessage(true);
          setError(false);
          setTimer(60); // Set the timer to 60 seconds
        } else {
          setError(res?.error || "An unexpected error occurred");
          setMessage(false);
        }
      });
    }
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
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100%",
            zIndex: "-1",
            objectFit: "cover",
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
          <Typography variant="h5" sx={{ mb: 5 }}>
            {t("Reset Your Password")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
            {t("Enter your Email to continue")}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="email"
              sx={{ width: "100%" }}
              placeholder="Enter your email"
              {...register("email", { validate: true })}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              label="Email"
            />
            {errors.email && (
              <Alert severity="error">{errors.email.message}</Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {message && (
              <Alert severity="success" sx={{ textAlign: 'start', mt: 2 }}>
                {
                  "We have sent you an email with a link to reset your password. Please check your inbox and follow the instructions to restore access to your account. If you do not see the email in your inbox, please check your spam or junk folder."
                }
              </Alert>
            )}
            <Button
              disabled={timer > 0}
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              {timer > 0 ? `Send Again in ${timer}s` : "Send Reset Email"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
