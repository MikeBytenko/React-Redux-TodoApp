import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#F6E308",
      contrastText: "#000000",
    },
    contrastText: "#ffffff",
    background: {
      default: "#f5f7f7",
      paper: "#ffffff",
    },
  },
  root: { flexGrow: 1, fontFamily: "Roboto" },
  typography:{
    caption: {
        color: '#669900',
        fontSize:15
    }
  }
 
});

export default theme;