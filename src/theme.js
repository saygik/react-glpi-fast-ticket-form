import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b82f6',   // насыщенный, но не ядовитый синий
    },
    secondary: {
      main: '#0ea5e9',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'transparent',   // не перекрашиваем общий фон страницы (важно для встраивания в GLPI)
      paper: '#e5e7eb',         // фон карточки мастера (серый чуть темнее)
    },
    text: {
      primary: '#111827',   // тёмный серый для текста
      secondary: '#4b5563', // средний серый
    },
  },
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
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
          padding: '8px 3px 12px 4px !important',

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
});

export default theme;
