import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  overrides: {
    MuiDialog: {
      paper: {
        width: "100%",
        maxWidth: "none",
      },
    },
  },
});

export default theme;
