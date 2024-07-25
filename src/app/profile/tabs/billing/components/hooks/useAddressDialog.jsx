import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { _addresses } from "api/addresses/addresses";
import { useMutation, useQueryClient } from "react-query";

export const useAddressDialog = ({handleClose}) => {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    title: yup.string().required(t("Title is required")),
    first_name: yup.string().required(t("First name is required")),
    last_name: yup.string().required(t("Last name is required")),
    contact_email: yup
      .string()
      .email(t("Invalid email"))
      .required(t("Email is required")),
    city: yup.string().required(t("City is required")),
    state: yup.string().required(t("State is required")),
    line_one: yup.string().required(t("address is required")),
    deliveryInstructions: yup.string(),
  });
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;
  console.log(errors);
  const { mutate } = useMutation((data) => createPost(data));
  const queryClient = useQueryClient();

  async function createPost(data) {
    _addresses
      .post(data)
      .then((res) => {
        if (res.code === 201) handleClose();
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
        queryClient.invalidateQueries(["addresses"]);
      });
  }
  const userData = JSON.parse(localStorage.getItem("userData"));
  const hanldeCreate = (input) => {
    if (!userData || !userData.user_id) {
      console.error("User data is not available.");
      return;
    }

    setLoading(true);
    //todo: get country id from the api
    const newInput = {
      ...input,
      user_id: userData.user_id,
      country_id: 2,
      billing_default: checked,
      shipping_default: checked,
    };
    mutate(newInput);
  };
  return {
    hanldeCreate,
    register,
    errors,
    handleChange,
    loading,
    handleSubmit,
    t,
    control,
    setChecked
  };
};
