import { useState } from "react";

export const useNavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCart, setAnchorElCart] = useState(null);
  const openCart = Boolean(anchorElCart);
  const changeLanguage = () => {
    console.log("change language");
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
  };
};
