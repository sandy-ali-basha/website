import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ContentCopy, Done } from "@mui/icons-material";
import { useCoupones } from "hooks/coupones/useCoupones";
import { formatDate } from "date-fns";

const colors = ["#4caf50", "#ff9800", "#2196f3", "#e91e63", "#9c27b0"];

function SpecialOffersSection({ isInHomePage }) {
  
  const { t, i18n } = useTranslation("index");

  const [copiedId, setCopiedId] = useState(null);

  const { data: discounts, isLoading } = useCoupones();

  // Copy handler
  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 4000);
  };

  if (isLoading)
    return (
      <Grid container gap={2}>
        {Array.from({ length: 3 }).map((_e, i) => {
          return (
            <Grid key={i} item xs={10} md={5} lg={3}>
              <Skeleton width="100%" height="300px" />
            </Grid>
          );
        })}
      </Grid>
    );

  if (!discounts || discounts.length === 0)
    return <>{t("No Offers at the moment!")}</>;

  const filteredDisocunts = discounts.filter(
    (e) =>
      new Date(e.starts_at) < new Date() && new Date() < new Date(e.ends_at)
  );

  return (
    <>
      {isInHomePage ? (
        <Container sx={{ my: 5 }} maxWidth="xl">
          <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
            {t("Hot Discounts")}
          </Typography>
          <Swiper
            spaceBetween={20}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {filteredDisocunts.map((item, idx) => {
              return (
                <SwiperSlide key={idx} style={{ paddingBottom: "10px" }}>
                  <Card
                    sx={{
                      boxShadow: (theme) => theme.shadows[3],
                      borderRadius: "10px",
                      backgroundColor: (theme) =>
                        theme.palette.background.paper,

                      "&:hover": {
                        boxShadow: (theme) => theme.shadows[8],
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        gap: "5px",
                        position: "relative",
                        minHeight: "120px",
                      }}
                    >
                      <Box sx={{ maxWidth: "60%" }}>
                        <Typography
                          sx={{ color: colors[idx % colors.length] }}
                          variant="h5"
                          fontWeight="bold"
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          Valid Until:{" "}
                          {formatDate(new Date(item.ends_at), "dd MMM yyyy")}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          backgroundColor: colors[idx % colors.length],
                          right: "10px",
                          top: "0",
                          padding: "20px",
                          height: "95%",
                          fontSize: "25px",
                          color: "white",
                          fontWeight: "bold",
                          width: "20%",
                          textAlign: "center",

                          "&::after": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: "100%",
                            left: "0",
                            bottom: "-30%",
                            transform: "rotate(45deg)",
                            aspectRatio: "1 / 1",
                            backgroundColor: (theme) =>
                              theme.palette.background.paper,
                          },
                        }}
                      >
                        {item.data.percentage && `${item.data.percentage}%`}
                        {item.data.fixed_value &&
                          `${item.data.fixed_values.USD} I.Q.D`}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleCopy(item.id, item.coupon)}
                        sx={{
                          color: (theme) =>
                            copiedId === item.id
                              ? theme.palette.success.dark
                              : theme.palette.grey[600],
                          borderColor: (theme) =>
                            copiedId === item.id
                              ? theme.palette.success.dark
                              : theme.palette.grey[600],
                          gap: "8px",

                          "&:hover": {
                            borderColor: (theme) =>
                              copiedId === item.id
                                ? theme.palette.success.dark
                                : theme.palette.grey[600],
                          },
                        }}
                      >
                        {copiedId === item.id ? "COPIED" : "COPY CODE"}{" "}
                        {copiedId === item.id ? (
                          <Done fontSize="small" />
                        ) : (
                          <ContentCopy fontSize="small" />
                        )}
                      </Button>
                    </CardActions>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      ) : (
        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          style={{
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
          grapCursor
        >
          {filteredDisocunts.map((item, idx) => (
            <SwiperSlide key={idx} style={{ paddingBottom: "10px" }}>
              <Card
                sx={{
                  boxShadow: (theme) => theme.shadows[3],
                  borderRadius: "10px",
                  backgroundColor: (theme) => theme.palette.background.paper,

                  "&:hover": {
                    boxShadow: (theme) => theme.shadows[8],
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    gap: "5px",
                    position: "relative",
                    minHeight: "120px",
                  }}
                >
                  <Box sx={{ maxWidth: "60%" }}>
                    <Typography
                      sx={{ color: colors[idx % colors.length] }}
                      variant="h5"
                      fontWeight="bold"
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      Valid Until:
                      <br />
                      {formatDate(new Date(item.ends_at), "dd MMM yyyy")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      backgroundColor: colors[idx % colors.length],
                      right: "10px",
                      top: "0",
                      padding: "20px",
                      height: "95%",
                      fontSize: "25px",
                      color: "white",
                      fontWeight: "bold",
                      width: "20%",
                      textAlign: "center",

                      "&::after": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        width: "100%",
                        left: "0",
                        bottom: "-30%",
                        transform: "rotate(45deg)",
                        aspectRatio: "1 / 1",
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                      },
                    }}
                  >
                    {item.data.percentage && `${item.data.percentage}%`}
                    {item.data.fixed_value &&
                      `${item.data.fixed_values.USD} I.Q.D`}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleCopy(item.id, item.coupon)}
                    sx={{
                      color: (theme) =>
                        copiedId === item.id
                          ? theme.palette.success.dark
                          : theme.palette.grey[600],
                      borderColor: (theme) =>
                        copiedId === item.id
                          ? theme.palette.success.dark
                          : theme.palette.grey[600],
                      gap: "8px",

                      "&:hover": {
                        borderColor: (theme) =>
                          copiedId === item.id
                            ? theme.palette.success.dark
                            : theme.palette.grey[600],
                      },
                    }}
                  >
                    {copiedId === item.id ? "COPIED" : "COPY CODE"}{" "}
                    {copiedId === item.id ? (
                      <Done fontSize="small" />
                    ) : (
                      <ContentCopy fontSize="small" />
                    )}
                  </Button>
                </CardActions>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default SpecialOffersSection;
