import React, { useState } from "react";
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
} from "@mui/material";
import { _addresses } from "api/addresses/addresses";
import ButtonLoader from "components/customs/ButtonLoader";
import { useAddressDialog } from "./hooks/useAddressDialog";

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
  } = useAddressDialog({ handleClose });

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
        onSubmit: handleSubmit(handleCreate),
      }}
    >
      <DialogTitle id="scroll-dialog-title">{t("Add New Address")}</DialogTitle>
      <DialogContent>
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
                  helperText={
                    errors.first_name ? errors.first_name.message : ""
                  }
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
                              error={!!errors.title}
                              helperText={
                                errors.title ? errors.title.message : ""
                              }
                            >
                              <MenuItem value="Mr">Mr</MenuItem>
                              <MenuItem value="Mrs">Mrs</MenuItem>
                              <MenuItem value="Ms">Ms</MenuItem>
                              <MenuItem value="Dr">Dr</MenuItem>
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
              helperText={errors.last_name ? errors.last_name.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Email"
              placeholder="jone@mail.com"
              {...register("contact_email")}
              error={!!errors.contact_email}
              helperText={
                errors.contact_email ? errors.contact_email.message : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              placeholder="City"
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city ? errors.city.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              placeholder="State"
              {...register("state")}
              error={!!errors.state}
              helperText={errors.state ? errors.state.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postcode"
              placeholder="Postcode"
              {...register("postcode")}
              error={!!errors.postcode}
              helperText={errors.postcode ? errors.postcode.message : ""}
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
              helperText={
                errors.contact_phone ? errors.contact_phone.message : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">IQ (+964)</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("Address")}
              placeholder={t("e.g. building name, street #")}
              {...register("line_one")}
              error={!!errors.line_one}
              helperText={errors.line_one ? errors.line_one.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Delivery Instructions"
              placeholder="Please leave the package at the door"
              {...register("deliveryInstructions")}
              error={!!errors.deliveryInstructions}
              helperText={
                errors.deliveryInstructions
                  ? errors.deliveryInstructions.message
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Checkbox variant="soft" onChange={handleChange} />
            <Typography variant="text.primary">
              {t("Defualt address for shipping")}
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
