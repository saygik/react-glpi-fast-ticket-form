import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.87)',
          cursor: 'text',
          display: 'inline-flex',
          position: 'relative',
          fontSize: '1rem!important',
          boxSizing: 'borderBox',
          alignItems: 'center',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: '400!important',
          lineHeight: '1.1876em!important',
          letterSpacing: '0.00938em!important'
        },
        input: {
          padding: '6px 0 7px !important',
          fontSize: '14!important',
          "&&": {
            fontSize: '14!important',
          },
          "&:required": {
            border: '0!important',
            "&:valid": {
              border: '0!important',
            }
          }
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
