// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// ** Third Party Imports
import { useForm, Controller } from "react-hook-form";

// ** Styles Import
import "react-credit-cards/es/styles-compiled.css";
import CustomTextField from "components/customs/CustomTextField";
import {
  Box,
  CardActions,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

const defaultValues = {
  companyName: "",
  billingEmail: "",
};

const BillingAddressCard = () => {
  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // // ** Hooks
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ defaultValues });

  // const onSubmit = () => {
  //   return;
  // };

  return (
    <>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll="paper"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit(onSubmit);
            handleClose();
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">Add New Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="AddressName"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label="Address Name"
                    placeholder="Pixinvent"
                    error={Boolean(errors.companyName)}
                    {...(errors.companyName && {
                      helperText: "This field is required",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="AddressEmail"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type="email"
                    value={value}
                    onChange={onChange}
                    label="Address Email"
                    placeholder="john.doe@example.com"
                    error={Boolean(errors.billingEmail)}
                    {...(errors.billingEmail && {
                      helperText: "This field is required",
                    })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="VAT Number?"
                placeholder="Enter VAT Number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type="number"
                label="Phone Number"
                placeholder="202 555 0111"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">US (+1)</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label="Country"
                defaultValue="australia"
              >
                <MenuItem value="australia">Australia</MenuItem>
                <MenuItem value="canada">Canada</MenuItem>
                <MenuItem value="france">France</MenuItem>
                <MenuItem value="united-kingdom">United Kingdom</MenuItem>
                <MenuItem value="united-states">United States</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label="City"
                defaultValue="australia"
              >
                <MenuItem value="australia">Australia</MenuItem>
                <MenuItem value="canada">Canada</MenuItem>
                <MenuItem value="france">France</MenuItem>
                <MenuItem value="united-kingdom">United Kingdom</MenuItem>
                <MenuItem value="united-states">United States</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="State"
                placeholder="California"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Address"
                placeholder="Address"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ my: 4, boxShadow: 5 ,py:2, px:1}}>
        <CardHeader title="Billing Address" />
        <CardContent>
          <Grid
            container
            sx={{
              border: 1,
              borderColor: "secondary.main",
              borderRadius: 3,
              p: 2,
              background: "secondary.lighter",
            }}
          >
            <Grid
              item
              xs="2"
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ px: 2, gap: 2 }}
            >
              <LocationOnRoundedIcon
                sx={{ fontSize: "3rem" }}
                color="secondary"
              />
              <Chip color="secondary" label="primary" sx={{ color: "white" }} />
            </Grid>
            <Grid item xs="10">
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="h5">Ellen Cho</Typography>
                <div>
                  {" "}
                  <Button color="secondary" onClick={handleClickOpen}>
                    Edit
                  </Button>
                  <Button size="small" color="error">Delete</Button>

                </div>
              </Box>
              <Typography variant="body1">
                P Compound, Building 16, Floor 55, Apt 42 3273431 - First 6th of
                October - First 6th of October - Giza Governorate{" "}
              </Typography>
              <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                +1080749941
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              border: 1,
              my: 1,
              borderRadius: 3,
              p: 2,
              borderColor: "text.secondary",
            }}
          >
            <Grid
              item
              xs="2"
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ px: 2, gap: 2 }}
            >
              <LocationOnRoundedIcon
                sx={{ fontSize: "3rem" }}
                color="secondary"
              />
            </Grid>
            <Grid sx={{ my: 1 }} item xs="10">
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="h5">Ellen Cho</Typography>
                <div>
                  <Button>Mark as defualt</Button>
                  <Button color="secondary" onClick={handleClickOpen}>
                    Edit
                  </Button>
                  <Button size="small" color="error">Delete</Button>
                </div>
              </Box>
              <Typography variant="body1">
                P Compound, Building 16, Floor 55, Apt 42 3273431 - First 6th of
                October - First 6th of October - Giza Governorate{" "}
              </Typography>
              <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                +1080749941
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add New Address
          </Button>
        </CardActions>
      </Card> */}
    </>
  );
};

export default BillingAddressCard;
