import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _AuthApi } from "api/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  const onSubmit = (input) => {
    setLoading(true);
    console.log("res")

    _AuthApi
      .login(input)
      .then((res) => {
        console.log("res",res)
        if (res?.code == 200) {
          navigate("/");
        } else {
          setError(res?.error?.message || "An unexpected error occurred");
        }
        setLoading(true);
      })

      .finally(() => setLoading(false));
  };
  return {
    register,
    errors,
    onSubmit,
    loading,
    handleSubmit,
    t,
    error,
  };
};
