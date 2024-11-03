import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import StepCart from "./StepCart";
import StepAddress from "./StepAddress";
import StepPayment from "./StepPayment";
import StepConfirmation from "./StepConfirmation";
import MuiStepper from "@mui/material/Stepper";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Swal from "sweetalert2";
import { _addresses } from "api/addresses/addresses";

import { ValueStore } from "store/categoryStore";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import StepperWrapper from "./_components/StepperWrapper";

// ** Styled Stepper Component
const Stepper = styled(MuiStepper)(({ theme }) => ({
  margin: "auto",
  maxWidth: 800,
  justifyContent: "space-around",
  flexDirection: "row !important",
}));

const Checkout = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBasicRadio, setSelectedBasicRadio] = useState();
  const [orderResponse, setOrderResponse] = useState(null); // New state for storing order response
  const { t } = useTranslation("index");
  const theme = useTheme();
  const [value] = ValueStore((state) => [state.value]);

  const steps = [
    {
      title: t("Cart"),
      icon: <ShoppingCartRoundedIcon />,
    },
    {
      title: t("Address"),
      icon: <BusinessRoundedIcon />,
    },
    {
      title: t("Payment"),
      icon: <CreditScoreRoundedIcon />,
    },
    {
      title: t("Confirmation"),
      icon: <ReceiptLongRoundedIcon />,
    },
  ];
  // Function to poll order status every 30 seconds
  const pollOrderStatus = async (orderId) => {
    try {
      const res = await _addresses.getOrderStatus(orderId); // Make the request to get order status
      console.log(res?.data?.data?.status);

      if (res?.data?.data?.status === "PAID") {
        Swal.close(); // Close the "Please Wait" alert once payment is confirmed
        localStorage.setItem("cart_count", 0);
        setActiveStep((prevStep) => prevStep + 1); // Move to the next step if payment is confirmed
      } else if (res?.data?.data?.status === "UNPAID") {
        // Poll again after 30 seconds if payment is still pending
        setTimeout(() => pollOrderStatus(orderId), 15000);
      }
    } catch (error) {
      console.error("Error checking order status:", error);
      Swal.fire({
        icon: "error",
        title: t("Error checking order status"),
        text: error.message,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Main function to handle the order and initiate polling
  const handleNext = async () => {
    if (activeStep === 2) {
      // StepAddress is active
      const addressId = selectedBasicRadio;
      const userData = JSON.parse(localStorage.getItem("userData"));
      const cart_id = JSON.parse(localStorage.getItem("cart_id"));

      const orderData = {
        address_id: addressId,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        message: "message",
        cart_id: cart_id,
        payment_method: value,
      };

      await _addresses.order(orderData).then((res) => {
        if (res?.code === 200) {
          setOrderResponse(res.data); // Store the order response
          localStorage.removeItem("cart_id");
          if (value === "fib") {
            Swal.fire({
              title: t("Please scan the QR code with your FIB mobile app"),
              imageUrl: res?.data?.payment_details?.qrCode,
              imageWidth: 150,
              imageHeight: 150,
              imageAlt: "QR Code",

              allowOutsideClick: false, // Prevents closing by clicking outside
              allowEscapeKey: false, // Prevents closing by pressing Escape
              allowEnterKey: false, // Prevents closing by pressing Enter
            }).then(() => {
              Swal.fire({
                title: t("Please Wait ..."),
                showConfirmButton: false,
                allowOutsideClick: false, // Prevents closing by clicking outside
                allowEscapeKey: false, // Prevents closing by pressing Escape
                allowEnterKey: false, // Prevents closing by pressing Enter
              });
              pollOrderStatus(res.data.id); // Start polling with the order ID
            });
          } else {
            setActiveStep((prevStep) => prevStep + 1);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res?.error?.message,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      });
    } else {
      setActiveStep((prevStep) => prevStep + 1); // Move to the next step for other steps
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepCart handleNext={handleNext} />;
      case 1:
        return (
          <StepAddress
            handleNext={handleNext}
            selectedBasicRadio={selectedBasicRadio}
            setSelectedBasicRadio={setSelectedBasicRadio}
          />
        );
      case 2:
        return <StepPayment handleNext={handleNext} />;
      case 3:
        return <StepConfirmation orderResponse={orderResponse} />; // Pass the order response to the last step
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent sx={{ pt: 11, pb: 5 }}>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            connector={
              theme.direction === "ltr" ? (
                <KeyboardDoubleArrowRightRoundedIcon />
              ) : (
                <KeyboardDoubleArrowLeftIcon />
              )
            }
          >
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel icon={<></>}>
                    {step.icon}
                    <Typography
                      className="step-title"
                      sx={{ display: { md: "block", xs: "none" } }}
                    >
                      {step.title}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <CardContent>{getStepContent(activeStep)}</CardContent>
    </Card>
  );
};

export default Checkout;
