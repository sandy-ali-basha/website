import { Box, Typography, Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useFetchCategories } from "hooks/useFetchCategories";

const CategoryCard = ({ category }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language code ('en', 'ar', 'kr')
  const navigate = useNavigate();
  const { t } = useTranslation("index");

  // Function to get translated title for current language
  const getTranslatedTitle = (category) => {
    if (!category?.translations) return category?.title || "";

    // Find translation for current language
    const translation = category.translations.find(
      (t) => t.locale === currentLanguage
    );

    // Fallback to default title if no translation found
    return translation?.title || category.title;
  };

  return (
    <Box
      sx={{ minWidth: { xs: "350px", lg: "30%" }, flex: 1, maxWidth: "full" }}
    >
      <Box
        sx={{
          backgroundColor: category.color || "#ffffff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: { xs: "30dvh", md: "45dvh" },
          position: "relative",

          "&:hover img": {
            transform: "scale(1) translateY(-50%) !important",
          },
        }}
      >
        {category.image && (
          <img
            loading="lazy"
            src={`https://v2.dawaaalhayat.com${category.image}`}
            alt={getTranslatedTitle(category)}
            style={{
              width: "50%",
              height: "100%",
              objectFit: "contain",
              position: "absolute",
              right: currentLanguage === "en" ? "10px" : "none",
              left: currentLanguage !== "en" ? "10px" : "none",
              top: "50%",
              transform: "scale(0.9) translateY(-50%)",
              transition: "0.6s ease-in-out",
            }}
          />
        )}

        <Typography
          variant="h4"
          fontFamily="Cormorant"
          sx={{ zIndex: 1 }}
          fontSize={{ xs: "1.8rem", md: "2rem" }}
          fontWeight="500"
          maxWidth="70%"
        >
          {getTranslatedTitle(category)}
        </Typography>
        <Button
          sx={{
            width: "fit-content",
            border: "none",
            borderBottom: "2px solid #222222",
            color: "#222222",
            marginTop: "10px",
            borderRadius: "0",
            padding: "5px 0",
            textTransform: "none",
            zIndex: 1,

            "&:hover": {
              border: "none",
              borderBottom: "2px solid #222222",
              bgcolor: "transparent",
              color: "#06c5e6",
              borderColor: "#06c5e6",
            },
          }}
          variant="outlined"
          onClick={() => navigate(`/store/${category.id}/0`)}
        >
          {t("Shop now")}
        </Button>
      </Box>
    </Box>
  );
};

const CategoriesSection = () => {
  const { categories, isLoading } = useFetchCategories();
  const { i18n } = useTranslation();

  if (isLoading)
    return (
      <Box
        sx={{
          height: { xs: "30dvh", md: "45dvh" },
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={330}
            height="100%"
            sx={{ flex: 1 }}
          />
        ))}
      </Box>
    );

  return (
    <Swiper
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      slidesPerView={1}
      breakpoints={{
        750: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 3,
        },
      }}
      style={{
        direction: i18n.language === "en" ? "ltr" : "rtl",
      }}
      grabCursor
    >
      {categories.map((category) => (
        <SwiperSlide key={category.id} style={{ paddingBottom: "10px" }}>
          <CategoryCard category={category} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesSection;
