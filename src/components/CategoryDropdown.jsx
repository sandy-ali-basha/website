import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CategoryDropdown = ({ translations, items, itemId, image }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Get current language (e.g., "en", "ar", "kr")
  const imageUrl = image?.startsWith("http")
    ? image
    : image
      ? `https://v2.dawaaalhayat.com${image}`
      : null;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <div>
      <Button
        id={translations.find((t) => t.locale === currentLanguage)?.title}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          my: 2,
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        {imageUrl && (
          <img
            loading="lazy"
            src={imageUrl}
            alt={translations.find((t) => t.locale === currentLanguage)?.title}
            style={{
              width: 24,
              height: 24,
              objectFit: "contain",
              marginRight: 8,
            }}
          />
        )}
        {translations.find((t) => t.locale === currentLanguage)?.title}{" "}
        {open ? (
          <KeyboardArrowUp fontSize="small" />
        ) : (
          <KeyboardArrowDown fontSize="small" />
        )}
      </Button>
      <Menu
        id={translations.find((t) => t.locale === currentLanguage)?.title}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => setAnchorEl(null)}
            sx={{ p: 0 }}
          >
            <Link
              to={`/store/${itemId}/${item.id}`}
              style={{
                textDecoration: "none",
                color: "#313131",
                display: "block",
                flex: 1,
                padding: "10px 15px",
              }}
            >
              {getTranslatedValue(item)}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CategoryDropdown;
