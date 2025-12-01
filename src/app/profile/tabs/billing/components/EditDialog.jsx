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
import ButtonLoader from "components/customs/ButtonLoader";
import { useQuery } from "react-query";
import Loader from "components/modules/Loader";
import { _countries } from "api/country/countries"; // regions API
import { useEditAddress } from "./hooks/useEditAddress";

const EditDialog = ({ open, handleClose, id }) => {
  const {
    handleCreate,
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

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedRegion = watch("region");

  // Fetch regions (countries)
  useMemo(() => {
    _countries.index().then((response) => {
      if (response.code === 200) {
        setRegions(response.data);
      }
    });
  }, []);

  // Fetch existing address
  const { data, isLoading } = useQuery(
    ["addresses", `id-${id}`],
    () =>
      _addresses.get(id).then((res) => res?.data),
    {}
  );

  // Preload form values once address data is available
  useEffect(() => {
    if (data?.data) {
      const addr = data.data;
      setChecked(addr.shipping_default);
      setValue("first_name", addr.first_name || "");
      setValue("last_name", addr.last_name || "");
      setValue("title", addr.title || "Mr");
      setValue("contact_email", addr.contact_mail || "");
      setValue("contact_phone", addr.contact_phone || "");
      setValue("line_one", addr.line_one || "");
      setValue("delivery_instructions", addr.delivery_instructions || "");
      setValue("state", addr.state || "");

      // --- REGION NAME instead of ID ---
    if (addr.region) {
      setValue("region", addr.region);

      const selected = regions.find((r) => r.name === addr.region);
      if (selected) {
        setCities(selected.cities || []);
      }
    }

    // --- CITY NAME instead of ID ---
    if (addr.city) {
      setValue("city", addr.city);
    }
    }
  }, [data?.data, regions, setChecked, setValue]);

  // When region changes manually
  useEffect(() => {
    if (selectedRegion) {
      const selected = regions.find((r) => r.name === selectedRegion);
      setCities(selected?.cities || []);
      setValue("city", "");
    } else {
      setCities([]);
      setValue("city", "");
    }
  }, [selectedRegion, regions, setValue]);

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
        onSubmit: (event) => {
          event.preventDefault();
          handleSubmit(handleCreate)();
        },
      }}
    >
      <DialogTitle id="scroll-dialog-title">{t("Edit Address")}</DialogTitle>
      <DialogContent sx={{ minHeight: "50vh" }}>
        {isLoading && <Loader />}
        {data && (
          <Grid container spacing={2} sx={{ pt: 1 }}>
            {/* First Name + Title */}
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

            {/* Last Name */}
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

            {/* Region */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.region}>
                <Select
                  fullWidth
                  displayEmpty
                  {...register("region")}
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    <Box sx={{ color: "text.secondary" }}>
                      {t("Select a country")}
                    </Box>
                  </MenuItem>
                  {regions.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      <Box sx={{ color: "text.main" }}>{item.name}</Box>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.region?.message}</FormHelperText>
              </FormControl>
            </Grid>

            {/* City - depends on region */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.city}>
                <Select
                  fullWidth
                  displayEmpty
                  {...register("city")}
                  disabled={!selectedRegion}
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    <Box sx={{ color: "text.secondary" }}>
                      {selectedRegion
                        ? t("Select a city")
                        : t("Select country first")}
                    </Box>
                  </MenuItem>
                  {cities.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      <Box sx={{ color: "text.main" }}>{item.name}</Box>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.city?.message}</FormHelperText>
              </FormControl>
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("State")}
                placeholder="State"
                {...register("state")}
                error={!!errors.state}
                helperText={errors.state?.message || ""}
              />
            </Grid>

            {/* Contact Email */}
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

            {/* Phone Number */}
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

            {/* Address */}
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

            {/* Delivery Instructions */}
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

            {/* Default Address */}
            <Grid item xs={12}>
              <Checkbox onChange={handleChange} />
              <Typography variant="body2">
                {t("Default address for shipping")}
              </Typography>
            </Grid>
          </Grid>
        )}
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

export default EditDialog;