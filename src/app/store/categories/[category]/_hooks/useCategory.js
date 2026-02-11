import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAttributes } from "hooks/attributes/useAttributes";
import { useProducts } from "hooks/Product/useProducts";
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export const useCategory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation("index");
  const navigate = useNavigate();
  const params = useParams();
  const [expandedId, setExpandedId] = useState(null);

  /* ------------------ UI ------------------ */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ------------------ price ------------------ */
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();

  /* ------------------ attributes ------------------ */
  const { data: Attributes, isLoading: AttrLoading } = useAttributes();

  // ✅ multi filters
  const [filters, setFilters] = useState({});

  /* ------------------ payload ------------------ */
  const body = useMemo(
    () => ({
      filters,
      min_price: minValue,
      max_price: maxValue,
    }),
    [filters, minValue, maxValue],
  );

  const { data, isLoading } = useProducts(body);

  /* ------------------ helpers ------------------ */
  const valuetext = (value) => `${value}$`;

  const handleMinChange = (e) => setMinValue(e.target.value);
  const handleMaxChange = (e) => setMaxValue(e.target.value);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  /* ------------------ checkbox handler (🔥 المهم) ------------------ */
  const handleCheked = (attrId, valueId) => {
    setFilters((prev) => {
      const current = prev[attrId] || [];
      const exists = current.includes(valueId);

      return {
        ...prev,
        [attrId]: exists
          ? current.filter((v) => v !== valueId)
          : [...current, valueId],
      };
    });
  };

  /* ------------------ clear ------------------ */
  const ClearFilter = () => {
    setFilters({});
    setMinValue(undefined);
    setMaxValue(undefined);
    setMobileOpen(false);
    navigate("/store", { replace: true });
    setExpandedId(null);
  };

  useEffect(() => {
    if (!params.attr_id) {
      setExpandedId(null);
      return;
    }

    const attrId = Number(params.attr_id);
    const valueIds = params.attr_valueid
      ? params.attr_valueid.split(",").map((id) => Number(id))
      : [];

    setExpandedId(attrId);
    setFilters((prev) => ({
      ...prev,
      [attrId]: valueIds,
    }));
  }, [params.attr_id, params.attr_valueid]);

  return {
    data,
    isLoading,
    isMobile,
    valuetext,
    ClearFilter,
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    handleDrawerToggle,
    params,
    t,
    mobileOpen,
    Attributes,
    AttrLoading,
    handleCheked,
    filters,
    expandedId,
    setExpandedId,
  };
};
