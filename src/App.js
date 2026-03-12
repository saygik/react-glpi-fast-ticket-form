import React from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import TicketWizard from './components/TicketWizard';
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Typography from "@mui/material/Typography"

export default function App() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(open => !open)
  }
  return (
    <React.Fragment>
      <TicketWizard open={open} setOpen={setOpen} />
      <Fab
        aria-label="Add"
        color="success"
        onClick={handleClick}
        size="large"
        variant={open ? "circular" : "extended"}
        sx={{
          height: 55,
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          boxShadow: '0 0.5rem 1rem rgba(0,0,0,.15)', // Bootstrap shadow-lg
          borderRadius: open ? 50 : 1, // Круглые углы как pills
          minWidth: open ? 60 : 240,
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'none', // Без UPPERCASE как в Bootstrap
          '&:hover': {
            boxShadow: '0 0.75rem 1.5rem rgba(0,0,0,.2)',
            transform: 'translateY(-2px)',
            bgcolor: 'success.dark'
          },
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {open ? (
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.5rem' }} />
        ) : (
          <Box className="d-flex align-items-center gap-2" sx={{ px: 1.5 }}>
            <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.25rem' }} />
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              ЗАЯВКА В ИРЦ
            </Typography>
          </Box>
        )}
      </Fab>

    </React.Fragment>
  );
}
