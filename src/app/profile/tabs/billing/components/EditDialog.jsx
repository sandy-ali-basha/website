import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  Typography,
  FormControl,
  Box,
  FormHelperText,
} from "@mui/material";
import { _addresses } from "api/addresses/addresses";
import { useQuery } from "react-query";
import Loader from "components/modules/Loader";
import { _cities } from "api/country/country";
import { useEditAddress } from "./hooks/useEditAddress";
import { LoadingButton } from "@mui/lab";
import LocationPicker from "./LocationPicker";

const EditDialog = ({ open, handleClose, id }) => {
  const {
    handleCreate, // Fixed typo here
    register,
    errors,
    handleChange,
    loading,
    handleSubmit,
    control,
    t,
    setChecked,
    setValue,
    watch,
  } = useEditAddress({ handleClose, id });

  const [location, setLocation] = useState();

  const [cities, setCiteies] = useState();
  useMemo(() => {
    _cities.index().then((response) => {
      if (response.code === 200) {
        setCiteies(response.data);
      }
    });
  }, []);

  const { data, isLoading } = useQuery(
    ["addresses", `id-${id}`],
    () =>
      _addresses.get(id).then((res) => {
        return res?.data; // Make sure you're returning the res object
      }),
    {}
  );

  useEffect(() => {
    setLocation(undefined);
  }, [id]);

  useEffect(() => {
    setChecked(data?.data?.shipping_default);
    setValue("first_name", data?.data?.first_name);
  }, [
    data?.data?.first_name,
    data?.data?.shipping_default,
    setChecked,
    setValue,
  ]);

  useEffect(() => {
    if (data?.data?.longitude && data?.data?.latitude) {
      const coords = [Number(data.data.longitude), Number(data.data.latitude)];
      setLocation(coords);
    }
  }, [data]);

  useEffect(() => {
    if (location) {
      setValue("longitude", location[0]);
      setValue("latitude", location[1]);
    }
  }, [location, setValue]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        const form = document.querySelector("form");
        if (form) form.reset();
        handleClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="paper"
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          handleSubmit(handleCreate)(); // Correct reference here
        },
      }}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="scroll-dialog-title">{t("Edit Address")}</DialogTitle>
      <DialogContent
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1,1fr)", md: "repeat(2,1fr)" },
          gap: 2.5,
          alignItems: "center",
        }}
      >
        {isLoading && <Loader />}
        {data && (
          <>
            {location && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  height: { xs: "50dvh", md: "100%" },
                }}
              >
                <Typography variant="subtitle1">
                  {t("Update your location on the map")}
                </Typography>
                <LocationPicker
                  setLocation={setLocation}
                  location={location}
                  isEdit={true}
                />
              </Box>
            )}

            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.first_name}
                      helpertext={
                        errors.first_name ? errors.first_name.message : ""
                      }
                      defaultValue={data?.data?.first_name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Controller
                              name="title"
                              control={control}
                              defaultValue="Mr"
                              render={({ field: titleField }) => (
                                <Select
                                  {...titleField}
                                  displayEmpty
                                  variant="standard"
                                  disableUnderline
                                  defaultValue={data?.data?.title}
                                  sx={{ mr: 1, minWidth: 60 }}
                                  error={!!errors.title}
                                  helpertext={
                                    errors.title ? errors.title.message : ""
                                  }
                                >
                                  <MenuItem value="Mr">Mr</MenuItem>
                                  <MenuItem value="Mrs">Mrs</MenuItem>
                                  <MenuItem value="Ms">Ms</MenuItem>
                                </Select>
                              )}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  placeholder="Last name"
                  {...register("last_name")}
                  error={!!errors.last_name}
                  helpertext={errors.last_name ? errors.last_name.message : ""}
                  defaultValue={data?.data?.last_name}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {cities ? (
                  <FormControl fullWidth>
                    <Select
                      sx={{ borderColor: "text.main" }}
                      {...register("city")}
                      label="city"
                      value={watch("city") || data?.data?.city || ""} // Watch form value or use default from data
                      onChange={(e) => setValue("city", e.target.value)} // Update form state on selection
                    >
                      {cities?.state?.map((item) => (
                        <MenuItem value={item.value} key={item.id}>
                          <Box style={{ color: "text.main" }}>{item.name}</Box>
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {errors.city?.message}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <Typography variant="body2" color="text.main">
                    {t("please add city")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  placeholder="State"
                  {...register("state")}
                  error={!!errors.state}
                  helpertext={errors.state ? errors.state.message : ""}
                  defaultValue={data?.data?.state}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t("Address")}
                  placeholder={t("e.g. building name, street #")}
                  {...register("line_one")}
                  error={!!errors.line_one}
                  helpertext={errors.line_one ? errors.line_one.message : ""}
                  defaultValue={data?.data?.line_one}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  placeholder="jone@mail.com"
                  {...register("contact_email")}
                  error={!!errors.contact_email}
                  helpertext={
                    errors.contact_email ? errors.contact_email.message : ""
                  }
                  defaultValue={data?.data?.contact_mail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Phone Number"
                  placeholder="012 345 1111"
                  {...register("contact_phone")}
                  error={!!errors.contact_phone}
                  helpertext={
                    errors.contact_phone ? errors.contact_phone.message : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        IQ (+964)
                      </InputAdornment>
                    ),
                  }}
                  defaultValue={data?.data?.contact_phone}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Delivery Instructions"
                  placeholder="Please leave the package at the door"
                  {...register("delivery_instructions")}
                  error={!!errors.delivery_instructions}
                  helpertext={
                    errors.delivery_instructions
                      ? errors.delivery_instructions.message
                      : ""
                  }
                  defaultValue={data?.data?.delivery_instructions}
                />
              </Grid>

              <Grid item xs={12}>
                <Checkbox variant="soft" onChange={handleChange} />
                <Typography variant="text.primary">
                  {t("Default address for shipping")}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("Cancel")}</Button>
        <LoadingButton name={t("Submit")} type="submit" loading={loading}>
          {t("Save")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
