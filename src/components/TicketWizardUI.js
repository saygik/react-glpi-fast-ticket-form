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
    } = props;
    return (
        <Box
            sx={(theme) => ({
                position: 'absolute',
                bottom: '20px',
                right: '10px',
                width: 360,
                mx: '20px',
                '@media (min-width:500px)': {
                    width: 360,
                    mx: 'auto',
                },
                // фон под карточкой, чтобы не было «прозрачного» прямоугольника
                backgroundColor: theme.palette.background.default,
            })}
        >
            <Paper
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[8],
                    position: 'relative',
                    borderRadius: '0x',
                    pb: '10px',
                    mb: '60px',
                    '@media (min-width:500px)': {

                    },
                })}
            >

                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.palette.common.white,
                        m: 0,
                        p: '10px',
                        position: 'relative',
                        borderRadius: '0x',
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    })}
                >
                    <Typography
                        component="div"
                        align="center"
                        sx={(theme) => ({
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            letterSpacing: '5px',
                            color: theme.palette.text.primary,
                        })}
                    >
                        БЫСТРАЯ ЗАЯВКА
                    </Typography>
                    <Typography
                        component="div"
                        align="right"
                        sx={(theme) => ({
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                            color: theme.palette.text.secondary,
                        })}
                    >
                        v1.0.0
                    </Typography>
                </Box>
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.paper,
                        mt: '20px',
                        mb: '10px',
                        p: '20px 0 20px',
                        fontSize: '3rem',
                        '& .MuiStepConnector-line': {
                            borderColor: theme.palette.divider,
                        },
                    })}
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
                                        '& .MuiStepLabel-iconContainer': { transform: 'scale(1.6)' },
                                        '& .MuiStepLabel-label': {
                                            mt: '12px',
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
                        backgroundColor: theme.palette.common.white,
                        mx: '20px',
                        p: '20px',
                        pt: '40px',
                        position: 'relative',
                        borderRadius: '10px',
                        border: `1px solid ${theme.palette.divider}`,
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
                            marginLeft: '-20px',
                        }}
                    >

                        {!!steps[activeStep].icon && (
                            <Avatar
                                sx={(theme) => ({
                                    height: '45px',
                                    width: '45px',
                                    color: theme.palette.getContrastText(theme.palette.primary.main),
                                    bgcolor: theme.palette.primary.main,
                                })}
                            >
                                {React.cloneElement(steps[activeStep].icon)}
                            </Avatar>
                        )}
                    </Grid>
                    {activeStep === steps.length - 1 ? (
                        <React.Fragment>
                            <Review ticketId={ticketId} />
                            {loader && <BigLoader />}
                            <Button
                                disabled={ticketId === 0}
                                onClick={() => {
                                    handleReset()
                                    userFromLocalStorage()
                                }}
                                sx={{ mt: '30px', ml: '10px' }}
                                variant="contained"
                                color="primary"
                            >
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

                                {loader && <BigLoader />}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: '30px', ml: '10px' }}>
                                            Назад
                                        </Button>
                                    )}
                                    <Button
                                        type='submit'
                                        color="primary"
                                        sx={{ mt: '30px', ml: '10px' }}
                                        disabled={!activeStepValid}
                                    >
                                        {activeStep === steps.length - 2 ? 'Отправить заявку' : 'Вперёд'}
                                    </Button>

                                </Box>
                            </form>

                        </React.Fragment>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
