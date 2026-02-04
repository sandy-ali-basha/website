import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import logo from "../../../assets/images/logo.png";
import ButtonLoader from "components/customs/ButtonLoader";
import { useLogin } from "./hooks/useLogin";
import LanguageSelector from "components/LanguageSelector";
import { Link } from "react-router-dom";
import LoginComponent from "../loginGoogle";
import Seo from "components/Seo";

export default function Login() {
  const { errors, register, t, handleSubmit, onSubmit, loading, error } =
    useLogin();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Seo
        title="Log In"
        description="Access your Dawaa Alhayat account to manage orders and profile details."
        keywords="login, Dawaa Alhayat, account"
      />
        <Box
          sx={{
          width: { xs: "90%", sm: "80%", md: "35%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flexDirection: "column",
          textAlign: "center",
          boxShadow: 5,
          p: 2,
          borderRadius: 2,
          background: "white",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img
          loading="lazy"
          style={{ margin: "auto", width: "30%" }}
          src={logo}
          alt="logo"
        />
        <Typography
          variant="h5"
          color="initial"
          sx={{ textAlign: "center", mb: 2 }}
        >
          {t("Log in to your account")}{" "}
        </Typography>
        <Box>
          <TextField
            sx={{ mt: 1, width: "100%" }}
            placeholder="Email"
            label="Email"
            variant="outlined"
            type="email"
            size="small"
            {...register("email", { validate: true })}
            error={errors?.email?.message}
            helperText={errors?.email?.message || ""}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            sx={{ mt: 1, width: "100%" }}
            placeholder="Password"
            type="password"
            label="Password"
            size="small"
            {...register("password")}
            error={errors?.password?.message}
            helperText={errors?.password?.message || ""}
          />
        </Box>
        {loading ? (
          <ButtonLoader
            sx={{
              display: "block",
              mt: 2,
              mb: 1,
            }}
            disableOnLoading
            loading={true}
            disabled={loading}
            fullWidth
          >
            {t("Waiting")}..
          </ButtonLoader>
        ) : (
          <Button
            sx={{
              display: "block",
              mt: 2,
              mb: 1,
            }}
            disabled={loading}
            fullWidth
            type="submit"
            variant="contained"
          >
            {t("Log In")}
          </Button>
        )}
        {error?.errors && Object.keys(error?.errors).length > 0 && (
          <div>
            {Object.keys(error?.errors).map((key, idx) => (
              <Alert key={idx} severity="error">
                {error?.errors[key]}
              </Alert>
            ))}
          </div>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Divider>{t("OR")}</Divider>

        <LoginComponent />
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Box>
            <Typography
              sx={{ textAlign: "center", mt: 2 }}
              variant="body2"
              color="text.secondary"
            >
              {t("Having trouble logging in?")}
            </Typography>
            <Link
              sx={{
                textAlign: "center",
                textDecoration: "underline",
                color: "text.primary",
              }}
              to="/forget-Password"
            >
              {t("Forget Password")}
            </Link>
          </Box>
          <Box>
            <Typography
              sx={{ textAlign: "center", mt: 2 }}
              variant="body2"
              color="text.secondary"
            >
              {t("Don't have account")} ?
            </Typography>
            <Link
              sx={{
                textAlign: "center",
                textDecoration: "underline",
                color: "text.primary",
              }}
              to="/signUp"
            >
              {t("Register")}
            </Link>
          </Box>
        </Box>
      </Box>
      <Box sx={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <LanguageSelector />
      </Box>
    </Box>
  );
}
