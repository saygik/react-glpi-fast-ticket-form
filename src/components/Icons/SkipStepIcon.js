import clsx from "clsx"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import React from "react"
import {makeStyles} from "@material-ui/core/styles"


export default function SkipStepIcon(props) {
    const classes = useStyles();
    const {active, completed} = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <DoubleArrowIcon className={classes.completed}/> : <div className={classes.circle}/>}
        </div>
    );
}


const useStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#717172',
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#079f07',
        zIndex: 1,
        fontSize: 26,
    },
});
