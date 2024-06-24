import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
  

const BlogCard = ({ id, img, title, body, date }) => {
  return (
    <Box
      sx={{
        gap: 2,
        borderRadius: 2,
        my: 4,
        p: 2,
        display: "flex",
        boxShadow: 3,
      }}
    >
      <img
        src={img}
        style={{
          width: "10%",
          borderRadius: 4,
          aspectRatio: "4/4",
          height: "100%",
        }}
        alt="alt text"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link
            style={{ textDecoration: "none" }}
            href={`/Blog/${id}`}
            passHref
          >
            <Typography variant="h5" color="initial" sx={{ fontWeight: "600" }}>
              {title}
            </Typography>
          </Link>
          <Typography variant="body1" color="text.secondary">
            {body}
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
