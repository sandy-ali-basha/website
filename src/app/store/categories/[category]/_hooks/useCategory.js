import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const useCategory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const data = {
    Products: {
      name: "Sale",
      items: [
        {
          id:"0",
          img: "https://picsum.photos/200/314",
          price: "5101",
          label: "product 0",
        },
        {
          id:"1",
          img: "https://picsum.photos/200/301",
          price: "5000",
          label: "Label_for_Sale_Item_2",
        },
        {
          id:"2",
          img: "https://picsum.photos/200/322",
          price: "5202",
          label: "product 1",
        },
        {
          id:"3",
          img: "https://picsum.photos/200/333",
          price: "5303",
          label: "Label_for_Sale_Item_2",
        },
        {
          id:"4",
          img: "https://picsum.photos/200/330",
          price: "5404",
          label: "product 2",
        },
        {
          id:"5",
          img: "URL_to_Sale_Item_2_Image",
          price: "5505",
          label: "Label_for_Sale_Item_2",
        },
        {
          id:"6",
          img: "https://picsum.photos/200/335",
          price: "5606",
          label: "product 3",
        },
        {
          id:"7",
          img: "URL_to_Sale_Item_2_Image",
          price: "5707",
          label: "Label_for_Sale_Item_2",
        },
      ],
    },
  };
  return { data, isMobile };
};
