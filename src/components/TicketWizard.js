    import React, {useEffect} from 'react'
    import { makeStyles, withStyles } from '@material-ui/core/styles';

    import {Typography, Box,Step, Stepper, StepLabel, Paper, Button} from '@material-ui/core';
    import AddressForm from './forms/AddressForm';
    import OrganizationForm from './forms/OrganizationForm';
    import TicketForm from './forms/TicketForm';
    import Review from './forms/ReviewForm';
    import { useFormik } from "formik";
    import * as Yup from "yup";
    import BigLoader from "./BigLoader/BigLoader"
    import api from "../services/api"
    import clsx from 'clsx';
    import TicketWizardUI from './TicketWizardUI'
    import { faEnvelopeOpen, faSitemap, faShareSquare } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

    let initialValues= {
        email: "",
        saveMe: false,
        userId:0,
        org: 0,
        fio: "",
        phone:"",
        address:"",
        title: "",
        description:"",
        urgency:3,
        tip:2
    }


    const steps=[
        {
            id:0,
            label:'АДРЕС',
            component: <AddressForm />,
            icon: <FontAwesomeIcon icon={faEnvelopeOpen} style={{fontSize:'1.5rem'}} />,
            validationSchema: Yup.object({
                email: Yup.string().email("Неправильный адрес").required("Необходимо заполнить"),
            })
            },
        {
            id:1,
            label:'КОНТАКТЫ',
            component:    <OrganizationForm />,
            icon: <FontAwesomeIcon icon={faSitemap} style={{fontSize:'1.5rem'}} />,
            validationSchema: Yup.object({
                org:   Yup.number().required("Необходимо заполнить").min(1,"Необходимо выбрать").integer(),
                fio:   Yup.string().required("Необходимо заполнить"),
                phone: Yup.string().required("Необходимо заполнить"),
                address: Yup.string(),
            })
        },
        {
            id:2,
            label:'ОПИСАНИЕ',
            component: <TicketForm />,
            icon: <FontAwesomeIcon icon={faShareSquare} style={{fontSize:'1.5rem'}} />,
            validationSchema: Yup.object({
                urgency:   Yup.number().required("Необходимо заполнить").min(1,"Необходимо выбрать").positive().integer(),
                tip:   Yup.number().min(1).max(2).integer(),
                title: Yup
                    .string()
                    .min(4,"Хотя бы 4 символа")
                    .required("Необходимо заполнить"),
                description: Yup
                    .string()
                    .min(4,"Хотя бы 4 символа")
                    .required("Необходимо заполнить"),
            })
        },
        {
            id:3,
            label:'ЗАЯВКА',
            component:    <Review />,
        },
    ]

    export default function TicketWizard({open, setOpen}) {
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
                    const address =values.address ? '<br />Адрес: <em>'+values.address+ '</em></span></p>':''
                    const ticket={
                        "name": values.title,
                        "requesttypes_id":"7",
                        "content":values.description +
                            '<p><span style=\"color: #3A5693;\">'+
                            '<br />ФИО: <em>'+values.fio+'</em>'+
                            '<br />Телефон: <em>'+values.phone+ '</em>' +
                            address +
                            '</span></p>',
                        "_users_id_requester": "0",
                        "_users_id_requester_notif": {
                            "use_notification":"1",
                            "alternative_email":[`${values.email}`]
                        },
                        "entities_id": `${values.org}`,
//                        "_users_id_assign":"130",
                        "type": `${values.tip}`,
                        "status":"1",
                        "urgency":"3"
                    }
                    console.log('---',ticket)
                    if (values.userId && values.userId>0) {
                        ticket._users_id_requester=`${values.userId}`
                        ticket.content=values.description
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
                            !open && setOpen(open=>!open)
                        }).catch(err=>{
                        console.log('-ERR-',err)
                        setTicketId(-1)
                        setLoader(false)
                        !open && setOpen(open=>!open)
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
                                if (values.email.includes('rw.by')){
                                    console.log('Try without .by')
                                    api.findUser(values.email.replace('.by',''))
                                        .then(user=>{
                                            setLoader(false)
                                            if (user.data.data.id>0) {
                                                console.log('user: ', user.data.data.id)

                                                formik.setFieldValue('org', user.data.data.entities_id)
                                                formik.setFieldValue('userId', user.data.data.id)
                                                console.log('1')

                                                setDisableRegion(true)
                                                setActiveStep((s) => s + 2);
                                                console.log('2')

                                                return
                                            } else setActiveStep((s) => s + 1);
                                        }).catch(err=>{
                                        console.log('-ERR 2 attempt-',err)
                                        setLoader(false)
                                        setActiveStep(activeStep + 1);
                                    })
                                } else {
                                    console.log('-ERR-',err)
                                    setLoader(false)
                                    setActiveStep(activeStep + 1);
                                }
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
                                 && (formik.initialValues.org !== formik.values.org))
                                 && !formik.errors.phone
                                 && (formik.initialValues.phone !== formik.values.phone)
                                 && !formik.errors.fio
                                 && (formik.initialValues.fio !== formik.values.fio) ||
                (activeStep===2) && (!formik.errors.title
                                 && (formik.initialValues.title !== formik.values.title))
                                 && !formik.errors.description
                                 && (formik.initialValues.description !== formik.values.description)
            )
        },[formik, activeStep])

        useEffect(()=>{
            if (!open) {
                //handleReset()
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
            setLoader(false)
            formik.handleReset()
            setTicketId(0)
            setActiveStep(0);
        };

        return (open &&
            <TicketWizardUI
                steps={steps}
                disableRegion={disableRegion}
                activeStep={activeStep}
                ticketId={ticketId}
                loader={loader}
                formik={formik}
                activeStepValid={activeStepValid}
                handleBack={handleBack}
                handleReset={handleReset}
                userFromLocalStorage={userFromLocalStorage}
    />
            );
    }
