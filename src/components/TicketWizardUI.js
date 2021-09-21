import React, {useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Typography, Box,Step, Stepper, StepLabel, Paper, Button} from '@material-ui/core';
import Review from './forms/ReviewForm';
import BigLoader from "./BigLoader/BigLoader"
import StepIcon from '@material-ui/core/StepIcon';
import Avatar from '@material-ui/core/Avatar';
import {ReviewStepIcon,SkipStepIcon} from './Icons'
import Grid from "@material-ui/core/Grid"


import { green } from '@material-ui/core/colors';
import clsx from "clsx"

export default function TicketWizardUI(props) {
    const classes = useStyles();
    const {
        steps,
        disableRegion,
        activeStep,
        ticketId,
        loader,
        handleReset,
        formik,
        userFromLocalStorage,
        activeStepValid,
        handleBack,
    }=props;
    return (
            <div className={classes.layout}>
                <Paper className={classes.paper}>

                    <Box className={classes.header}>
                        <Typography component="div" align="center" className={classes.headerCaption}>
                            БЫСТРАЯ ЗАЯВКА
                        </Typography>
                        <Typography component="div" align="right" style={{fontSize:'12px',letterSpacing: '1px', color: '#929191'}}>
                            v0.5.0-beta
                        </Typography>
                    </Box>
                    <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>

                        {steps.map((step) => {
                            const stepProps = {}
                            let label=step.label
                            const labelProps = {
                                classes: {
                                    iconContainer: classes.iconContainer,
                                    label:classes.customLabelStyle
                                }
                            }
                            let stepComponent = StepIcon
                            if (step.id === 1 && disableRegion) {
                                stepComponent = SkipStepIcon
                            }
                            if (activeStep === steps.length - 1 && step.id === steps.length - 1) {
                                stepComponent = ReviewStepIcon
                                if (ticketId > 0) {
                                    stepProps.completed = true
                                    label='Принята'

                                } else if (ticketId < 0) {
                                    stepComponent = StepIcon
                                    labelProps.error = true;
                                    label='Отклонена'
                                }
                            }
//                                labelProps.classes={label: classes.customLabelStyle, labelContainer:classes.customLabelContainerStyle}
                            return (
                                <Step key={step.id} {...stepProps} >
                                    <StepLabel
                                        StepIconComponent={stepComponent}
                                        {...labelProps}
                                    >{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>

                    <div className={classes.paper2}>
                        <Grid component="div" container justify="center" spacing={0} className={classes.headerIcon}>
                            {
                                !!steps[activeStep].icon && <Avatar className={clsx(classes.avatar, classes.green)}>
                                    {React.cloneElement(steps[activeStep].icon)}
                            </Avatar>
                            }
                        </Grid>
                        {activeStep === steps.length - 1 ? (
                            <React.Fragment>
                                <Review ticketId={ticketId}/>
                                {loader && <BigLoader/>}
                                <Button
                                    disabled={ticketId===0}
                                    onClick={()=>{
                                        handleReset()
                                        userFromLocalStorage()
                                    }} className={classes.button}>
                                    Новая заявка
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    formik.handleSubmit()
                                }}>
                                    {React.cloneElement(steps[activeStep].component, formik)}

                                    {loader && <BigLoader/>}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Назад
                                            </Button>
                                        )}
                                        <Button
                                            type='submit'
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            disabled={!activeStepValid}
                                        >
                                            {activeStep === steps.length - 2 ? 'Отправить заявку' : 'Вперёд'}
                                        </Button>

                                    </div>
                                </form>

                            </React.Fragment>
                        )}
                    </div>
                </Paper>
            </div>
    );
}


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(10),
        width: '360',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
            width: 360,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    paper: {
        backgroundColor: 'rgb(233, 238, 244)',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        padding: 0,
        paddingBottom: theme.spacing(2),
        position: 'relative',
        borderRadius:'15px',
        [theme.breakpoints.up(500 + theme.spacing(3) * 2)]: {
            // marginTop: theme.spacing(6),
            // marginBottom: theme.spacing(6),
            // padding: theme.spacing(3),
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
//                padding: theme.spacing(1),
        },
    },
    header: {
        backgroundColor:'#fff',
        margin: 0,
        padding: theme.spacing(1),
        position: 'relative',
        borderRadius: '15px 15px 0 0',
    },
    headerCaption:{
        fontSize:'1.2rem',
        fontWeight:'600',
        letterSpacing: '5px',
        color: '#737171'
    },
    headerIcon:{
        position: 'absolute',
        top: -theme.spacing(2.6),
        marginLeft: -theme.spacing(2.6),
    },
    avatar:{
        height: '45px',
        width: '45px'
    },
    paper2: {
        backgroundColor:'#fff',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4),
        position: 'relative',
        borderRadius:'10px',
    },
    stepper: {
        backgroundColor: 'rgb(233, 238, 244)',
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(1),
        padding: theme.spacing(2, 0, 2),
        fontSize:'3rem'
    },
    customLabelStyle:{
        marginTop:'12px !important'
    },
    iconContainer: { // define styles for icon container
        transform: 'scale(1.6)',

    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
}));
