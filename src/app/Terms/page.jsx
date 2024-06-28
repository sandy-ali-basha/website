import { Box, Chip, Container, Typography } from "@mui/material";
import { _terms } from "api/terms/terms";
import React from "react";
import { LoaderIcon } from "react-hot-toast";
import { useQuery } from "react-query";

export default function Terms() {
  const { data, isLoading } = useQuery(["terms"], () =>
    _terms.getTerms().then((res) => res?.data)
  );
  return (
    <Container sx={{ mt: 20, textAlign: "center",my:3 }}>
      {isLoading ? (
           <Box
           sx={{
             width: "100%",
             py: 10,
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
           }}
         >
           <LoaderIcon style={{ width: "5vw", height: "5vw" }} />
         </Box>
      ) : (
        <>
          <Chip
            sx={{ background: "rgba(194, 238, 252, 1)" }}
            label="Terms of service"
          ></Chip>
          <Typography variant="h2" sx={{ fontWeight: "bold", mt: 3 }}>
            {data?.name}
          </Typography>
          <Typography variant="body1" color="initial" sx={{ mt: 3 }}>
            Read our terms below to learn more about your rights and
            responsibilities as a Dawaa Alhayat user.
          </Typography>
          <Box sx={{ mt: 6, textAlign: "start" }}>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 3 }}
              dangerouslySetInnerHTML={{ __html: data?.text }}
            ></Typography>
          </Box>
        </>
      )}
    </Container>
  );
}
