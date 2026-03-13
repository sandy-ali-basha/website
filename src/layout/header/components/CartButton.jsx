import React from "react";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";

function CartButton({ cartCount, onClick, t }) {
  return (
    <Box sx={{ mx: "10px" }}>
      <Tooltip title={t("Show Cart")}>
        <IconButton id="basic-button" onClick={onClick}>
          <Badge badgeContent={cartCount} color="primary" size="small">
            <ShoppingCartOutlined sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default CartButton;
