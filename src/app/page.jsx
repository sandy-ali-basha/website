import Qoute from "../components/modules/home/Qoute.jsx";
import { useHome } from "hooks/home/useHome.js";
import LatestProducts from "components/modules/home/LatestProducts.jsx";
import Reels from "components/modules/home/Reels.jsx";
import BrandsSection from "components/modules/home/BrandsSection.jsx";
import CategoriesSection from "components/modules/home/CategoriesSection.jsx";
import DiscountSection from "components/modules/home/DiscountSection.jsx";
import CaroselSection from "components/modules/home/CaroselSection.jsx";
import SpecialOffersSection from "components/SpecialOffersSection.jsx";
import MultiLinksBannerSection from "components/modules/home/MultiLinksBannerSection.jsx";
import { useQuery } from "react-query";
import { _Home } from "api/Home/home.js";
import { Box } from "@mui/material";
import Loader from "components/modules/Loader.jsx";
import AnimatedText from "components/modules/home/AnimatedText.jsx";
import i18n from "i18n.js";

export default function Home() {
  const { data, isLoading } = useHome();

  const { data: showHideData, isLoading: isShowHideSectinosLoading } = useQuery(
    {
      queryFn: () => _Home.getShowHideSections(),
      queryKey: ["showHideSections"],
    }
  );

  if (isLoading || isShowHideSectinosLoading)
    return (
      <Box
        sx={{
          my: 5,
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </Box>
    );

  // if (!showHideData || !data) return <></>;
  //todo un comment this line after api fix

  return (
    <>
      {/* <SpinAndWin/> */}
      <CaroselSection />

      <BrandsSection />

      <CategoriesSection />

      {showHideData?.flags?.hot_descounts && <DiscountSection />}

      {showHideData?.flags?.static_videos && <Reels />}

      <AnimatedText
        text={data?.["home.page.textSectionTwo"]?.value?.text?.[i18n.language]}
      ></AnimatedText>

      <SpecialOffersSection isInHomePage />

      <MultiLinksBannerSection />

      <LatestProducts />

      {data && data["home.page.videoText"].value.show === "true" && (
        <Qoute
          data={data?.["home.page.videoText"]}
          video={data?.["home.page.video"]?.video}
        />
      )}
    </>
  );
}
