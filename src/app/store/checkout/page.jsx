"use client";
// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Step from "@mui/material/Step";
import Divider from "@mui/material/Divider";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiStepper from "@mui/material/Stepper";

// ** Icon Imports
import Icon from "components/modules/icon";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// ** Step Components
import StepCart from "./StepCart";
import StepAddress from "./StepAddress";
import StepPayment from "./StepPayment";
import StepConfirmation from "./StepConfirmation";

// ** Styled Components
import StepperWrapper from "./_components/StepperWrapper";
import { _AuthApi } from "api/auth";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

const Stepper = styled(MuiStepper)(({ theme }) => ({
  margin: "auto",
  maxWidth: 800,
  justifyContent: "space-around",
  flexDirection: "row !important",
  "& .MuiStep-root": {
    cursor: "pointer",
    textAlign: "center",
    "&:not(:last-child)": {
      paddingBottom: theme.spacing(8),
    },
    "&.Mui-completed + svg": {
      color: theme.palette.primary.main,
    },
    "& + svg": {
      display: "none",
      color: theme.palette.text.disabled,
    },
    "& .MuiStepLabel-label": {
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
      svg: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(0.75),
        fill: theme.palette.text.primary,
      },
      "&.Mui-active, &.Mui-completed": {
        "& .MuiTypography-root": {
          color: theme.palette.primary.main,
        },
        "& svg": {
          fill: theme.palette.primary.main,
        },
      },
    },
    "& .step-title": {
      fontWeight: 400,
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: "0 !important",
      "& + svg": {
        display: "block",
      },
      "& .MuiStepLabel-label": {
        display: "block",
      },
    },
  },
}));

const Checkout = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation("index");
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
      title: t("Confermation"),
      icon: <ReceiptLongRoundedIcon />,
    },
  ];
  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const theme = useTheme();

  const getStepContent = (step) => {
    if (_AuthApi.getToken()) {
      switch (step) {
        case 0:
          return <StepCart handleNext={handleNext} />;
        case 1:
          return <StepAddress handleNext={handleNext} />;
        case 2:
          return <StepPayment handleNext={handleNext} />;
        case 3:
          return <StepConfirmation />;
        default:
          return null;
      }
    } else return <StepCart handleNext={handleNext} />;
  };

  const renderContent = () => {
    return getStepContent(activeStep);
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
                <Step key={index} onClick={() => setActiveStep(index)} sx={{}}>
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
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default Checkout;
