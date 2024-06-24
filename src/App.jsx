import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./assets/css/style.scss";
import Home from "app/page.jsx";

import LoginPage from "./app/(authentication)/Login/page.jsx";
import About from "./app/about/page.js";
import BlogPage from "./app/Blog/page.jsx";
import BlogPost from "./app/Blog/[id]/page.jsx";
import ContactUs from "./app/ContactUs/page.jsx";
import FAQ from "./app/faq/page.js";
import PaymentMethods from "./app/PaymentMethods/page.jsx";
import Delivery from "./app/policy/delivery/page.jsx";
import Privecy from "./app/policy/privecy/page.jsx";
import Return from "./app/policy/return/page.jsx";
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
import { v4 as uuidv4 } from "uuid";
import Layout from "layout/Layout";
import Profile from "app/profile/Profile";
import Careers from "app/careers/page";
import Job from "app/careers/job/page";
import ForgetPassword from "app/(authentication)/forgetPassword/ForgetPassword";
import ResetPassword from "app/(authentication)/forgetPassword/ResetPassword";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");
    if (!storedSessionId) {
      const newSessionId = uuidv4();
      localStorage.setItem("session_id", newSessionId);
    }
  }, []);

  useEffect(() => {
    HttpRequestInterceptor();
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProviderWrapper>
      <Helmet>
        <title>Dawaa alhayat</title>
        <meta name="description" content="dawaa alhayat" />
      </Helmet>

      <Routes>
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
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/policy/delivery" element={<Delivery />} />
          <Route path="/policy/privacy" element={<Privecy />} />
          <Route path="/policy/return" element={<Return />} />
          <Route path="/profile/:tab" element={<Profile />} />
         
          <Route
            path="/store/categories"
            exact
            element={<StoreCategoriesPage />}
          />
          <Route
            path="/store/categories/:category"
            element={<StoreCategoryPage />}
          />
          <Route path="/store/checkout" element={<StoreCheckoutPage />} />
          <Route path="/store/offers" element={<StoreOffersPage />} />
          <Route path="/store/product/:id" element={<StoreProductPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </ThemeProviderWrapper>
  );
}

export default App;
