import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAttributes } from "hooks/attributes/useAttributes";
import { useProducts } from "hooks/Product/useProducts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export const useCategory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState("");
  const { t } = useTranslation("index");
  const params = useParams();
  const { data: Attr, isLoading: AttrLoading } = useAttributes();
  const [attr, setAttr] = useState();
  const [attValue, setAttrValue] = useState();

  const price0 = value[0];
  const price1 = value[1];

  const body = {
    filters: {
      [attr]: attValue,
    },
    min_price: price0,
    max_price: price1,
    // brand_id: "null",
    // product_type_id: "null",
  };

  const { data, isLoading } = useProducts(body);

  function valuetext(value) {
    return `${value}$`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCheked = (attr, attrValue) => {
    setAttrValue(attrValue);
    setAttr(attr);
  };

  return {
    data,
    isLoading,
    isMobile,
    value,
    sort,
    valuetext,
    handleChange,
    handleSortChange,
    handleDrawerToggle,
    params,
    t,
    mobileOpen,
    Attr,
    AttrLoading,
    handleCheked,
    attr
  };
};
