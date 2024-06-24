import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Ensure this is imported
import { _AuthApi } from "api/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

let schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"), // Assuming you wanted last name instead of repeating first_name
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Enter a valid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The password must be at least six characters")
    .max(20, "The password must be at most 20 characters"),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .min(6, "The confirm password must be at least six characters")
    .max(20, "The confirm password must be at most 20 characters")
    .oneOf([yup.ref("password")], "Your passwords do not match"),
  age: yup
    .date()
    .required("Birth date is required")
    .test("age", "You must be at least 18 years old", function (value) {
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
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Invalid gender selection"),
});

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation("index");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

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
    age: age
  };

    _AuthApi
      .register(inputData)
      .then((res) => {
        console.log("res", res);
        if (res?.code == 200) {
          setOpen(true);
        } else {
          setError(res?.error || "An unexpected error occurred");
        }
        setLoading(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const fields = [
      ["name", "text"],
      ["first_name", "text"],
      ["last_name", "text"],
      ["email", "email"],
      ["password", "password"],
      ["password_confirmation", "password"],
      ["phone_number", "tel"],
      ["age", "date"],
    ];

    const data = fields.map(([key, type]) => ({
      head: key.replace("_", " "),
      type,
      placeholder: key.replace("_", " "),
      name: key,
      register: key,
      error: key,
      helperText: key,
    }));

    setDetails(data);
  }, []);

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
