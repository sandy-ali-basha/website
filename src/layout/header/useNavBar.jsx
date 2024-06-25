import { useState } from "react";
import { useTranslation } from "react-i18next";
import { settingsStore } from "store/settingsStore";

export const useNavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCart, setAnchorElCart] = useState(null);
  const { t, i18n } = useTranslation("navbar");

  const openCart = Boolean(anchorElCart);
  
  const [direction, setDirection] = settingsStore((state) => [
    state.direction,
    state.setDirection,
  ])

  const changeLanguage = () => {
    const newLanguage = direction === "ltr" ? "ar" : (i18n.language === "ar" ? "kr" : "en");
    const newDirection = newLanguage === "ar" || newLanguage === "kr" ? "rtl" : "ltr";
    setDirection(newDirection);
    console.log('language', newLanguage, 'direction', newDirection);
    i18n?.changeLanguage(newLanguage);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCartMenu = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return {
    changeLanguage,
    handleCloseCartMenu,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleOpenCartMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    anchorElNav,
    anchorElUser,
    anchorElCart,
    openCart,
    i18n,
    t
  };
};
