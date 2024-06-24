// ** MUI Imports
import { styled } from "@mui/material/styles";
import {
  Box,
  Tab,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

// import TabContext from "@mui/material/TabContext";
import { Avatar } from "@mui/material";

// ** Icon Imports
import Icon from "components/modules/icon";
// import { TabsContext } from "@mui/base";

// Styled TabList component
const MuiBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

// const CustomTabList = styled(TabList)(({ theme }) => ({
//   borderRight: 0,
//   "&, & .MuiTabs-scroller": {
//     boxSizing: "content-box",
//     padding: theme.spacing(1.25, 1.25, 2),
//     margin: `${theme.spacing(-1.25, -1.25, -2)} !important`,
//   },
//   "& .MuiTabs-indicator": {
//     display: "none",
//   },
//   "& .Mui-selected": {
//     boxShadow: theme.shadows[2],
//     backgroundColor: theme.palette.primary.main,
//     color: `${theme.palette.common.white} !important`,
//   },
//   "& .MuiTab-root": {
//     minWidth: 280,
//     lineHeight: 1,
//     textAlign: "center",
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     color: theme.palette.text.primary,
//     borderRadius: theme.shape.borderRadius,
//     "&:hover": {
//       color: theme.palette.primary.main,
//     },
//     "& svg": {
//       marginBottom: 0,
//       marginRight: theme.spacing(2),
//     },
//     [theme.breakpoints.down("md")]: {
//       maxWidth: "100%",
//     },
//   },
// }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      sx={{ width: "100%" }}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

const Faqs = ({ data, activeTab, handleChange }) => {
  const renderTabContent = () => {
    return Object.values(data.faqData).map((tab) => {
      return (
        <TabPanel
          key={tab.id}
          value={tab.id}
          sx={{ p: 6.5, pt: 0, width: "100%" }}
        >
          <Box key={tab.id}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                skin="light"
                variant="rounded"
                sx={{ height: 48, width: 48 }}
              >
                <Icon icon={tab.icon} fontSize="2.25rem" />
              </Avatar>
              <Box sx={{ ml: 4 }}>
                <Typography variant="h4">{tab.title}</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {tab.subtitle}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 6 }}>
              {tab.qandA.map((item) => {
                return (
                  <Accordion key={item.id}>
                    <AccordionSummary
                      expandIcon={
                        <Icon fontSize="1.25rem" icon="tabler:chevron-down" />
                      }
                    >
                      <Typography sx={{ fontWeight: "500" }}>
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: "text.secondary" }}>
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Box>
        </TabPanel>
      );
    });
  };

  const renderTabs = () => {
    if (data !== null) {
      return Object.values(data.faqData).map((tab) => {
        if (tab.qandA.length) {
          return (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.title}
              icon={<Icon icon={tab.icon} />}
            />
          );
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  return (
    <MuiBox>
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box orientation="vertical" onChange={handleChange}>
            {renderTabs()}
          </Box>
          <Box
            sx={{
              mt: 5.5,
              display: "flex",
              justifyContent: "center",
              "& img": {
                maxWidth: "100%",
                display: { xs: "none", md: "block" },
              },
            }}
          >
            <img
              src="/images/pages/faq-illustration.png"
              alt="illustration"
              width="230"
            />
          </Box>
        </Box>
        {renderTabContent()}
      </Box>
    </MuiBox>
  );
};

export default Faqs;
