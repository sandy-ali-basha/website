import { Box, Container, Grid, Typography, Skeleton } from "@mui/material";
import { useHomeSection } from "hooks/home/useHome";
import i18n from "i18n";
import defaultImage from "assets/images/defaultImg.jpg";

const HomeGrid = () => {
  const { data, isLoading } = useHomeSection(1);

  const items = data?.items || [];

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {/* Large section on the left */}
        <Grid item xs={12} p={1} md={6}>
          <Box sx={{ borderRadius: 4, position: "relative", height: "90vh" }}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ borderRadius: 4 }}
              />
            ) : (
              <>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={items[0]?.image || defaultImage}
                    alt={items[0]?.[`title_${i18n.language}`]}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    px: 2,
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="h4" color="white">
                    {items[0]?.[`title_${i18n.language}`]}
                  </Typography>
                  <Typography variant="body1" color="white">
                    {items[0]?.[`description_${i18n.language}`]?.replace(
                      /<\/?[^>]+(>|$)/g,
                      ""
                    )}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Grid>

        {/* Two smaller sections on the right */}
        <Grid item xs={12} md={6} p={1}>
          {(isLoading ? Array(2).fill({}) : items.slice(1)).map((item, i) => (
            <Box
              key={item.id || i}
              sx={{
                borderRadius: 4,
                position: "relative",
                height: "50%",
                mb: i !== (isLoading ? 1 : items.slice(1).length - 1) ? 2 : 0,
                overflow: "hidden",
              }}
            >
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 4 }}
                />
              ) : (
                <>
                  <img
                    src={item.image || defaultImage}
                    alt={item[`title_${i18n.language}`]}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      px: 2,
                      background: "rgba(0,0,0,0.3)",
                    }}
                  >
                    <Typography variant="h5" color="white">
                      {item[`title_${i18n.language}`]}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {item[`description_${i18n.language}`]?.replace(
                        /<\/?[^>]+(>|$)/g,
                        ""
                      )}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeGrid;
