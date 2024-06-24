import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Divider,
  Grid,
  InputAdornment,
  IconButton,
  Link,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Apple,
  Facebook,
  Google,
} from "@mui/icons-material";
import React from "react";

import img from "../../../assets/images/hero-image (3).jpg";
import logo from "../../../assets/images/logo.svg";
import { useSignUp } from "./_hooks/useSignUp";
import ConfirmPhoneNum from "./_components/ConfirmPhoneNum";
import ButtonLoader from "components/customs/ButtonLoader";
import GenderSelect from "components/customs/GenderSelect";
function SignUp() {
  const {
    register,
    handleSubmit,
    loading,
    errors,
    details,
    showPassword,
    handleTogglePasswordVisibility,
    open,
    setOpen,
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
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img
          style={{ margin: "auto", width: "100%", height: "100px" }}
          src={logo}
          alt="logo"
        />
        <Typography
          variant="h5"
          color="initial"
          sx={{ textAlign: "center", mb: 2 }}
        >
          create new account{" "}
        </Typography>
        <Box onSubmit={handleSubmit(onSubmit)} component="form">
          {details.map((item, index) => (
            <Box key={index} sx={{ pt: 1 }}>
              <TextField
                sx={{ width: "100%" }}
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
            </Box>
          ))}
          <Box sx={{ pt: 1 }}>
            <GenderSelect register={register} errors={errors} />
          </Box>
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
            Waiting..
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
        <Divider>OR</Divider>
        <Button
          variant="outlined"
          sx={{
            color: "text.primary",
            borderColor: "white",
            boxShadow: 3,
            width: "100%",
            mt: 1,
            py: 1,
          }}
          startIcon={<Google />}
        >
          Sign Up With Google
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "text.primary",
            borderColor: "white",
            boxShadow: 3,
            width: "100%",
            mt: 1,
            py: 1,
          }}
          startIcon={<Apple />}
        >
          Sign Up With Apple
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "text.primary",
            borderColor: "white",
            boxShadow: 3,
            width: "100%",
            mt: 1,
            py: 1,
          }}
          startIcon={<Facebook />}
        >
          Sign Up With Facebook
        </Button>
        <Box>
          <Typography
            sx={{ textAlign: "center", mt: 2 }}
            variant="body2"
            color="text.secondary"
          >
            already have an account ?
          </Typography>
          <Link
            sx={{
              textAlign: "center",
              textDecoration: "underline",
              color: "text.primary",
            }}
            href="/Login"
          >
            Log In
          </Link>
        </Box>
      </Box>
      <ConfirmPhoneNum open={open} setOpen={setOpen} id={2} />
    </Box>
  );
}

export default SignUp;
