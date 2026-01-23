import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAttributes } from "hooks/attributes/useAttributes";
import { useProducts } from "hooks/Product/useProducts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export const useCategory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation("index");
  const params = useParams();
  const { data: Attributes, isLoading: AttrLoading } = useAttributes();

  const [attr, setAttr] = useState();
  const [attValue, setAttrValue] = useState();

  const body = {
    filters: attr && attValue ? { [attr]: attValue } : {},
    min_price: minValue,
    max_price: maxValue,
  };
  const { data, isLoading } = useProducts(body);

  function valuetext(value) {
    return `${value}$`;
  }

  const handleMinChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxValue(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCheked = (attr, attrValue) => {
    setAttrValue(attrValue);
    setAttr(attr);
  };

  useEffect(() => {
    if (params?.attr_id && params?.attr_valueid) {
      setAttr(params?.attr_id);
      setAttrValue(Number(params?.attr_valueid));
    }
  }, [params?.attr_id, params?.attr_valueid]);

  const navigate = useNavigate();

  const ClearFilter = () => {
    setAttr(undefined);
    setAttrValue(undefined);
    setMinValue(undefined);
    setMaxValue(undefined);
    setMobileOpen(false);
    navigate(`/store`);
  };

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
    attr,
  };
};
