import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useProducts } from "hooks/Product/useProducts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export const useCategory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState([20, 37]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState("");
  const { t } = useTranslation("index");

  const price0 = value[0];
  const price1 = value[1];

  const { data, isLoading } = useProducts(
    price0,
    price1
  );
console.log(data)
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

  const params = useParams();

  // const data = {
  //   Products: {
  //     name: "Sale",
  //     items: [
  //       {
  //         id: "0",
  //         img: "https://picsum.photos/200/314",
  //         price: "5101",
  //         label: "product 0",
  //       },
  //       {
  //         id: "1",
  //         img: "https://picsum.photos/200/301",
  //         price: "5000",
  //         label: "Label_for_Sale_Item_2",
  //       },
  //       {
  //         id: "2",
  //         img: "https://picsum.photos/200/322",
  //         price: "5202",
  //         label: "product 1",
  //       },
  //       {
  //         id: "3",
  //         img: "https://picsum.photos/200/333",
  //         price: "5303",
  //         label: "Label_for_Sale_Item_2",
  //       },
  //       {
  //         id: "4",
  //         img: "https://picsum.photos/200/330",
  //         price: "5404",
  //         label: "product 2",
  //       },
  //       {
  //         id: "5",
  //         img: "URL_to_Sale_Item_2_Image",
  //         price: "5505",
  //         label: "Label_for_Sale_Item_2",
  //       },
  //       {
  //         id: "6",
  //         img: "https://picsum.photos/200/335",
  //         price: "5606",
  //         label: "product 3",
  //       },
  //       {
  //         id: "7",
  //         img: "URL_to_Sale_Item_2_Image",
  //         price: "5707",
  //         label: "Label_for_Sale_Item_2",
  //       },
  //     ],
  //   },
  // };
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
  };
};
