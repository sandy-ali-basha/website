import React, { useMemo, useState } from "react";
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
import ButtonLoader from "components/customs/ButtonLoader";
import { useAddressDialog } from "./hooks/useAddressDialog";
import { _countries } from "api/country/countries"; // your region API (actually regions here)

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
    watch,
    setValue,
  } = useAddressDialog({ handleClose });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  console.log("cities", cities);
  // watch selected region to update city list
  const selectedRegion = watch("city");
  console.log("selectedRegion", selectedRegion);

  useMemo(() => {
    _countries.index().then((response) => {
      if (response.code === 200) {
        setCountries(response.data);
      }
    });
  }, []);

  // update cities when region changes
  React.useEffect(() => {
    if (selectedRegion) {
      const selected = countries.find((r) => r.name === selectedRegion);
      setCities(selected?.cities || []);
      setValue("state", ""); // reset city when region changes
    } else {
      setCities([]);
      setValue("state", "");
    }
  }, [selectedRegion, countries, setValue]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        const form = document.querySelector("form");
        if (form) form.reset();
        handleClose();
      }}
      aria-labelledby="alert-dialog-title"
      scroll="paper"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(handleCreate),
      }}
    >
      <DialogTitle id="scroll-dialog-title">{t("Add New Address")}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          {/* FIRST NAME + TITLE */}
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
                  helperText={errors.first_name?.message || ""}
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
                              <MenuItem value="Mr">{t("Mr")}</MenuItem>
                              <MenuItem value="Mrs">{t("Mrs")}</MenuItem>
                              <MenuItem value="Ms">{t("Ms")}</MenuItem>
                              <MenuItem value="Dr">{t("Dr")}</MenuItem>
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

          {/* LAST NAME */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("Last Name")}
              placeholder="Last name"
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors.last_name?.message || ""}
            />
          </Grid>

          {/* REGION (country list actually) */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.city}>
              <Select
                fullWidth
                displayEmpty
                {...register("city")}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  <Box sx={{ color: "text.secondary" }}>
                    {t("Select a Country")}
                  </Box>
                </MenuItem>
                {countries?.map((item) => (
                  <MenuItem value={item.name} key={item.id}>
                    <Box sx={{ color: "text.main" }}>{item.name}</Box>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.city?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {/* state - dynamic based on selected region (city)*/}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.state}>
              <Select
                fullWidth
                displayEmpty
                {...register("state")}
                defaultValue=""
                disabled={!selectedRegion}
              >
                <MenuItem value="" disabled>
                  <Box sx={{ color: "text.secondary" }}>
                    {selectedRegion
                      ? t("Select a city")
                      : t("Select country first")}
                  </Box>
                </MenuItem>
                {cities.length > 0 &&
                  cities?.map((item) => (
                    <MenuItem value={item.name} key={item.id}>
                      <Box sx={{ color: "text.main" }}>{item.name}</Box>
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>{errors.state?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {/* STATE */}
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("State")}
              placeholder="State"
              {...register("state")}
              error={!!errors.state}
              helperText={errors.state?.message || ""}
            />
          </Grid> */}

          {/* CONTACT EMAIL */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("Contact Email")}
              placeholder="john@mail.com"
              {...register("contact_email")}
              error={!!errors.contact_email}
              helperText={errors.contact_email?.message || ""}
            />
          </Grid>

          {/* PHONE */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label={t("Phone Number")}
              placeholder="012 345 1111"
              {...register("contact_phone")}
              error={!!errors.contact_phone}
              helperText={errors.contact_phone?.message || ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">IQ (+964)</InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* ADDRESS */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("Address")}
              placeholder={t("e.g. building name, street #")}
              {...register("line_one")}
              error={!!errors.line_one}
              helperText={errors.line_one?.message || ""}
            />
          </Grid>

          {/* DELIVERY INSTRUCTIONS */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("Delivery Instructions")}
              placeholder={t("Please leave the package at the door")}
              {...register("delivery_instructions")}
              error={!!errors.delivery_instructions}
              helperText={errors.delivery_instructions?.message || ""}
            />
          </Grid>

          {/* DEFAULT ADDRESS CHECKBOX */}
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox onChange={handleChange} />
            <Typography variant="body2">
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
