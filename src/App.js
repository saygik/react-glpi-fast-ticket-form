import React from 'react';
import Fab from '@mui/material/Fab';
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
        aria-label={'Add'}
        color={'primary'}
        onClick={handleClick}
        size={"large"}
        variant={open ? "round" : "extended"}
        sx={{
          height: 55,
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          color: 'common.white',
          bgcolor: green[500],
          '&:hover': { bgcolor: green[600] },
        }}
      >
        {open
          ? <FontAwesomeIcon icon={faTimes} style={{ fontSize: '2rem' }} />
          : <React.Fragment>
            <Typography
              component="div"
              sx={{
                fontSize: '1.2rem',
                fontWeight: 600,
                margin: '10px',
                letterSpacing: '5px'
              }}
            >
              ЗАЯВКА В ИРЦ
            </Typography>
            <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.75rem' }} />
          </React.Fragment>
        }
      </Fab>
    </React.Fragment>
  );
}
