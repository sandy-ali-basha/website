import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";
import i18n from "i18n";

const BlogCard = ({ post }) => {
  const locale = i18n.language;
  const { id, image, title, text, date } = post;
  // 2. Find the translation matching the current locale
  const translation = post.translations.find((t) => t.locale === locale);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const plainText = htmlToText(translation?.text);
  const truncatedText = truncateText(plainText, 25);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log("image", image);
  return (
    <Box
      sx={{
        gap: 2,
        borderRadius: 2,
        my: 5,
        p: 2,
        py: 2,
        display: "flex",
        flexDirection: { xl: "row", lg: "row", md: "row", sm: "column", xs: "column" },
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          width: { xl: "30vw", lg: "30vw", md: "30vw", sm: "20vw", xs: "100vw" },
          height: { xl: "30vh", lg: "30vh", md: "30vh", sm: "20vh", xs: "50vh" },
        }}
      >
        <img
          src={image}
          style={{
            borderRadius: 4,
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          alt={title}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link style={{ textDecoration: "none" }} to={`/Blog/${id}`}>
            <Typography variant="h5" color="initial" sx={{ fontWeight: "600" }}>
              {translation?.title}
            </Typography>
          </Link>
          <Typography variant="body1" color="text.secondary">
            {truncatedText}
          </Typography>
        </div>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: "auto" }}
        >
          {formatDate(date)}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogCard;
