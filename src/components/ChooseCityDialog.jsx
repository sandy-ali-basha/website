import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import logo from "assets/images/logo.png";
import ChooseCity from "./ChooseCity";
import { useTranslation } from "react-i18next";

const ChooseCityDialog = ({ open, setOpen, description }) => {
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

        <DialogContentText textAlign={"center"} sx={{ fontSize: "1.1rem" }}>
          {description || t("Select your city for a customized shopping journey")}
        </DialogContentText>

        <ChooseCity onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseCityDialog;
