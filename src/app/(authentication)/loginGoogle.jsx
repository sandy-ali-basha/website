import { _AuthApi } from "api/auth";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    setLoading(true);
    console.log("response", credentialResponse);
    const token = credentialResponse?.credential; // Use credential from the response
    _AuthApi.storeToken(token);
    navigate("/");
    // _AuthApi
    //   .getUserData()
    //   .then((res) => {
    //     localStorage.setItem("userData", JSON.stringify(res.data.data));
    //   })
    setLoading(false);
  };

  const onError = (error) => {
    console.error("Google login failed:", error);
    // Handle error case
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <GoogleLogin
      onSuccess={responseGoogle}
      onFailure={onError}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default LoginComponent;
