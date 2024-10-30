import React, { useState } from "react";
import {
  Card,
  Grid,
  Button,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CardActions,
  Chip,
} from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import "react-credit-cards/es/styles-compiled.css";
import { useAddresses } from "hooks/addresses/useAddresses";
import { useTranslation } from "react-i18next";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";
import DeleteDialog from "./components/DeleteDialog";
import Loader from "components/modules/Loader";

const BillingAddressCard = () => {
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpenDel = (id) => {
    setOpenDel(true);
    setId(id);
  };
  const handleOpenEdit = (id) => {
    setOpenEdit(true);
    setId(id);
  };
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseDel = () => setOpenDel(false);

  const { t } = useTranslation("index");
  const { data = { addresses: [] }, isLoading } = useAddresses();

  return (
    <>
      <EditDialog open={openEdit} handleClose={handleCloseEdit} id={id} />
      <AddDialog open={open} handleClose={handleClose} />
      <DeleteDialog open={openDel} handleClose={handleCloseDel} id={id} />
      <Card sx={{ my: 4, boxShadow: 5, py: 2, px: 1 }}>
        <CardHeader title={t("Billing Address")} />
        <CardContent>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {data?.addresses?.length === 0 && (
                <Typography variant="h5">
                  {t(
                    "You have not added any address yet. Please add a new address."
                  )}
                </Typography>
              )}{" "}
              {data?.addresses?.map((item, idx) => (
                <Grid
                  container
                  key={idx}
                  sx={{
                    border: 1,
                    borderColor: item?.billing_default
                      ? "info.main"
                      : "text.secondary",
                    borderRadius: 3,
                    p: 2,
                    m: 1,
                    backgroundColor: item?.billing_default
                      ? "info.lighter"
                      : "background.paper",
                  }}
                >
                  <Grid
                    item
                    xs="2"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ px: 2, gap: 2 }}
                  >
                    <LocationOnRoundedIcon
                      sx={{ fontSize: "3rem" }}
                      color="secondary.light"
                    />
                    {item?.billing_default && (
                      <Chip
                        color="info"
                        label={t("primary")}
                        sx={{ color: "white" }}
                      />
                    )}
                  </Grid>
                  <Grid item xs="10">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h5">
                        {item?.title} {item.first_name} {item.last_name}
                      </Typography>
                      <div>
                        <Button
                          color="secondary"
                          onClick={() => handleOpenEdit(item?.id)}
                        >
                          {t("Edit")}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleOpenDel(item?.id)}
                        >
                          {t("Delete")}
                        </Button>
                      </div>
                    </Box>
                    <Typography variant="body1">
                      {item?.city}, {item?.state}, {item?.country},{" "}
                      {item?.postcode}
                    </Typography>
                    <Typography variant="body1">{item?.line_one}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <EmailOutlined color="text.secondary" />
                      <Typography variant="body2" color="text.secondary">
                        {item?.contact_mail}
                      </Typography>
                      <PhoneOutlined color="text.secondary" />
                      <Typography variant="body2" color="text.secondary">
                        {item?.contact_phone}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </>
          )}
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={() => handleClickOpen()}>
            {t("Add New Address")}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default BillingAddressCard;
