import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useBrand } from "hooks/brands/useBrand";

export const useCategories = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  const data = {
    categories: [
      {
        name: "Sale",
        items: [
          {
            img: "https://picsum.photos/200/314",
            link: "URL_to_Sale_Item_1_Page",
            label: "Label 3",
          },
          {
            img: "https://picsum.photos/200/301",
            link: "URL_to_Sale_Item_2_Page",
            label: "Label 1",
          },
          {
            img: "https://picsum.photos/200/322",
            link: "URL_to_Sale_Item_1_Page",
            label: "Label 2",
          },
          {
            img: "https://picsum.photos/200/333",
            link: "URL_to_Sale_Item_2_Page",
            label: "Label 0",
          },
          {
            img: "https://picsum.photos/200/330",
            link: "URL_to_Sale_Item_1_Page",
            label: "Label 4",
          },
          {
            img: "URL_to_Sale_Item_2_Image",
            link: "URL_to_Sale_Item_2_Page",
            label: "Label 5",
          },
          {
            img: "https://picsum.photos/200/335",
            link: "URL_to_Sale_Item_1_Page",
            label: "Label 6",
          },
          {
            img: "URL_to_Sale_Item_2_Image",
            link: "URL_to_Sale_Item_2_Page",
            label: "Label 7",
          },
        ],
      },
      {
        name: "Supplements",
        items: [
          {
            img: "https://picsum.photos/200/346",
            link: "URL_to_Multivitamin_Page",
            label: "Multivitamin",
          },
          {
            img: "https://picsum.photos/200/357",
            link: "URL_to_Diabetes_Supplement_Page",
            label: "Diabetes Supplement",
          },
          // Add more supplement items as needed
        ],
      },
      {
        name: "Pharmaceuticals",
        items: [
          {
            img: "https://picsum.photos/200/368",
            link: "URL_to_Pharmaceutical_Item_1_Page",
            label: "Label_for_Pharmaceutical_Item_1",
          },
          // Add more pharmaceutical items as needed
        ],
      },

      // Add more categories as needed
    ],
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: dataBrand, isLoading: isLoadingBrand } = useBrand();
  const brandsTabIndex = data.categories.length;
  return {
    value,
    TabPanel,
    a11yProps,
    handleChange,
    data,
    theme,
    isMobile,
    dataBrand,
    isLoadingBrand,
    brandsTabIndex,
  };
};
