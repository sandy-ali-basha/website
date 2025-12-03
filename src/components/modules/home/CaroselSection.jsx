import { useHomeSlider } from "hooks/home/useHome";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import i18n from "i18n";

const CaroselSection = () => {
  const { data: slider } = useHomeSlider();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          height: { xs: "30dvh", sm: "100dvh" },
          mt: { xs: "5dvh", sm: "0" },
        }}
      >
        <Swiper
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          style={{
            height: "100%",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
          grabCursor
        >
          {slider?.home_slides?.map(
            (item, index) =>
              item.image && (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#6A83B0",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <img
                      loading="lazy"
                      src={`https://v2.dawaaalhayat.com/test/storage/app/public/uploads/home_slides/${item.image.split("/")[8]}/${item.image.split("/")[9]}`}
                      alt={`Slide ${index + 1}`}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }}
                    />

                    {item.button_text && (
                      <Button
                        onClick={() => navigate(item?.link)}
                        sx={{
                          color: item.text_color,
                          background: item.button_color,
                          borderRadius: "35px",
                          position: "absolute",
                          left: { xs: "50%", sm: `${item.x}%` },
                          top: { xs: "50%", sm: `${item.y}%` },
                          transform: { xs: "translate(-50%,-50%)", sm: "none" },
                          zIndex: 1,
                          border: "1px solid #222222",
                          fontSize: { xs: "11px", sm: "20px", md: "24px" },
                          paddingLeft: "40px",
                          paddingRight: "40px",
                        }}
                        variant="contained"
                      >
                        {item.button_text || "SHOP NOW"}
                      </Button>
                    )}
                  </Box>
                </SwiperSlide>
              )
          )}
        </Swiper>
      </Box>
    </>
  );
};

export default CaroselSection;
