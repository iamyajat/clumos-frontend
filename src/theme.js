import { createTheme } from "@mui/material";

const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        fontFamily: 'Rubik',
    },
    overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#689f38',
                color: '#fff',
            },
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
        MuiAppBar: {
            color: 'inherit',
        },
    },
    shape: {
        borderRadius: 10,
    },
};

const theme = createTheme(themeOptions);

export default theme;