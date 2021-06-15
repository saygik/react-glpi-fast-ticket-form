    import React, {useEffect} from 'react'
    import { makeStyles, withStyles } from '@material-ui/core/styles';
    import Paper from '@material-ui/core/Paper';
    import Stepper from '@material-ui/core/Stepper';
    import Step from '@material-ui/core/Step';
    import StepLabel from '@material-ui/core/StepLabel';
    import Button from '@material-ui/core/Button';
    import Link from '@material-ui/core/Link';
    import Typography from '@material-ui/core/Typography';
    import AddressForm from './forms/AddressForm';
    import OrganizationForm from './forms/OrganizationForm';
    import TicketForm from './forms/TicketForm';
    import Review from './forms/ReviewForm';
    import { useFormik } from "formik";
    import * as Yup from "yup";
    import BigLoader from "./BigLoader/BigLoader"
    import api from "../services/api"
    import clsx from 'clsx';
    import CloseIcon from '@material-ui/icons/Close';
    import StepIcon from '@material-ui/core/StepIcon';
    import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
    import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';


    const useReviewStepIconStyles = makeStyles({
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
            color: '#0f0',
            zIndex: 1,
            fontSize: 30,
        },
    });
    function ReviewStepIcon(props) {
        const classes = useReviewStepIconStyles();
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

    const useQontoStepIconStyles = makeStyles({
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
            color: '#717172',
            zIndex: 1,
            fontSize: 32,
        },
    });
    function ColorlibStepIcon(props) {
        const classes = useQontoStepIconStyles();
        const {active, completed} = props;

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                })}
            >
                {completed ? <CloseIcon className={classes.completed}/> : <div className={classes.circle}/>}
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
            width: '400',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },

        paper: {
            backgroundColor:'#faf9f9',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            padding: 0,
            position: 'relative',
            borderRadius:'15px',
            [theme.breakpoints.up(500 + theme.spacing(3) * 2)]: {
                // marginTop: theme.spacing(6),
                // marginBottom: theme.spacing(6),
                // padding: theme.spacing(3),
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(1),
            },
        },
        paper2: {
            backgroundColor:'#faf9f9',
            margin: 0,
            padding: theme.spacing(2),
            paddingTop: theme.spacing(2),

            position: 'relative',
        },
        stepper: {
            backgroundColor:'#faf9f9',
            marginTop:'15px',
            padding: theme.spacing(3, 0, 2),
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
    }));

    let initialValues= {
        email: "",
        saveMe: false,
        userId:0,
        org: 0,
        title: "",
        description:"",
        urgency:3,
        tip:1
    }


    const steps=[
        {
            id:0,
            label:'АДРЕС',
            copmonent: <AddressForm />,
            validationSchema: Yup.object({
                email: Yup.string().email("Неправильный адрес").required("Необхобимо заполнить"),
            })
            },
        {
            id:1,
            label:'РЕГИОН',
            copmonent:    <OrganizationForm />,
            validationSchema: Yup.object({
                org:   Yup.number().required("Необхобимо заполнить").min(1,"Необходимо выбрать").integer(),
            })
        },
        {
            id:2,
            label:'ОПИСАНИЕ',
            copmonent: <TicketForm />,
            validationSchema: Yup.object({
                urgency:   Yup.number().required("Необхобимо заполнить").min(1,"Необходимо выбрать").positive().integer(),
                tip:   Yup.number().min(1).max(2).integer(),
                title: Yup
                    .string()
                    .min(4,"Хотя бы 4 символа")
                    .required("Необхобимо заполнить"),
                description: Yup
                    .string()
                    .min(4,"Хотя бы 4 символа")
                    .required("Необхобимо заполнить"),
            })
        },
        {
            id:3,
            label:'ЗАЯВКА',
            copmonent:    <Review />,
        },
    ]

    export default function TicketWizard({open}) {
        const classes = useStyles();
        const [activeStep, setActiveStep] = React.useState(0);
        const [loader, setLoader] = React.useState(false);
        const [activeStepValid, setActiveStepValid] = React.useState(false);
        const [disableRegion, setDisableRegion] = React.useState(false);
        const [ticketId, setTicketId] = React.useState(0);

        useEffect(()=>{
            //userFromLocalStorage()
        },[])
        const formik = useFormik({
            initialValues: initialValues,
            validateOnInit: false,
            validateOnChange: true,
            onSubmit: (values,helpers) => {
                if (values.saveMe) {
                    localStorage.setItem('REACT_GLPI_FORM_SAVEME',values.saveMe)
                    localStorage.setItem('REACT_GLPI_FORM_USER', values.email)
                } else {
                    delete localStorage.REACT_GLPI_FORM_SAVEME
                    delete localStorage.REACT_GLPI_FORM_USER
                }
                if (activeStep===steps.length-2) {
                    setLoader(true)
                    const ticket={
                        "name": values.title,
                        "requesttypes_id":"7",
                        "content":values.description,
                        "_users_id_requester": "0",
                        "_users_id_requester_notif": {
                            "use_notification":"1",
                            "alternative_email":[`${values.email}`]
                        },
                        "entities_id": `${values.org}`,
                         "_users_id_assign":"130",
                        "type": `${values.tip}`,
                        "status":"1",
                        "urgency":"3"
                    }
                    if (values.userId && values.userId>0) {
                        ticket._users_id_requester=`${values.userId}`
                        delete ticket._users_id_requester_notif
                    }
                    setActiveStep((s) => s + 1)

//                    console.log('-ticket-',ticket)
                    api.addTicket(ticket)
                        .then(res=>{

                            setLoader(false)
                            if (res.data.id>0) {
                                setTicketId(res.data.id)
                            } else {
                                setTicketId(-1)
                            }
                        }).catch(err=>{
                        console.log('-ERR-',err)
                        setTicketId(-1)
                        setLoader(false)
                    })
                    // setTicketId(6663)
                    // setLoader(false)
                } else {
                    if (activeStep===0 && values.email) {
                        setLoader(true)
                        api.findUser(values.email)
                            .then(user=>{
                                setLoader(false)
                                if (user.data.data.id>0) {
                                    formik.setFieldValue('org', user.data.data.entities_id)
                                    formik.setFieldValue('userId', user.data.data.id)
                                    setDisableRegion(true)
                                    setActiveStep((s) => s + 2);
                                } else setActiveStep((s) => s + 1);
                            }).catch(err=>{
                            console.log('-ERR-',err)
                            setLoader(false)
                            setActiveStep(activeStep + 1);
                        })
                    } else {
                        setActiveStep((s) => s + 1);
                    }
//                    helpers.setTouched({});
                }
            },
            validationSchema: steps[activeStep].validationSchema
        });
        const userFromLocalStorage= () =>{
            if (!formik) return
            const saveMe = localStorage.getItem('REACT_GLPI_FORM_SAVEME')
            const user = localStorage.getItem('REACT_GLPI_FORM_USER')
            if (user && user.length>0) {
                formik.setFieldValue('email', user)
                setTimeout(() => {
                    try {
                        formik.validateField('email')
                    } catch {}
                }, 1000);
            }
            if (!!saveMe) {
                formik.setFieldValue('saveMe', saveMe==='true')
            }

        }
        useEffect(()=>{
            setActiveStepValid(
          (activeStep===0) && (!formik.errors.email
                                 && (formik.initialValues.email !== formik.values.email)) ||
                (activeStep===1) && (!formik.errors.org
                                 && (formik.initialValues.org !== formik.values.org)) ||
                (activeStep===2) && (!formik.errors.title
                                 && (formik.initialValues.title !== formik.values.title))
                                 && !formik.errors.description
                                 && (formik.initialValues.description !== formik.values.description)
            )
        },[formik, activeStep])

        useEffect(()=>{
            if (!open) {
                handleReset()
            } else {
                userFromLocalStorage()
            }
        },[open])

        const handleBack = () => {
            if (disableRegion && activeStep===2) {
                setActiveStep((s) => s - 2);
            } else
            setActiveStep((s) => s - 1);
            setDisableRegion(false)
        };
        const handleReset = () => {
            setDisableRegion(false)
            formik.handleReset()
            setTicketId(0)
            setActiveStep(0);
        };

        return (
            <React.Fragment>
                {open &&
                <div className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h6" align="center" style={{letterSpacing: '4px', color: '#737171'}}>
                            БЫСТРАЯ ЗАЯВКА
                        </Typography>
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
                                    stepComponent = ColorlibStepIcon
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
                            {activeStep === steps.length - 1 ? (
                                <React.Fragment>
                                    <Review ticketId={ticketId}/>
                                    {loader && <BigLoader/>}
                                    <Button onClick={()=>{
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
                                        {React.cloneElement(steps[activeStep].copmonent, formik)}

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
                }
            </React.Fragment>
        );
    }
