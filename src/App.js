import React from 'react';
import {makeStyles} from "@material-ui/core/styles"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import TicketWizard from './components/TicketWizard';


const useStyles = makeStyles((theme) => ({
  fab: {
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
}));


export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick =() => {
    setOpen(open=>!open)
  }
  return (
      <React.Fragment>
        <TicketWizard open={open} />
        <Fab aria-label={'Add'} className={clsx(classes.fab, classes.fabGreen)} color={'primary'} onClick={handleClick}>
          {open ?  <DownIcon /> : <AddIcon />}
        </Fab>
      </React.Fragment>
  );
}
