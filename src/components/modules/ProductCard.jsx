 
import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, CardContent, CardMedia, Link } from "@mui/material";

export default function ProductCard({
  productName,
  Price,
  productImage,
  offer,
  link,
}) {
  console.log("productImage", productImage.src);
  return (
    <Card sx={{ boxShadow: 3,borderRadius:3 }}>
      <Link href={link} component="a" sx={{ textDecoration: "none" }}>
        <CardMedia
          sx={{ width: "100%", height: "40vh", borderRadius: 3 }}
          image={productImage.src}
          title={productName}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="initial">
          {productName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{
                textDecoration: offer ? "line-through" : "none",
                fontSize: offer ? "small" : "inherit",
              }}
              color={offer ? "text.secondary" : "initial"}
            >
              {Price} $
            </Typography>
            {offer && (
              <Typography variant="body1" color="initial">
                {Price} $
              </Typography>
            )}
          </Box>
          <Button variant="outlined" size="small">
            Add To Cart
          </Button>
        </Box>
      </CardContent>
      {/* Uncomment and use the Image component if necessary
      <img width="100%" src={productImage} alt={productName} /> */}
    </Card>
  );
}
