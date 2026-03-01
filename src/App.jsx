import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./assets/css/style.scss";
import Home from "app/page.jsx";
import LoginPage from "./app/(authentication)/Login/page.jsx";
import ShouldNotBeLogged from "middlewares/ShouldNotBeLogged";
import About from "./app/about/page.jsx";
import BlogPage from "./app/Blog/page.jsx";
import BlogPost from "./app/Blog/[id]/page.jsx";
import ContactUs from "./app/ContactUs/page.jsx";
import FAQ from "./app/faq/page.jsx";
import StoreCategoriesPage from "./app/store/categories/page.jsx";
import StoreCategoryPage from "./app/store/categories/[category]/page.jsx";
import StoreCheckoutPage from "./app/store/checkout/page.jsx";
import StoreOffersPage from "./app/store/offers/page.jsx";
import StoreProductPage from "./app/store/product/[id]/page.jsx";
import TermsPage from "./app/Terms/page.jsx";
import SignUp from "app/(authentication)/signUp/page.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import Layout from "layout/Layout";
import Profile from "app/profile/Profile";
import Careers from "app/careers/page";
import Job from "app/careers/job/page";
import ForgetPassword from "app/(authentication)/forgetPassword/ForgetPassword";
import ResetPassword from "app/(authentication)/forgetPassword/ResetPassword";
import Brand from "app/store/categories/brand/[name]/page";
import NotFound from "components/NotFound";
import ShouldBeLogged from "middlewares/ShouldBeLogged";
import ChooseCityDialog from "components/ChooseCityDialog";
import { createChat } from "@n8n/chat";
import Seo from "components/Seo";
import { _cities } from "api/country/country";

import "@n8n/chat/style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PharmacyLocator from "app/pharmacy/PharmacyLocator.jsx";


const normalizeCityName = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "");

const cityNameCandidatesFromLocation = (address = {}) => {
  return [
    address.city,
    address.town,
    address.village,
    address.municipality,
    address.county,
    address.state_district,
    address.state,
  ].filter(Boolean);
};

function App() {

  useEffect(() => {
    HttpRequestInterceptor();
    window.scrollTo(0, 0);
    localStorage.setItem("cart_count", 0);
    const i18nextLng = localStorage.getItem("i18nextLng");
    if (!i18nextLng) localStorage.setItem("i18nextLng", "ar");
    localStorage.setItem("direction", "rtl");
    document.documentElement.dir = "rtl";
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    createChat({
      webhookUrl:
        "https://n8n.srv832200.hstgr.cloud/webhook/81be035f-7336-4a1c-a953-bbdabd6329c6/chat",
      initialMessages: [
        "Hi there! 👋",
        "I am the smart assistant from Dawaa Alhayat . How can I help you today?",
      ],
    });
  }, []);

  useEffect(() => {
    const tryAutoSelectCity = async () => {
      const savedCity = localStorage.getItem("city");
      if (savedCity) {
        setOpen(false);
        return;
      }

      const alreadyTriedAutoDetect =
        localStorage.getItem("city_auto_detected") === "1";

      if (alreadyTriedAutoDetect || !navigator.geolocation) {
        setOpen(true);
        return;
      }

      localStorage.setItem("city_auto_detected", "1");

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60 * 60 * 1000,
          });
        });

        const { latitude, longitude } = position.coords;

        const geocodeResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const geocodeData = await geocodeResponse.json();

        const locationCandidates = cityNameCandidatesFromLocation(
          geocodeData?.address || {}
        ).map(normalizeCityName);

        const citiesResponse = await _cities.index();
        const appCities = citiesResponse?.data?.state || [];

        const matchedCity = appCities.find((city) => {
          const cityNames = [city?.name, city?.name_en, city?.name_ar, city?.value]
            .filter(Boolean)
            .map(normalizeCityName);

          return cityNames.some(
            (cityName) =>
              locationCandidates.some(
                (candidate) =>
                  cityName === candidate ||
                  cityName.includes(candidate) ||
                  candidate.includes(cityName)
              )
          );
        });

        if (matchedCity?.id) {
          localStorage.setItem("city", String(matchedCity.id));
          setOpen(false);
          return;
        }
      } catch (error) {
        // Fall back to manual city selection dialog.
      }

      setOpen(true);
    };

    tryAutoSelectCity();
  }, []);

  return (
    <ThemeProviderWrapper>
      <Seo
        title="Buy Medical Products Online"
        description="Dawaa Alhayat offers a wide range of medical products. Shop online with us for quality and affordable healthcare products."
        keywords="medical products, healthcare, online store, Dawaa Alhayat"
        url="https://dawaaalhayat.com"
      />

      <ChooseCityDialog open={open} setOpen={setOpen} />
      {/* <CookieConsent /> */}

      <Routes>
        <Route
          path="/login"
          element={
            <ShouldNotBeLogged>
              <LoginPage />
            </ShouldNotBeLogged>
          }
        />

        <Route
          path="/profile/:tab"
          element={
            <ShouldBeLogged>
              <Layout>
                <Profile />
              </Layout>
            </ShouldBeLogged>
          }
        />

        <Route
          path="/signup"
          element={
            <ShouldNotBeLogged>
              <SignUp />
            </ShouldNotBeLogged>
          }
        />

        <Route
          path="/forget-password"
          element={
            <ShouldNotBeLogged>
              <ForgetPassword />
            </ShouldNotBeLogged>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ShouldNotBeLogged>
              <ResetPassword />
            </ShouldNotBeLogged>
          }
        />

        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" exact element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/job/:id" element={<Job />} />

          <Route
            path="/store/categories"
            exact
            element={<StoreCategoriesPage />}
          />
          <Route
            path="/pharmacy-locator"
            exact
            element={<PharmacyLocator />}
          />
          <Route path="/store/categories/brand/:id" exact element={<Brand />} />
          <Route
            path="/store/:attr_id?/:attr_valueid?"
            element={<StoreCategoryPage />}
          />
          <Route path="/store/checkout" element={<StoreCheckoutPage />} />
          <Route path="/store/offers" element={<StoreOffersPage />} />
          <Route
            path="/store/product/:id/:name"
            element={<StoreProductPage />}
          />
          <Route path="/terms/:id" element={<TermsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProviderWrapper>
  );
}

export default App;
