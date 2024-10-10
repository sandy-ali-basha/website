import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _AuthApi } from "api/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("This must be a valid email")
    .required("Email Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The Password must be of six characters")
    .max(20, "The Password must be of 20 characters"),
});

export const useLogin = () => {
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginUrl, setLoginUrl] = useState(
    "https://dawaaalhayat.com/api/auth/google/redirect"
  );
  const onSubmit = (input) => {
    setLoading(true);
    _AuthApi
      .login(input)
      .then((res) => {
        if (res?.data?.code === 200) {
          _AuthApi.storeToken(res?.data?.data?.token);
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          navigate("/");
        } else {
          setError(
            res?.data?.error?.message ||
              res?.data?.error ||
              "An unexpected error occurred"
          );
        }
        setLoading(true);
      })

      .finally(() => setLoading(false));
  };

  const googleLoginUrl = "https://dawaaalhayat.com/api/auth/google/redirect";
  const GoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    // Open the Google login popup
    const popup = window.open(
      googleLoginUrl,
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Listen for messages from the popup
    //! const preContent = window.querySelector('pre').textContent;
    //! console.log("preContent",preContent)
    window.addEventListener("message", (event) => {
      if (event.origin !== window.location.origin) return; // Verify the origin
      const data = event.data;

      if (data.type === "login") {
        // Process the login data (e.g., store token, redirect, etc.)
        _AuthApi.storeToken(data.token); // Store the token
        localStorage.setItem("userData", JSON.stringify(data.userData)); // Store user data
        navigate("/"); // Redirect to the home page or desired page

        // Close the popup after receiving the data
        popup.close();
      }
    });
  };

  // .then((response) => {
  //   console.log(response)
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   throw new Error("Something went wrong!");
  // })
  // .then((data) => setLoginUrl(data.url))
  // .catch((error) => console.error(error));

  useEffect(() => {
    fetch(googleLoginUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => setLoginUrl(data.url))
      .catch((error) => console.error(error));
  }, []);
  return {
    register,
    errors,
    onSubmit,
    loading,
    handleSubmit,
    GoogleLogin,
    // twitterLogin,
    // facebookLogin,
    t,
    error,
    loginUrl,
    navigate,
  };
};
