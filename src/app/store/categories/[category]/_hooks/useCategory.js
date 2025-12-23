import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAttributes } from "hooks/attributes/useAttributes";
import { useProducts } from "hooks/Product/useProducts";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export const useCategory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState({});
  console.log("selectedAttributes", selectedAttributes);
  const { t } = useTranslation("index");
  const params = useParams();
  const { data: Attr, isLoading: AttrLoading } = useAttributes();

  // 🧮 build filters body dynamically
  const body = useMemo(() => {
    return {
      filters: selectedAttributes,
      min_price: minValue || undefined,
      max_price: maxValue || undefined,
    };
  }, [selectedAttributes, minValue, maxValue]);

  const { data, isLoading } = useProducts(body);

  function valuetext(value) {
    return `${value}$`;
  }

  const handleMinChange = (e) => setMinValue(e.target.value);
  const handleMaxChange = (e) => setMaxValue(e.target.value);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // ✅ allow multiple values per attribute
  const handleCheked = (attrId, attrValue) => {
    setSelectedAttributes((prev) => {
      const currentValues = prev[attrId] || [];
      const exists = currentValues.includes(attrValue);
      return {
        ...prev,
        [attrId]: exists
          ? currentValues.filter((v) => v !== attrValue)
          : [...currentValues, attrValue],
      };
    });
  };

  // ✅ Reset everything
  const ClearFilter = () => {
    setMinValue("");
    setMaxValue("");
    setSearchResults([]);
    setSort("");
    setSelectedAttributes({});
    setMobileOpen(false);
  };

  return {
    data,
    isLoading,
    isMobile,
    sort,
    valuetext,
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    handleDrawerToggle,
    params,
    t,
    mobileOpen,
    Attr,
    AttrLoading,
    handleCheked,
    searchResults,
    setSearchResults,
    ClearFilter,
    selectedAttributes,
  };
};
