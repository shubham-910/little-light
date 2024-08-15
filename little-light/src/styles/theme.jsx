import Fredoka from "../fonts/Fredoka/Fredoka-VariableFont_wdth,wght.ttf";
import { createTheme } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: "Fredoka, Roboto",
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
        @font-face {
          font-family: 'Fredoka';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Fredoka'), local('Fredoka'), url(${Fredoka}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
		},
	},
	palette: {
		primary: {
			main: "#6A4586",
		},
		secondary: {
			main: "#a19aed",
		},
		info: {
			main: "#6A4586",
		},
		success: {
			main: "#559061",
		},
		warning: {
			main: "#d38029",
		},
		danger: {
			main: "#f44336",
		},
		text: {
			primary: "#6A4586",
			secondary: "#a7afbe",
		},
	},
	shape: {
		borderRadius: "20px",
	},
});

export default theme;
