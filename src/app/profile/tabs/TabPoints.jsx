import { Box, Card, Typography } from "@mui/material";
import dollar from "assets/images/dollar.png";
import { usePoints } from "hooks/points/usePoints";
import { _axios } from "interceptor/http-config";
import { useTranslation } from "react-i18next";

const TabPoints = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { t } = useTranslation("index");
  const { data } = usePoints();

  console.log(data);
  return (
    <Card sx={{ boxShadow: 5, p: 3 }}>
      {userData ? (
        <>
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
            <img
              src={dollar}
              style={{ width: "10vw", height: "10vw" }}
              alt=""
            />
            <Typography variant="h1"> {data?.points} </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("Point")}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h3">
            {" "}
            {t("pleas Login to view your points")}
          </Typography>{" "}
        </>
      )}

      <Box sx={{ my: 1 }}>
        <Typography variant="h5" color="initial">
          {t("How to Earn Points?:")}
        </Typography>
        <Typography variant="body1">
          {t(
            "You will earn one point for every 1,500 IQD you spend on Dawaa Al Hayat's website."
          )}
        </Typography>
      </Box>
      <Box sx={{ my: 1 }}>
        <Typography variant="h5" color="initial">
          {t("How to Use Points?:")}
        </Typography>
        <Typography variant="body1">
          {t(
            "You can use your points in your reward balance to receive discounts on your future purchases on our website. For every 100 points you redeem, you will receive a discount of 1,500 IQD"
          )}
        </Typography>
      </Box>
    </Card>
  );
};
export default TabPoints;
