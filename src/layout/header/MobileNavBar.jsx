import React, { useState } from "react";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { _AuthApi } from "api/auth";

const MobileNavBar = ({
  pages,
  categories,
  brands,
  t,
  settings,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const [openCategories, setOpenCategories] = useState({});
  const [openBrands, setOpenBrands] = useState(false);

  const handleCategoryToggle = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleBrandsToggle = () => {
    setOpenBrands(!openBrands);
  };

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Function to get the translated value for the current language
  const getTranslatedValue = (item) => {
    // Try current language first
    let translation = item.translations?.find(
      (t) => t.locale === currentLanguage
    );

    // Fallback to English if not found
    if (!translation) {
      translation = item.translations?.find((t) => t.locale === "en");
    }

    // Final fallback to default value
    return translation?.value || item.value;
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  }));

  return (
    <>
      <IconButton
        size="large"
        aria-label="menu"
        onClick={handleDrawerToggle}
        sx={{ color: "white" }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor={"left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 350,
            maxWidth: "100dvw",
            backgroundColor: "background.paper",
            padding: 2,
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {/* Pages */}
          {pages.slice(0, 2).map((page) => (
            <ListItem key={page.id} disablePadding>
              <ListItemButton onClick={page.onClick}>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Categories */}
          {categories &&
            categories.map((category) => (
              <React.Fragment key={category.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    <ListItemText
                      primary={
                        category.translations.find(
                          (t) => t.locale === currentLanguage
                        )?.title || category.title
                      }
                    />
                    {openCategories[category.id] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={openCategories[category.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {category.values.map((item) => (
                      <ListItem key={item.id} sx={{ pl: 4 }} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={`/store/${category.id}/${item.id}`}
                        >
                          <ListItemText primary={getTranslatedValue(item)} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}

          {/* Brands */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleBrandsToggle}>
              <ListItemText primary={t("Brands")} />
              {openBrands ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openBrands} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {brands &&
                brands.map((brand) => (
                  <ListItem key={brand.id} sx={{ pl: 4 }} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={
                        brand.havePage
                          ? `/store/categories/brand/${brand.id}`
                          : "#"
                      }
                      onClick={handleDrawerToggle}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <img
                          loading="lazy"
                          src={brand.images[0]}
                          alt={brand.name}
                          style={{
                            width: 40,
                            height: 40,
                            objectFit: "contain",
                          }}
                        />
                        <ListItemText primary={t(brand.name)} />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Collapse>

          {/* Contact Page */}
          {pages[2] && (
            <ListItem disablePadding>
              <ListItemButton onClick={pages[2].onClick}>
                <ListItemText primary={pages[2].label} />
              </ListItemButton>
            </ListItem>
          )}
        </List>

        <Box
          sx={{ display: { xs: "block", lg: "none" }, mt: "auto", mx: "10px" }}
        >
          {!_AuthApi.getToken() && (
            <Button variant="contained" sx={{ padding: 0, width: "100%" }}>
              <Link
                to="/login"
                style={{
                  color: "white",
                  display: "block",
                  textDecoration: "none",
                  fontSize: { xs: "10px", sm: "14px" },
                  padding: "8px 12px",
                  width: "100%",
                }}
              >
                {t("sign in")}
              </Link>
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default MobileNavBar;
