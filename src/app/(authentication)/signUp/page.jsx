import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React from "react";

import img from "../../../assets/images/hero-image (3).jpg";
import logo from "../../../assets/images/logo.png";
import { useSignUp } from "./_hooks/useSignUp";
import ButtonLoader from "components/customs/ButtonLoader";
import GenderSelect from "components/customs/GenderSelect";
import LanguageSelector from "components/LanguageSelector";
import { Link } from "react-router-dom";
import LoginComponent from "../loginGoogle";
function SignUp() {
  const {
    register,
    handleSubmit,
    loading,
    errors,
    details,
    showPassword,
    handleTogglePasswordVisibility,
    error,
    onSubmit,
    t,
  } = useSignUp();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        py: 5,
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
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img
          style={{ margin: "auto", width: "30%", height: "100px" }}
          src={logo}
          alt="logo"
        />
        <Typography
          variant="h5"
          color="initial"
          sx={{ textAlign: "center", mb: 2 }}
        >
          {t("create new account")}{" "}
        </Typography>

        <Box onSubmit={handleSubmit(onSubmit)} component="form">
          <Grid container spacing={1}>
            {details.map((item, index) => (
              <Grid
                item
                xs={
                  (item.name === "first_name") | (item.name === "last_name")
                    ? "6"
                    : "12"
                }
                key={index}
              >
                <TextField
                  sx={{ width: "99%" }}
                  size="small"
                  type={
                    item.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : item.type
                  }
                  placeholder={item.placeholder}
                  label={item.placeholder}
                  name={item.name}
                  {...register(item.register)}
                  error={!!errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                  InputProps={{
                    autoComplete: false,
                    endAdornment: (
                      <InputAdornment position="end">
                        {item.type === "password" && (
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <GenderSelect register={register} errors={errors} />
            </Grid>
            <Alert severity="warning">
              {t(
                "We will handle your personal data as described in our Privacy Policy."
              )}
            </Alert>
          </Grid>
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
            {t("Waiting..")}
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
            {t("Sign Up")}
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
        <Divider>{t("OR")}</Divider>
        <LoginComponent />
        <Box>
          <Typography
            sx={{ textAlign: "center", mt: 2 }}
            variant="body2"
            color="text.secondary"
          >
            {t("already have an account")} ?
          </Typography>
          <Link
            sx={{
              textAlign: "center",
              textDecoration: "underline",
              color: "text.primary",
            }}
            to="/Login"
          >
            {t("Log In")}
          </Link>
        </Box>
      </Box>
      {/* <ConfirmPhoneNum open={open} setOpen={setOpen} id={2} /> */}
      <Box sx={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <LanguageSelector />
      </Box>
    </Box>
  );
}

export default SignUp;
