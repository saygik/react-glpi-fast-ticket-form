import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Review from './forms/ReviewForm';
import BigLoader from "./BigLoader/BigLoader"
import StepIcon from '@mui/material/StepIcon';
import Avatar from '@mui/material/Avatar';
import { ReviewStepIcon, SkipStepIcon } from './Icons'
import Grid from "@mui/material/Grid"


import { green } from '@mui/material/colors';

export default function TicketWizardUI(props) {
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
        goToStep,
    } = props;
    return (
        <div>


            <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                    fontSize: '2rem',
                    '& .MuiStepConnector-line': {
                        borderColor: '#2fb344',
                    },
                    '& .MuiStepIcon-root': {
                        color: '#2fb344',
                        '&.Mui-active': {
                            color: '#2fb344',
                        },
                        '&.Mui-completed': {
                            color: '#2fb344',
                        },
                    },
                }}
            >

                {steps.map((step) => {
                    const stepProps = {}
                    let label = step.label
                    let stepComponent = StepIcon
                    if (step.id === 1 && disableRegion) {
                        stepComponent = SkipStepIcon
                    }
                    if (activeStep === steps.length - 1 && step.id === steps.length - 1) {
                        stepComponent = ReviewStepIcon
                        if (ticketId > 0) {
                            stepProps.completed = true
                            label = 'Принята'

                        } else if (ticketId < 0) {
                            stepComponent = StepIcon
                            labelProps.error = true;
                            label = 'Отклонена'
                        }
                    }
                    //                                labelProps.classes={label: classes.customLabelStyle, labelContainer:classes.customLabelContainerStyle}
                    return (
                        <Step key={step.id} {...stepProps} >
                            <StepLabel
                                StepIconComponent={stepComponent}
                                sx={(theme) => ({
                                    '& .MuiStepLabel-iconContainer': { transform: 'scale(1.3)' },
                                    '& .MuiStepLabel-label': {
                                        mt: '6px',
                                        color: theme.palette.text.secondary,
                                    },
                                })}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>

            <Box
                sx={(theme) => ({
                    backgroundColor: '#f3f4f6',      // светло‑серый
                    mx: '20px',
                    p: '20px',
                    pt: '40px',
                    position: 'relative',
                    borderRadius: 2,                // заметные скругления
                    boxShadow: theme.shadows[3],     // мягкая тень вокруг
                })}
            >
                <Grid
                    component="div"
                    container
                    justifyContent="center"
                    spacing={0}
                    sx={{
                        position: 'absolute',
                        top: '-20px',
                        marginLeft: '-10px',
                    }}
                >

                    {!!steps[activeStep].icon && (
                        <Avatar
                            sx={{
                                height: '45px',
                                width: '45px',
                                color: 'white',
                                bgcolor: '#2fb344',
                            }}
                        >
                            {React.cloneElement(steps[activeStep].icon)}
                        </Avatar>
                    )}
                </Grid>
                {activeStep === steps.length - 1 ? (
                    <React.Fragment>
                        <Review ticketId={ticketId} />
                        {loader && <BigLoader />}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                disabled={ticketId === 0}
                                onClick={() => {
                                    handleReset()
                                    userFromLocalStorage()
                                }}
                                sx={{ ml: '10px' }}
                                variant="outlined"
                                color="success"
                            >
                                Новая заявка
                            </Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            formik.handleSubmit()
                        }}>
                            {React.cloneElement(steps[activeStep].component, { ...formik, goToStep })}

                            {loader && <BigLoader />}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 0, ml: '10px' }} variant="outlined" color="success">
                                        Назад
                                    </Button>
                                )}
                                <Button
                                    type='submit'
                                    color="success"
                                    variant="outlined"
                                    sx={{ mt: 0, ml: '10px' }}
                                    disabled={!activeStepValid}
                                >
                                    {activeStep === steps.length - 2 ? 'Отправить заявку' : 'Вперёд'}
                                </Button>

                            </Box>
                        </form>

                    </React.Fragment>
                )}
            </Box>

        </div>
    );
}
