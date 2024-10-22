import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import logo from "assets/images/logo.png";
import { useState } from "react";
import ChooseCity from "./ChooseCity";
import { useTranslation } from "react-i18next";

const ChooseCityDialog = () => {
  const [open, setOpen] = useState(localStorage.getItem("city") ? false : true);
  const { t } = useTranslation("index");

  return (
    <Dialog open={open} py="6">
      <DialogContent
        py="6"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img style={{ width: "50%", margin: "1rem auto" }} src={logo} alt="" />
        <DialogContentText textAlign={"center"} sx={{ fontSize: "1.5rem" }}>
          {t("pleas choose city to continue")}
          <ChooseCity />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseCityDialog;
