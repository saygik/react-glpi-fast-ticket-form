import React from 'react';
import {makeStyles, useTheme } from "@material-ui/core/styles"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import TicketWizard from './components/TicketWizard';
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Typography} from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
  fab: {
    height:55,
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  fabClosed:{
    fontSize:'1.2rem',
    fontWeight:'600',
    margin: theme.spacing(1) ,
    letterSpacing: '5px'
  }
}));



export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick =() => {
    setOpen(open=>!open)
  }
  return (
      <React.Fragment>
        <TicketWizard open={open} setOpen={setOpen}/>
        <Fab aria-label={'Add'} className={clsx(classes.fab, classes.fabGreen)} color={'primary'} onClick={handleClick} size={"large"} variant={open ? "round":"extended"}>
          {open
              ? <FontAwesomeIcon icon={faTimes} style={{fontSize: '2rem'}}/>
              : <React.Fragment>
                    <Typography component="div" className={classes.fabClosed}  >
                      ЗАЯВКА В ИРЦ
                    </Typography>
                    <FontAwesomeIcon icon={faEdit} style={{fontSize: '1.75rem'}}/>
              </React.Fragment>
          }
        </Fab>
      </React.Fragment>
  );
}
