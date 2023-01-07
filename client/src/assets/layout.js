const componentStyles = (theme) => ({
  mainContent: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "20vw",
    },
    marginTop: "0px",
    height: "100%",
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "39px",
      paddingRight: "39px",
    },
  },
});

export default componentStyles;
