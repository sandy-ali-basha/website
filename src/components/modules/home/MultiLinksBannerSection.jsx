import { Box, ButtonGroup, Button, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import { _Home } from "api/Home/home";
import i18n from "i18n";

const MultiLinksBannerSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["multi-links-banners"],
    queryFn: () => _Home.getMultiLinksBanners(),
  });

  return (
    <>
      {isLoading ? (
        <Skeleton height={"80dvh"} width="100%" />
      ) : data && (
        <Box
          sx={{
            height: { xs: "35dvh", sm: "80dvh" },
            position: "relative",
          }}
        >
          <img
            loading="lazy"
            src={data?.image}
            alt="multi btns"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {data?.translations.links.length > 1 ? (
            <ButtonGroup
              sx={{
                position: "absolute",
                left: { xs: "50%", md: data.x ? `${data.x}%` : "10%" },
                top: { xs: "50%", md: data.y ? `${data.y}%` : "50%" },
                transform: { xs: "translate(-50%,-50%)", md: "none" },
                borderRadius: "25px",
                boxShadow: (theme) => theme.shadows[6],
              }}
            >
              {data.translations.links.map((link, i) => {
                let borderRadius = "0";

                if (i === 0) {
                  borderRadius = "25px 0 0 25px";
                }
                if (i === data.links.length - 1) borderRadius = "0 25px 25px 0";

                return (
                  <Button
                    key={link.name}
                    sx={{
                      borderRadius: borderRadius,
                      color: data.text_color,
                      borderColor: data.text_color,
                      backgroundColor: data.button_color,
                      fontSize: { xs: "12px", sm: "20px" },
                      "&:hover": {
                        borderColor: data.text_color,
                        color: data.button_color,
                      },
                    }}
                    onClick={() => {
                      window.location = link.url;
                    }}
                  >
                    {link.name[i18n.language.slice(0, 2)]}
                  </Button>
                );
              })}
            </ButtonGroup>
          ) : (
            <Button
              key={data.translations.links[0].name}
              sx={{
                borderRadius: { xs: "15px", sm: "25px" },
                color: data.text_color,
                borderColor: data.text_color,
                backgroundColor: data.button_color,
                fontSize: { xs: "12px", sm: "20px" },
                position: "absolute",
                left: { xs: "50%", md: data.x ? `${data.x}%` : "10%" },
                top: { xs: "50%", md: data.y ? `${data.y}%` : "50%" },
                transform: { xs: "translate(-50%,-50%)", md: "none" },
                minHeight: { xs: "30px", sm: "50px" },
                "&:hover": {
                  borderColor: data.text_color,
                  color: data.button_color,
                },
              }}
              onClick={() => {
                window.location = data.translations.links[0].url;
              }}
              variant="contained"
            >
              {data.translations.links[0].name[i18n.language.slice(0, 2)]}
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default MultiLinksBannerSection;
