import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import * as yup from "yup";
import Icon from "components/modules/icon";
import { Alert, TextField } from "@mui/material";
import { _AuthApi } from "api/auth";

const defaultValues = {
  password: "",
  current_password: "",
  password_confirmation: "",
};

const schema = yup.object().shape({
  current_password: yup.string().min(8).required("Current password is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
    )
    .required("New password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm new password is required"),
});

const ChangePasswordCard = () => {
  const [values, setValues] = useState({
    showpassword: false,
    showcurrent_password: false,
    showpassword_confirmation: false,
  });
  const [Message, setMessage] = useState();
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleClickShowcurrent_password = () => {
    setValues((prevState) => ({
      ...prevState,
      showcurrent_password: !prevState.showcurrent_password,
    }));
  };

  const handleClickShowpassword = () => {
    setValues((prevState) => ({
      ...prevState,
      showpassword: !prevState.showpassword,
    }));
  };

  const handleClickShowpassword_confirmation = () => {
    setValues((prevState) => ({
      ...prevState,
      showpassword_confirmation: !prevState.showpassword_confirmation,
    }));
  };
  const onPasswordFormSubmit = (data) => {
    console.log(data);
    setLoading(true);
    _AuthApi
      .passEdit(data)
      .then((res) => {
        console.log("res", res);
        if (res?.data?.code === 200) {
          setMessage("Password Changed Successfully");
          reset(defaultValues);
        } else {
          setError(res?.error || "An unexpected error occurred");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader title="Change Password" />
      <CardContent>
        <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="current_password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label="Current Password"
                    placeholder="············"
                    id="input-current-password"
                    error={Boolean(errors.current_password)}
                    type={values.showcurrent_password ? "text" : "password"}
                    helperText={errors.current_password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={handleClickShowcurrent_password}
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={
                                values.showcurrent_password
                                  ? "tabler:eye"
                                  : "tabler:eye-off"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label="New Password"
                    id="input-new-password"
                    placeholder="············"
                    error={Boolean(errors.password)}
                    type={values.showpassword ? "text" : "password"}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowpassword}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={
                                values.showpassword
                                  ? "tabler:eye"
                                  : "tabler:eye-off"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="············"
                    label="Confirm New Password"
                    id="input-confirm-new-password"
                    error={Boolean(errors.password_confirmation)}
                    type={values.showpassword_confirmation ? "text" : "password"}
                    helperText={errors.password_confirmation?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={handleClickShowpassword_confirmation}
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={
                                values.showpassword_confirmation
                                  ? "tabler:eye"
                                  : "tabler:eye-off"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Password Requirements:</Typography>
              <Box
                component="ul"
                sx={{
                  pl: 6,
                  mb: 0,
                  "& li": { mb: 1.5, color: "text.secondary" },
                }}
              >
                <li>Minimum 8 characters long - the more, the better</li>
                <li>At least one lowercase & one uppercase character</li>
                <li>At least one number, symbol, or whitespace character</li>
              </Box>
            </Grid>
            <Box>
              {Message && (
                <Alert sx={{ mt: 1 }} severity="success">
                  {Message}
                </Alert>
              )}
            </Box>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" sx={{ mr: 4 }}>
                Save Changes
              </Button>
              <Button
                type="reset"
                variant="tonal"
                color="secondary"
                onClick={() => reset(defaultValues)}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
