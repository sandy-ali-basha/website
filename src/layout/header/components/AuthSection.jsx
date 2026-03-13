import React from "react";
import { Box, Button } from "@mui/material";
import { PersonOutlineOutlined } from "@mui/icons-material";
import MenuButton from "components/modules/NavBar/MenuButton";
import { _AuthApi } from "api/auth";

function AuthSection({ settings, t, navigate }) {
  return (
    <Box>
      {_AuthApi.getToken() ? (
        <MenuButton
          icon={<PersonOutlineOutlined sx={{ color: "white" }} />}
          menuItems={settings.map((item) => ({
            ...item,
            key: item.id,
          }))}
          sx={{ mx: "10px" }}
        />
      ) : (
        <Button
          onClick={() => navigate("/login")}
          sx={{
            my: 2,
            color: "white",
            fontSize: { xs: "10px", sm: "14px" },
            display: { xs: "none", lg: "block" },
          }}
        >
          {t("sign in")}
        </Button>
      )}
    </Box>
  );
}

export default AuthSection;
