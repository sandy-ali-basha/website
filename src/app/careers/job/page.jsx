import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

export default function Job() {
  return (
    <Container sx={{ my: 22 }}>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <Typography variant="body2" color="initial">
            Job Details
          </Typography>
          <Typography
            variant="h5"
            color="initial"
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            UX designer for Mobile and Web
          </Typography>

          <Box sx={{ mt: 4, width: "80%" }}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="body1"
              color="initial"
            >
              Skilled UX Designer wanted to work on an engaging multi-million
              user platform
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 1, fontWeight: "bold" }}
            >
              About You
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 1, fontWeight: "light" }}
            >
              You are an experienced UX designer with a passion for creating
              intuitive and delightful user experiences. You thrive in a
              collaborative environment and are always eager to learn and grow.
              You possess a keen eye for detail and are driven by empathy for
              users.
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 4, fontWeight: "bold" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 1, fontWeight: "light" }}
            >
              You are an experienced UX designer with a passion for creating
              intuitive and delightful user experiences. You thrive in a
              collaborative environment and are always eager to learn and grow.
              You possess a keen eye for detail and are driven by empathy for
              users.
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 4, fontWeight: "bold" }}
            >
              About the Role
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 1, fontWeight: "light" }}
            >
              As our UX Designer, you will play a crucial role in shaping the
              user experience of our platform. You will be responsible for
              understanding our users' needs and translating them into intuitive
              and engaging designs. Your work will involve close collaboration
              within an agile product development team to create solutions that
              are not only aesthetically pleasing but also highly functional.
              You will be at the forefront of our design efforts, helping to
              create a seamless and enjoyable experience for our users across
              all interactions with our product.
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 4, fontWeight: "bold" }}
            >
              Requirements
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 4, fontStyle: "italic" }}
            >
              Requirements
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 1, fontWeight: "light" }}
            >
              As our UX Designer, you will play a crucial role in shaping the
              user experience of our platform. You will be responsible for
              understanding our users' needs and translating them into intuitive
              and engaging designs. Your work will involve close collaboration
              within an agile product development team to create solutions that
              are not only aesthetically pleasing but also highly functional.
              You will be at the forefront of our design efforts, helping to
              create a seamless and enjoyable experience for our users across
              all interactions with our product.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              border: 1,
              p: 2,
              borderRadius: 2,
              borderColor: "text.secondary",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 3,
                my: 2,
              }}
            >
              <Avatar sx={{ width: "50px", height: "50px" }}> EA</Avatar>
              <Typography variant="h5" color="initial">
                Element Alpha Productions
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="mailTo:email@gmail.com"
              >
                Apply for this position
              </Button>
            </Box>
            <Box>
              <Typography variant="caption" color="initial">
                Job Type
              </Typography>
              <Typography variant="body1" color="initial">
                Freelance
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="initial">
                Location
              </Typography>
              <Typography variant="body1" color="initial">
                Berlin or remote Remote Friendly
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="initial">
                Date posted
              </Typography>
              <Typography variant="body1" color="initial">
                May 27, 2024
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
