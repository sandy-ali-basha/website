import { Box, Chip, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CardShimmer from "components/customs/loaders/CardShimmer";
import { useBlog } from "hooks/blog/useBlog";
import Seo from "components/Seo";

export default function BlogPost() {
  const { id } = useParams();
  const { data, isLoading } = useBlog(id);
  const { i18n } = useTranslation();

  const currentLocale = i18n.language; // "en" أو "ar"
  const formattedDate = React.useMemo(() => {
    if (!data?.date) return "";

    const locale = currentLocale === "ar" ? "ar-EG" : "en-US";

    return new Date(data.date).toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [data?.date, currentLocale]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // نجيب الترجمة حسب اللغة الحالية
  const translatedPost = React.useMemo(() => {
    if (!data) return null;

    const translation = data.translations?.find(
      (t) => t.locale === currentLocale,
    );

    return translation || null;
  }, [data, currentLocale]);

  // المحتوى النهائي (fallback للإنجليزي إذا ما في ترجمة)
  const title = translatedPost?.title || data?.title;
  const content = translatedPost?.text || data?.text;

  return (
    <Container sx={{ my: 10, px: [1, 15],py:5, border: "1px solid #d1d1d1", borderRadius: "10px", maxWidth: ["100%", "75dvw"], mx: "auto" }}>
      <Seo
        title={title || "Blog Post"}
        description={
          data?.summary ||
          data?.description ||
          "Read the latest updates, health tips, and product news."
        }
        keywords="Blog, health, medical products"
      />

      <Chip sx={{ background: "rgba(194, 238, 252, 1)" }} label="Blog" />

      <Typography variant="h2" sx={{ fontWeight: "bold", mt: 3 }}>
        {isLoading ? (
          <CardShimmer style={{ width: "100%", height: "20px" }} />
        ) : (
          title
        )}
      </Typography>

      <Box
        sx={{ mt: 6, mb: 5, width: "80%" }}
        dir={currentLocale === "ar" ? "rtl" : "ltr"}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {isLoading ? (
            <CardShimmer style={{ width: "100%", height: "20px" }} />
          ) : (
            formattedDate
          )}
        </Typography>

        {isLoading ? (
          <CardShimmer
            style={{ width: "80vw", borderRadius: "10px", height: "70vh" }}
          />
        ) : (
          <img
            loading="lazy"
            style={{
              width: "80vw",
              borderRadius: "10px",
              height: "70vh",
              objectFit: "cover",
            }}
            src={data?.image}
            alt={title}
          />
        )}

        {!isLoading && (
          <Typography
            variant="body2"
            sx={{ fontWeight: "300", mt: 4 }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {isLoading && (
          <>
            <CardShimmer style={{ width: "100%", height: "20px" }} />
            <CardShimmer style={{ width: "90%", height: "20px" }} />
          </>
        )}
      </Box>
    </Container>
  );
}
