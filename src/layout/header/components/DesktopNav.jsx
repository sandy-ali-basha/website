import React from "react";
import { Box, Button } from "@mui/material";
import CategoryDropdown from "components/CategoryDropdown";
import BrandsMenu from "./BrandsMenu";

function DesktopNav({
  pages,
  categories,
  brands,
  t,
  brandsAnchorEl,
  isBrandsDropDownOpen,
  onOpenBrandsMenu,
  onCloseBrandsMenu,
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", lg: "flex" },
        justifyContent: "center",
      }}
    >
      {pages.slice(0, 1).map((page) => (
        <Button
          key={page.id}
          onClick={page.onClick}
          sx={{
            my: 2,
            color: "white",
            display: "block",
          }}
        >
          {page.label}
        </Button>
      ))}

      {categories &&
        categories.map((e) => (
          <CategoryDropdown
            key={e.id}
            translations={e.translations}
            items={e.values}
            itemId={e.id}
          />
        ))}

      <BrandsMenu
        brandsAnchorEl={brandsAnchorEl}
        isOpen={isBrandsDropDownOpen}
        onOpen={onOpenBrandsMenu}
        onClose={onCloseBrandsMenu}
        brands={brands}
        t={t}
      />

      {pages.slice(1, 3).map((page) => (
        <Button
          key={page.id}
          onClick={page.onClick}
          sx={{
            my: 2,
            color: "white",
            display: "block",
          }}
        >
          {page.label}
        </Button>
      ))}
    </Box>
  );
}

export default DesktopNav;
