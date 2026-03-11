import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { _AuthApi } from "api/auth";
import { useTranslation } from "react-i18next";
import { useNavigate, useNavigation } from "react-router-dom";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

// Mobile phone validation - stricter validation for mobile numbers
const mobilePhoneRegExp = /^(\+?[1-9]\d{1,14}|\+?[0-9]{10,15})$/;

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation("auth");

  let schema = yup.object().shape({
    first_name: yup.string().required(t("First name is required")),
    last_name: yup.string().required(t("Last name is required")),
    email: yup
      .string()
      .email(t("Invalid email format"))
      .required(t("Email is required")),
    phone_number: yup
      .string()
      .required(t("Phone number is required"))
      .test(
        "mobilePhone",
        t("Enter a valid mobile phone number"),
        function (value) {
          if (!value) return false;
          // Remove all non-digit characters except the leading +
          const cleanPhone = value.replace(/[^\d+]/g, "");
          // Accept either:
          // 1. International format with country code: +[1-3 digits][7+ digits]
          // 2. National format without country code: [10+ digits]
          return /^(\+\d{1,3}\d{7,14}|\d{10,15})$/.test(cleanPhone);
        }
      ),
    password: yup
      .string()
      .required(t("Password is required"))
      .min(8, t("Password must be at least 8 characters"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        t("Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character")
      ),
    password_confirmation: yup
      .string()
      .required(t("Confirm password is required"))
      .oneOf([yup.ref("password")], t("Your passwords do not match")),
    age: yup
      .date()
      .required(t("Birth date is required"))
      .test("age", t("You must be at least 18 years old"), function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }),
    gender: yup
      .string()
      .required(t("Gender is required"))
      .oneOf(["male", "female", "other"], t("Invalid gender selection")),
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();
  const onSubmit = (input) => {
    setLoading(true);

    // Calculate age based on birth date
    const today = new Date();
    const birthDate = new Date(input.age);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Add age to input object before sending to API
    const inputData = {
      ...input,
      age: age,
      name: "name",
    };

    _AuthApi
      .register(inputData)
      .then((res) => {
        console.log("res", res);
        if (res.data?.code === 200) {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          console.log("data", res?.data?.data);
          _AuthApi.storeToken(res?.data?.data?.token);

          navigate("/");
        } else {
          setError(res?.data?.error || "An unexpected error occurred");
        }
        setLoading(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const fields = [
      ["first_name", "text"],
      ["last_name", "text"],
      ["email", "email"],
      ["password", "password"],
      ["password_confirmation", "password"],
      ["phone_number", "tel"],
      ["age", "date"],
    ];

    const data = fields.map(([key, type]) => {
      const label = key.replace(/_/g, " ");
      return {
        head: t(label),
        type,
        placeholder: t(label),
        name: key,
        register: key,
        error: key,
        helperText: key,
      };
    });

    setDetails(data);
  }, [t]);

  return {
    register,
    handleSubmit,
    setValue,
    loading,
    errors,
    details,
    showPassword,
    handleTogglePasswordVisibility,
    open,
    setOpen,
    onSubmit,
    error,
    t,
  };
};
