import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route, Outlet } from "react-router-dom";
import "./assets/css/style.scss";
import Home from "app/page.jsx";

import LoginPage from "./app/(authentication)/Login/page.jsx";
import About from "./app/about/page.jsx";
import BlogPage from "./app/Blog/page.jsx";
import BlogPost from "./app/Blog/[id]/page.jsx";
import ContactUs from "./app/ContactUs/page.jsx";
import FAQ from "./app/faq/page.js";
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
import ShouldNotBeLogged from "middlewares/ShouldNotBeLogged";
import NotFound from "components/NotFound";
import ShouldBeLogged from "middlewares/ShouldBeLogged";
import GoogleCallback from "app/(authentication)/Login/GoogleCallback";
import ChooseCityDialog from "components/ChooseCityDialog";
import CookieConsent from "components/CookieConsent";

function App() {
  useEffect(() => {
    HttpRequestInterceptor();
    window.scrollTo(0, 0);
    // localStorage.setItem("i18nextLng", "en");
  }, []);

  return (
    <ThemeProviderWrapper>
      <Helmet>
        <title>Dawaa Alhayat - Buy Medical Products Online</title>
        <meta
          name="description"
          content="Dawaa Alhayat offers a wide range of medical products. Shop online with us for quality and affordable healthcare products."
        />
        <meta
          name="keywords"
          content="medical products, healthcare, online store, Dawaa Alhayat"
        />
        <meta
          property="og:title"
          content="Dawaa Alhayat - Buy Medical Products Online"
        />
        <meta
          property="og:description"
          content="Explore a wide range of quality medical products at Dawaa Alhayat."
        />
        <meta property="og:image" content="URL_of_featured_image" />
        <meta property="og:url" content="https://dawaaalhayat.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Dawaa Alhayat - Buy Medical Products Online"
        />
        <meta
          name="twitter:description"
          content="Explore a wide range of quality medical products at Dawaa Alhayat."
        />
      </Helmet>
      <ChooseCityDialog />
      <CookieConsent />
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
        <Route path="/auth/google" element={<GoogleCallback />}></Route>

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
          <Route path="/store/categories/brand/:id" exact element={<Brand />} />
          <Route path="/store" element={<StoreCategoryPage />} />
          <Route path="/store/checkout" element={<StoreCheckoutPage />} />
          <Route path="/store/offers" element={<StoreOffersPage />} />
          <Route path="/store/product/:id/:name" element={<StoreProductPage />} />
          <Route path="/terms/:id" element={<TermsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProviderWrapper>
  );
}

export default App;
