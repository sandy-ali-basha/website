// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import profileImg from "assets/images/profile.png";
// ** Third Party Imports
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Icon Imports
import Icon from "components/modules/icon";
import CustomTextField from "components/customs/CustomTextField";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

const DeleteAcount = () => {
  // ** State

  const { t } = useTranslation("auth");

  let schema = yup.object().shape({
    checkbox: yup.string().required(t("checkbox is required")),
  });

  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("yes");
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleSecondDialogClose = () => setSecondDialogOpen(false);
  const onSubmit = () => setOpen(true);

  const handleConfirmation = (value) => {
    handleClose();
    setUserInput(value);
    setSecondDialogOpen(true);
  };

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;

  return (
    <Grid container spacing={6} sx={{ mt: 1 }}>
      {/* //* Delete Account Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Delete Account" />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <FormControl>
                  <Controller
                    name="checkbox"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormControlLabel
                        label="I confirm my account deactivation"
                        sx={{
                          "& .MuiTypography-root": {
                            color: errors.checkbox
                              ? "error.main"
                              : "text.secondary",
                          },
                        }}
                        control={
                          <Checkbox
                            {...field}
                            size="small"
                            name="validation-basic-checkbox"
                            sx={
                              errors.checkbox ? { color: "error.main" } : null
                            }
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText
                      id="validation-basic-checkbox"
                      sx={{
                        mx: 0,
                        color: "error.main",
                        fontSize: (theme) => theme.typography.body2.fontSize,
                      }}
                    >
                      Please confirm you want to delete account
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button
                variant="contained"
                color="error"
                type="submit"
                disabled={errors.checkbox !== undefined}
              >
                Deactivate Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Deactivate Account Dialogs */}
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              "& svg": { mb: 6, color: "warning.main" },
            }}
          >
            <Icon icon="tabler:alert-circle" fontSize="5.5rem" />
            <Typography>
              Are you sure you would like to cancel your subscription?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ p: 4 }}
        >
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => handleConfirmation("yes")}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleConfirmation("cancel")}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
      >
        <DialogContent
         sx={{ p: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent:"center",
              "& svg": {
                mb: 8,
                color: userInput === "yes" ? "success.main" : "error.main",
              },
            }}
          >
            <Icon
              fontSize="5.5rem"
              icon={
                userInput === "yes" ? "tabler:circle-check" : "tabler:circle-x"
              }
            />
            <Typography variant="h4" sx={{ mb: 5 }}>
              {userInput === "yes" ? "Deleted!" : "Cancelled"}
            </Typography>
            <Typography>
              {userInput === "yes"
                ? "Your subscription cancelled successfully."
                : "Unsubscription Cancelled!!"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 4 }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleSecondDialogClose}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DeleteAcount;
