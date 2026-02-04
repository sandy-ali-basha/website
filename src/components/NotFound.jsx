import { Box, Typography } from "@mui/material";
import notFoundImg from "../assets/images/notFound.svg";
import Seo from "components/Seo";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found."
        keywords="404, not found, Dawaa Alhayat"
      />
      <img
        loading="lazy"
        alt="Not Found"
        style={{ width: "40vw" }}
        src={notFoundImg}
      />
      <Typography variant="h2">Page Not Found</Typography>
    </Box>
  );
};
export default NotFound;
