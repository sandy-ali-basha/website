import { Box, Card,  Typography } from "@mui/material";
import dollar from "assets/images/dollar.png";

const TabPoints = () => {
  return (
    <Card sx={{ boxShadow: 5, p: 3 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        MY POINTS
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
        <img src={dollar} style={{ width: "10vw", height: "10vw" }} />
        <Typography variant="h1">56</Typography>
        <Typography variant="body2" color="text.secondary">
          Point
        </Typography>
      </Box>
      <Box sx={{ my: 1 }}>
        <Typography variant="h5" color="initial">
          How to Earn Points?:
        </Typography>
        <Typography variant="body1">
          One Point: You will earn one point for every 1,460 Iraqi dinars (IQD)
          you spend on the Al Rayan website and app.
        </Typography>
        <Typography variant="body1">
          100 Points: You will earn 100 points for writing a review.
        </Typography>
        <Typography variant="body1">
          50 Points: You will earn 50 points when you register an account.
        </Typography>
      </Box>
      <Box sx={{ my: 1 }}>
        <Typography variant="h5" color="initial">
          How to Use Points?:
        </Typography>
        <Typography variant="body1">
          Redeeming Points: You can use the points in your reward balance to get
          discounts on your future purchases in our store.
        </Typography>
        <Typography variant="body1">
          Discount Value: For every 100 points you redeem, you will get a
          discount of 1,460 IQD.
        </Typography>
      </Box>
    </Card>
  );
};
export default TabPoints;
