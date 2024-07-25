"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import {
  Container,
  Divider,
  Box,
  Tabs,
  Tab,
  Grid,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCategories } from "./_hooks/useCategories";
import CategoryCard from "./_components/CategoryCard";
import { useTheme } from "@mui/material/styles";
import { useBrand } from "hooks/brands/useBrand";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function Categories() {
  const {
    value,
    handleChange,
    data,
    theme,
    isMobile,
    dataBrand,
    isLoadingBrand,
    brandsTabIndex,
  } = useCategories();

  return (
    <Container sx={{ pt: 15 }}>
      <Typography
        variant="h3"
        color="initial"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Categories
      </Typography>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          minHeight: 500,
          my: 5,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Tabs
          orientation={isMobile ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Responsive tabs example"
          sx={{
            borderRight: isMobile ? 0 : 1,
            borderBottom: isMobile ? 1 : 0,
            borderColor: "divider",
            width: isMobile ? "100%" : "30%",
            marginRight: 2,
          }}
        >
          {data.categories.map((category, index) => (
            <Tab
              key={category.name}
              label={category.name}
              {...a11yProps(index)}
            />
          ))}
          <Tab label={"Brands"} {...a11yProps(brandsTabIndex)} />
        </Tabs>
        {data.categories.map((category, index) => (
          <TabPanel value={value} index={index} key={category.name}>
            <Grid container spacing={2} sx={{ mt: { xs: 2, md: 0 } }}>
              {category.items.map((item, idx) => (
                <Grid
                  item
                  md={3}
                  xs={6}
                  key={idx}
                  spacing={{ md: 2, xs: 1, xl: 3 }}
                >
                  <CategoryCard
                    img={item.img}
                    label={item.label}
                    link={item.link}
                  />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        ))}
        <TabPanel value={value} index={brandsTabIndex} key={"Brands"}>
          <Grid container spacing={2} sx={{ mt: { xs: 2, md: 0 } }}>
            {isLoadingBrand ? (
              <Grid item md={3} xs={6} spacing={{ md: 2, xs: 1, xl: 3 }}>
                <CategoryCard loading={true} />
              </Grid>
            ) : (
              dataBrand &&
              dataBrand.brands.map((item, idx) => (
                <Grid
                  item
                  md={3}
                  xs={6}
                  key={idx}
                  spacing={{ md: 2, xs: 1, xl: 3 }}
                >
                  <CategoryCard
                    // img={item.img}  // Uncomment and set the image URL if available
                    label={item.name}
                    link={"brand/" + item.id}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </TabPanel>
      </Box>
    </Container>
  );
}
