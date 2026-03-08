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
import { _Home } from "api/Home/home.js";
import { Box } from "@mui/material";
import Loader from "components/modules/Loader.jsx";
import AnimatedText from "components/modules/home/AnimatedText.jsx";
import HomeGrid from "components/modules/home/HomeGrid.jsx";
import ParallaxSlides from "components/modules/home/ParallaxSlides.jsx";
import i18n from "i18next";
import { useEffect, useState } from "react";
import Cta from "components/modules/home/Cta.jsx";
import TextSectionOne from "components/modules/home/TextSecotionOne.jsx";
import Seo from "components/Seo";

export default function Home() {
  const { data, isLoading } = useHome();
  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";
  const isRtl =
    currentLanguage.startsWith("ar") ||
    currentLanguage.startsWith("kr") ||
    currentLanguage.startsWith("ku");
  const pageDirection = isRtl ? "rtl" : "ltr";

  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (data)
      setSections(data?.slice().sort((a, b) => a.order - b.order));
  }, [data]);

  const renderSection = (data) => {
    switch (data.type) {
      case "parallax":
        return (
          <ParallaxSlides key={data.id} data={data} isLoading={isLoading} />
        );
      case "grid":
        return <HomeGrid key={data.id} data={data} isLoading={isLoading} />;
      case "reels":
        return <Reels key={data.id} data={data} isLoading={isLoading} />;

      default:
        return null;
    }
  };

  const renderSetting = (data, lang) => {
    switch (data.name) {
      case "home.page.cta":
        return <Cta key={data.id} data={data.value} />;
      case "home.page.textSectionOne":
        return <TextSectionOne key={data.id} data={data.value} />;
      case "home.page.textSectionTwo":
        return (
          <AnimatedText key={data.id} text={data.value.text?.[i18n.language]} />
        );
      case "home.page.video":
        return (
          <Qoute
            key={data.id}
            data={data}
          />
        );
      case "home.page.newProducts":
        return <LatestProducts />
      case "home.page.offers":
        return  <SpecialOffersSection isInHomePage />
      case "home.page.Brands":
        return <BrandsSection />
      case "home.page.categories":
        return <CategoriesSection />

      default:
        return null;
    }
  };

  const HomeRenderer = () => {
    return (
      <>
        {sections?.map((block) => {
          const isActive = Number(block?.data?.active) === 1;

          if (!isActive) {
            return null;
          }

          if (block.type === "section") {
            return renderSection(block.data);
          }

          if (block.type === "setting") {
            return renderSetting(block.data);
          }

          return null;
        })}
      </>
    );
  };

  if (isLoading)
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
  else
    return (
      <Box dir={pageDirection} sx={{ textAlign: "start" }}>
        <Seo
          title="Home"
          description="Shop medical products, explore offers, and discover trusted healthcare brands at Dawaa Alhayat."
          keywords="Dawaa Alhayat, medical products, pharmacy, healthcare, offers"
        />
        {/* <SpinAndWin/> */}
        
        <CaroselSection />
  
        <DiscountSection />
        <MultiLinksBannerSection />

        <HomeRenderer sections={sections} />
      </Box>
    );
}
