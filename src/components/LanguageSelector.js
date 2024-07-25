import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { LanguageOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { settingsStore } from "store/settingsStore";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const [direction, setDirection] = settingsStore((state) => [
    state.direction,
    state.setDirection,
  ]);
  
  const handleLanguageChange = (lang) => {
    const newLanguage = lang;
    const newDirection = newLanguage === "ar" || newLanguage === "kr" ? "rtl" : "ltr";
    
    setDirection(newDirection);
    i18n.changeLanguage(newLanguage);
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mx: "10px" }}>
      <Tooltip title={t("Change Language")}>
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <LanguageOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleLanguageChange("en")}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("ar")}>عربي</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("kr")}>کوردی</MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
