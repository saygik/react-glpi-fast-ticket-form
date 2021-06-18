import clsx from "clsx"
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined"
import CachedOutlinedIcon from "@material-ui/icons/CachedOutlined"
import React from "react"
import {makeStyles} from "@material-ui/core/styles"

export default function ReviewStepIcon(props) {
    const classes = useStyles();
    const {active, completed} = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <CheckCircleOutlineOutlinedIcon className={classes.completed}/> :
                <CachedOutlinedIcon className={classes.active}/>}
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
        color: '#784af4',
        zIndex: 1,
        fontSize: 30,
    },
    circle: {
        fontSize: 30,
    },
    completed: {
        color: '#079f07',
        zIndex: 1,
        fontSize: 30,
    },
});
