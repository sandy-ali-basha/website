import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// Helper function to render product variants
const RenderVariants = ({ options }) => {
  const { t } = useTranslation("index");

  if (!options || options.length === 0) return null;

  const variantString = options.map((option) => option.name).join(" - ");

  // Ignore default variants
  if (variantString === "default - default") return null;

  return (
    <Typography
      variant="caption"
      sx={{ color: "text.secondary", display: "block" }}
    >
      {t("options")}: {variantString}
    </Typography>
  );
};

export default RenderVariants;
