import React from "react";
import {
  useGoogleLogin,
  hasGrantedAllScopesGoogle,
  hasGrantedAnyScopeGoogle,
} from "@react-oauth/google";
import { _AuthApi } from "api/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function LoginButton() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);

      const token = tokenResponse?.access_token; // Use the access token from response

      // Check if the user has granted the required scopes
      const allScopesGranted = hasGrantedAllScopesGoogle(
        tokenResponse,
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      );

      const anyScopeGranted = hasGrantedAnyScopeGoogle(
        tokenResponse,
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      );

      if (allScopesGranted) {
        console.log("All required scopes granted");

        // Store token and navigate
        _AuthApi.storeToken(token);
        navigate("/");

        _AuthApi.getUserData(tokenResponse).then((res) => {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
        });
      } else if (anyScopeGranted) {
        console.log("Some required scopes granted");
        // Handle cases where some but not all required scopes are granted
      } else {
        console.log("Required scopes not granted");
        // Handle case when no required scopes are granted
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });

  return (
    <Button
      sx={{ background: "white", color: "text.primary" }}
      onClick={() => login()}
    >
      Login with Google
    </Button>
  );
}

export default LoginButton;
