import { createTheme } from "@mui/material/styles";

const customShadows = [
  "none",
  "0px 1px 2px 0px rgba(0,0,0,0.05)",
  "0px 1px 4px 0px rgba(0,0,0,0.1)",
  "0px 2px 4px 0px rgba(0,0,0,0.1)",
  "0px 2px 6px 0px rgba(0,0,0,0.1)",
  "0px 4px 8px 0px rgba(0,0,0,0.1)",
  "0px 6px 12px 0px rgba(0,0,0,0.1)",
  "0px 8px 16px 0px rgba(0,0,0,0.1)",
  "0px 12px 24px 0px rgba(0,0,0,0.1)",
  "0px 16px 32px 0px rgba(0,0,0,0.1)",
  "0px 20px 40px 0px rgba(0,0,0,0.1)",
  // Add more shadows as needed
];

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#06c5e6",
    },
    secondary: {
      lighter: "#A7AFDC",
      light: "#8A95D0",
      main: "#5463bb",
      dark: "#404EA0",
      darker: "#2F3975",
    },
    info: {
      lighter: "#CAFDF5",
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      darker: "#003768",
      contrastText: "#fff",
    },
    success: {
      lighter: "#E9FCD4",
      light: "#AAF27F",
      main: "#54D62C",
      dark: "#229A16",
      darker: "#08660D",
      contrastText: "#fff",
    },
    warning: {
      lighter: "#FFF7CD",
      light: "#FFE16A",
      main: "#FFC107",
      dark: "#B78103",
      darker: "#7A4F01",
      contrastText: "#fff",
    },
    error: {
      lighter: "#FFE7D9",
      light: "#FFA48D",
      main: "#FF4842",
      dark: "#B72136",
      darker: "#7A0C2E",
      contrastText: "#fff",
    },
    grey: {
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
    },
    background: {
      paper: "#fff",
      default: "#F9FAFB",
      neutral: "#F4F6F8",
    },
    text: {
      primary: "#212B36",
      secondary: "#637381",
      disabled: "#919EAB",
    },
  },
  typography: {
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shadows: customShadows,
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: 'text.primary', // Set the desired label color
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'text.primary', // Set the desired label color
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: 'white',
        },
      },
    },
  },
});

export default theme;
