import { Box, Card, Typography } from "@mui/material";
import dollar from "assets/images/dollar.png";
import { useTranslation } from "react-i18next";

const TabPoints = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("userData",userData?.points)
  const {t}=useTranslation("index")
  return (
    
    <Card sx={{ boxShadow: 5, p: 3 }}>
      {userData? <>
        <Typography sx={{ textAlign: "center" }} variant="h4">
        {t("MY POINTS")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          p: 3,
          justifyContent: "cente",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        <img src={dollar} style={{ width: "10vw", height: "10vw" }} alt="" />
        <Typography variant="h1">
          {" "}
          {userData?.points}{" "}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("Point")}
        </Typography>
      </Box></>:<>
      <Typography variant="h1">
          {" "}
      {t("pleas Login to view your points")}
        </Typography>   </>}
      
      <Box sx={{ my: 1 }}>
        <Typography variant="h5" color="initial">
        {t("How to Earn Points?:")}
        </Typography>
        <Typography variant="body1">
       {t("One Point: You will earn one point for every 1,460 Iraqi dinars (IQD) you spend on the Al Rayan website and app.")}
        </Typography>
        <Typography variant="body1">
          {t("50 Points: You will earn 50 points when you register an account.")}
        </Typography>
      </Box>
      <Box sx={{ my: 1 }}>
        <Typography variant="h5" color="initial">
          {t("How to Use Points?:")}
        </Typography>
        <Typography variant="body1">
          {t("Redeeming Points: You can use the points in your reward balance to get discounts on your future purchases in our store.")}
        </Typography>
        <Typography variant="body1">
          {t("Discount Value: For every 100 points you redeem, you will get a discount of 1,460 IQD.")}
        </Typography>
      </Box>
    </Card>
  );
};
export default TabPoints;
