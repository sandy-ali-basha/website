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
  console.log("image", image);
  return (
    <Box
      sx={{
        gap: 2,
        borderRadius: 2,
        my: 5,
        p: 2,
        py: 5,
        display: "flex",
        boxShadow: 3,
      }}
    >
      <img
        src={image}
        style={{
          width: "50%",
          borderRadius: 4,
          height: "100%",
        }}
        alt={title}
      />
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
          {date}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogCard;
