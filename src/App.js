import React from 'react';
import {makeStyles, useTheme } from "@material-ui/core/styles"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import TicketWizard from './components/TicketWizard';
import {faPencilAlt, faTimes} from "@fortawesome/free-solid-svg-icons"
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
    fontSize:'1.3rem',
    fontWeight:'600',
    margin: theme.spacing(1) ,
    letterSpacing: '2px'
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
                      Заявка техподдержки
                    </Typography>
                    <FontAwesomeIcon icon={faPencilAlt} style={{fontSize: '2rem'}}/>
              </React.Fragment>
          }
        </Fab>
      </React.Fragment>
  );
}
