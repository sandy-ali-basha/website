import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";

function BrandsMenu({
  brandsAnchorEl,
  isOpen,
  onOpen,
  onClose,
  brands,
  t,
}) {
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={isOpen ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={onOpen}
        sx={{
          my: 2,
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        {t("Brands")}
        {isOpen ? (
          <KeyboardArrowUp fontSize="small" />
        ) : (
          <KeyboardArrowDown fontSize="small" />
        )}
      </Button>

      <Menu
        id="demo-positioned-menu"
        anchorEl={brandsAnchorEl}
        open={isOpen}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {brands &&
          brands?.map((e) => (
            <MenuItem key={e.id} onClick={onClose}>
              <Link
                to={e.havePage ? `/store/categories/brand/${e.id}` : "#"}
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "#313131",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    paddingRight: "10px",
                  }}
                >
                  <img
                    loading="lazy"
                    src={e.images[0]}
                    alt={e.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                {t(e.name)}
              </Link>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

export default BrandsMenu;
