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
  InputLabel,
} from "@mui/material";

import ButtonLoader from "components/customs/ButtonLoader";
import LocationPicker from "./LocationPicker";
import { useAddressDialog } from "./hooks/useAddressDialog";
import { _cities } from "api/country/country";

const AddDialog = ({ open, handleClose }) => {
  const {
    handleCreate,
    register,
    errors,
    handleChange,
    loading,
    handleSubmit,
    control,
    t,
    setValue,
  } = useAddressDialog({ handleClose });

  const [cities, setCities] = useState();
  const [location, setLocation] = useState([
    4899113.013567734, 4326807.948463461,
  ]); // Default coordinates (Erbil center)

  console.log("location: ", location);

  useMemo(() => {
    _cities.index().then((response) => {
      if (response.code === 200) {
        setCities(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (location) {
      setValue("longitude", location[0]);
      setValue("latitude", location[1]);
    }
  }, [location, setValue]);

  const resetOnClose = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={resetOnClose}
      scroll="paper"
      aria-labelledby="add-address-dialog-title"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(handleCreate),
      }}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="add-address-dialog-title">
        {t("Add New Address")}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1,1fr)", md: "repeat(2,1fr)" },
          gap: 2.5,
          alignItems: "center",
        }}
      >
        {/* Map picker */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            height: { xs: "50dvh", md: "100%" },
          }}
        >
          <Typography variant="subtitle1">
            {t("Add your location on the map")}
          </Typography>
          <LocationPicker setLocation={setLocation} locaiton={location} />
        </Box>

        {/* Address form */}
        <Grid container spacing={2} sx={{ pt: 1 }}>
          {/* Name and Title */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("First Name")}
                  variant="outlined"
                  fullWidth
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
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
                              sx={{ mr: 1, minWidth: 60 }}
                            >
                              {["Mr", "Mrs", "Ms", "Dr"].map((label) => (
                                <MenuItem key={label} value={label}>
                                  {t(label)}
                                </MenuItem>
                              ))}
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
              {...register("last_name")}
              fullWidth
              label={t("Last Name")}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("contact_email")}
              fullWidth
              label={t("Contact Email")}
              placeholder="jone@mail.com"
              error={!!errors.contact_email}
              helperText={errors.contact_email?.message}
            />
          </Grid>

          {/* City selection */}
          <Grid item xs={12}>
            {cities ? (
              <FormControl fullWidth>
                <InputLabel id="city-label">{t("city")}</InputLabel>
                <Select
                  labelId="city-label"
                  label={t("city")}
                  {...register("city")}
                  sx={{ color: "text.main" }}
                >
                  {cities?.state?.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      <Box color="text.main">{item.name}</Box>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{errors.city?.message}</FormHelperText>
              </FormControl>
            ) : (
              <Typography variant="body2">{t("Please add cities")}</Typography>
            )}
          </Grid>

          {/* Other address fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("state")}
              fullWidth
              label={t("State")}
              placeholder="State"
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("contact_phone")}
              fullWidth
              type="number"
              label={t("Phone Number")}
              placeholder="012 345 1111"
              error={!!errors.contact_phone}
              helperText={errors.contact_phone?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">IQ (+964)</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("line_one")}
              fullWidth
              label={t("Address")}
              placeholder={t("e.g. building name, street #")}
              error={!!errors.line_one}
              helperText={errors.line_one?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("delivery_instructions")}
              fullWidth
              label={t("Delivery Instructions")}
              placeholder={t("Please leave the package at the door")}
              error={!!errors.delivery_instructions}
              helperText={errors.delivery_instructions?.message}
            />
          </Grid>

          {/* Default address */}
          <Grid item xs={12}>
            <Checkbox variant="soft" onChange={handleChange} />
            <Typography variant="body1">
              {t("Default address for shipping")}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>{t("Cancel")}</Button>
        <ButtonLoader
          name={t("Submit")}
          type="submit"
          loading={loading}
          disableOnLoading
        >
          {t("Save")}
        </ButtonLoader>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
