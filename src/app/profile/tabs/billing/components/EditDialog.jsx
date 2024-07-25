import React, { useEffect, useState } from "react";
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
import { useQuery } from "react-query";
import Loader from "components/modules/Loader";

const EditDialog = ({ open, handleClose, id }) => {
  const {
    hanldeCreate,
    register,
    errors,
    handleChange,
    loading,
    handleSubmit,
    control,
    t,
    setChecked,
  } = useAddressDialog({ handleClose });

  const { data, isLoading } = useQuery(
    ["addresses", `id-${id}`],
    () => _addresses.get(id).then((res) => res), // Ensure you return the data here
    {}
  );

  useEffect(() => {
    setChecked(data?.data?.shipping_default);
  }, []);

  console.log("data", data);
  console.log("isLoading", isLoading);

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
          handleSubmit(hanldeCreate)();
        },
      }}
    >
      <DialogTitle id="scroll-dialog-title">{t("Edit Address")}</DialogTitle>
      <DialogContent sx={{ minHeight: "50vh"}}>
        {isLoading && <Loader />}
        {data && (
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
              <TextField
                fullWidth
                label="City"
                placeholder="City"
                {...register("city")}
                error={!!errors.city}
                helpertext={errors.city ? errors.city.message : ""}
                defaultValue={data?.data?.city}
              />
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
                label="Postcode"
                placeholder="Postcode"
                {...register("postcode")}
                error={!!errors.postcode}
                helpertext={errors.postcode ? errors.postcode.message : ""}
                defaultValue={data?.data?.postcode}
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
                    <InputAdornment position="start">IQ (+964)</InputAdornment>
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
                {...register("deliveryInstructions")}
                error={!!errors.deliveryInstructions}
                helpertext={
                  errors.deliveryInstructions
                    ? errors.deliveryInstructions.message
                    : ""
                }
                defaultValue={data?.data?.deliveryInstructions}
              />
            </Grid>

            <Grid item xs={12}>
              <Checkbox variant="soft" onChange={handleChange} />
              <Typography variant="text.primary">
                {t("Defualt address for shipping")}
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
