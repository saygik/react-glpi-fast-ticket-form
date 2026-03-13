import React, { useEffect } from 'react'
import AddressForm from './forms/AddressForm';
import OrganizationForm from './forms/OrganizationForm';
import TicketForm from './forms/TicketForm';
import Review from './forms/ReviewForm';
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../services/api"
import TicketWizardUI from './TicketWizardUI'
import { faEnvelopeOpen, faSitemap, faShareSquare, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ServiceRequestSvg, ProblemReportSvg } from './TypeStepSvgs'

let initialValues = {
    email: "",
    saveMe: false,
    userId: 0,
    org: 0,
    fio: "",
    phone: "",
    address: "",
    title: "",
    description: "",
    urgency: 3,
    tip: 2
}

// icons.js

function TypeStep({ setFieldValue, goToStep }) {
    const handleSelect = (tipValue) => {
        setFieldValue('tip', tipValue);
        if (typeof goToStep === 'function') {
            goToStep(1);
        }
    };

    return (
        <div style={{
            height: 250,
            display: 'flex',
            alignItems: 'center',  // Центрирование по вертикали
            justifyContent: 'center', // Центрирование по горизонтали
            overflowY: 'auto',
            paddingRight: 4
        }}>
            <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%' // Чтобы занимал всю ширину
            }}>
                {/* Карточка "Запрос услуги" */}
                <div
                    onClick={() => handleSelect(2)}
                    style={{
                        flex: '1 1 300px',
                        maxWidth: '350px',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        border: '1px solid #f0f0f0',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                        const title = e.currentTarget.querySelector('.card-title');
                        if (title) title.style.color = '#ff9800';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                        const title = e.currentTarget.querySelector('.card-title');
                        if (title) title.style.color = '#1a1a1a';
                    }}
                >
                    <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            {/* SVG вынесен в отдельный файл */}
                            <div style={{ width: '70px', height: '70px', flexShrink: 0 }}>
                                <ServiceRequestSvg />
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3
                                    className="card-title"
                                    style={{
                                        margin: '0 0 8px 0',
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: '#1a1a1a',
                                        transition: 'color 0.3s ease'
                                    }}
                                >
                                    Запрос услуги
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                                    Попросите нашу команду предоставить услугу.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Карточка "Сообщить о проблеме" */}
                <div
                    onClick={() => handleSelect(1)}
                    style={{
                        flex: '1 1 300px',
                        maxWidth: '350px',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        border: '1px solid #f0f0f0',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                        const title = e.currentTarget.querySelector('.card-title');
                        if (title) title.style.color = '#ff9800';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                        const title = e.currentTarget.querySelector('.card-title');
                        if (title) title.style.color = '#1a1a1a';
                    }}
                >
                    <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            {/* SVG вынесен в отдельный файл */}
                            <div style={{ width: '70px', height: '70px', flexShrink: 0 }}>
                                <ProblemReportSvg />
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3
                                    className="card-title"
                                    style={{
                                        margin: '0 0 8px 0',
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: '#1a1a1a',
                                        transition: 'color 0.3s ease'
                                    }}
                                >
                                    Сообщить о проблеме
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                                    Обратитесь за поддержкой в нашу службу поддержки.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const steps = [
    {
        id: 0,
        label: 'ТИП',
        component: <TypeStep />,
        icon: <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: '1.5rem' }} />,
        // без validationSchema – отдельной валидации не требуется
    },
    {
        id: 1,
        label: 'АДРЕС',
        component: <AddressForm />,
        icon: <FontAwesomeIcon icon={faEnvelopeOpen} style={{ fontSize: '1.5rem' }} />,
        validationSchema: Yup.object({
            email: Yup.string().email("Неправильный адрес").required("Необходимо заполнить"),
        })
    },
    {
        id: 2,
        label: 'КОНТАКТЫ',
        component: <OrganizationForm />,
        icon: <FontAwesomeIcon icon={faSitemap} style={{ fontSize: '1.5rem' }} />,
        validationSchema: Yup.object({
            org: Yup.number().required("Необходимо заполнить").min(1, "Необходимо выбрать").integer(),
            fio: Yup.string().required("Необходимо заполнить"),
            phone: Yup.string().required("Необходимо заполнить"),
            address: Yup.string(),
        })
    },
    {
        id: 3,
        label: 'ОПИСАНИЕ',
        component: <TicketForm />,
        icon: <FontAwesomeIcon icon={faShareSquare} style={{ fontSize: '1.5rem' }} />,
        validationSchema: Yup.object({
            urgency: Yup.number().required("Необходимо заполнить").min(1, "Необходимо выбрать").positive().integer(),
            title: Yup
                .string()
                .min(4, "Хотя бы 4 символа")
                .required("Необходимо заполнить"),
            description: Yup
                .string()
                .min(4, "Хотя бы 4 символа")
                .required("Необходимо заполнить"),
        })
    },
    {
        id: 4,
        label: 'ЗАЯВКА',
        component: <Review />,
    },
]

export default function TicketWizard() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [loader, setLoader] = React.useState(false);
    const [activeStepValid, setActiveStepValid] = React.useState(false);
    const [disableRegion, setDisableRegion] = React.useState(false);
    const [ticketId, setTicketId] = React.useState(0);

    useEffect(() => {
        //userFromLocalStorage()
    }, [])
    const formik = useFormik({
        initialValues: initialValues,
        validateOnInit: false,
        validateOnChange: true,
        onSubmit: (values, helpers) => {
            if (values.saveMe) {
                localStorage.setItem('REACT_GLPI_FORM_SAVEME', values.saveMe)
                localStorage.setItem('REACT_GLPI_FORM_USER', values.email)
            } else {
                delete localStorage.REACT_GLPI_FORM_SAVEME
                delete localStorage.REACT_GLPI_FORM_USER
            }
            if (activeStep === steps.length - 2) {
                setLoader(true)
                const address = values.address ? '<br /><b>Адрес:</b> <em>' + values.address + '</em>' : ''
                const ticket = {
                    "name": values.title,
                    "requesttypes_id": "7",
                    "content": values.description +
                        '<p><span style=\"color: #3A5693;\">' +
                        '<br /><b>ФИО:</b> <em>' + values.fio + '</em>' +
                        '<br /><b>Телефон:</b> <em>' + values.phone + '</em>' +
                        address +
                        '</span></p>',
                    "_users_id_requester": "0",
                    "_users_id_requester_notif": {
                        "use_notification": "1",
                        "alternative_email": [`${values.email}`]
                    },
                    "entities_id": `${values.org}`,
                    //                        "_users_id_assign":"130",
                    "type": `${values.tip}`,
                    "status": "1",
                    "urgency": "3"
                }
                //                    console.log('---',ticket)
                if (values.userId && values.userId > 0) {
                    ticket._users_id_requester = `${values.userId}`
                    ticket.content = values.description
                    delete ticket._users_id_requester_notif
                }
                //                    console.log('---',ticket)
                setActiveStep((s) => s + 1)
                //                    console.log('-ticket-',ticket)
                api.addTicket(ticket)
                    .then(res => {
                        setLoader(false)
                        if (res.data.id > 0) {
                            setTicketId(res.data.id)
                        } else {
                            setTicketId(-1)
                        }

                    }).catch(err => {
                        console.log('-ERR-', err)
                        setTicketId(-1)
                        setLoader(false)

                    })
                // setTicketId(6663)
                // setLoader(false)
            } else {
                if (activeStep === 1 && values.email) {
                    setLoader(true)
                    api.findUser(values.email)
                        .then(user => {
                            setLoader(false)
                            //                                console.log('---XX',user)
                            if (user.status === 200 && user.data && user.data.data.id > 0) {
                                formik.setFieldValue('org', user.data.data.entities_self_service)
                                formik.setFieldValue('userId', user.data.data.id)
                                setDisableRegion(true)
                                setActiveStep((s) => s + 2);
                            } else {
                                if (values.email.includes('rw.by')) {
                                    setLoader(true)
                                    console.log('Try without .by')
                                    api.findUser(values.email.replace('.by', ''))
                                        .then(user => {
                                            setLoader(false)
                                            if (user.status === 200 && user.data && user.data.data.id > 0) {
                                                formik.setFieldValue('org', user.data.data.entities_self_service)
                                                formik.setFieldValue('userId', user.data.data.id)
                                                setDisableRegion(true)
                                                setActiveStep((s) => s + 2);
                                                return
                                            } else setActiveStep((s) => s + 1);
                                        }).catch(err => {
                                            console.log('-ERR 2 attempt-', err)
                                            setLoader(false)
                                            setActiveStep(activeStep + 1);
                                        })
                                } else {
                                    setLoader(false)
                                    setActiveStep((s) => s + 1);
                                }
                            };
                        }).catch(err => {
                            console.log('-ERR-', err)
                            setTicketId(-1)
                            setLoader(false)
                            setActiveStep(steps.length - 1);
                        })
                } else {
                    setActiveStep((s) => s + 1);
                }
                //                    helpers.setTouched({});
            }
        },
        validationSchema: steps[activeStep].validationSchema
    });
    const userFromLocalStorage = () => {
        if (!formik) return
        const saveMe = localStorage.getItem('REACT_GLPI_FORM_SAVEME')
        const user = localStorage.getItem('REACT_GLPI_FORM_USER')
        if (user && user.length > 0) {
            formik.setFieldValue('email', user)
            setTimeout(() => {
                try {
                    formik.validateField('email')
                } catch { }
            }, 1000);
        }
        if (!!saveMe) {
            formik.setFieldValue('saveMe', saveMe === 'true')
        }

    }
    useEffect(() => {
        setActiveStepValid(
            (activeStep === 1) && (!formik.errors.email
                && (formik.initialValues.email !== formik.values.email)) ||
            (activeStep === 2) && (!formik.errors.org
                && (formik.initialValues.org !== formik.values.org))
            && !formik.errors.phone
            && (formik.initialValues.phone !== formik.values.phone)
            && !formik.errors.fio
            && (formik.initialValues.fio !== formik.values.fio) ||
            (activeStep === 3) && (!formik.errors.title
                && (formik.initialValues.title !== formik.values.title))
            && !formik.errors.description
            && (formik.initialValues.description !== formik.values.description)
        )
    }, [formik, activeStep])



    const handleBack = () => {
        if (disableRegion && activeStep === 3) {
            setActiveStep((s) => s - 2);
        } else
            setActiveStep((s) => Math.max(0, s - 1));
        setDisableRegion(false)
    };
    const handleReset = () => {
        setDisableRegion(false)
        setLoader(false)
        formik.handleReset()
        setTicketId(0)
        setActiveStep(0);
    };

    return (
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
            goToStep={(idx) => setActiveStep(idx)}
        />
    );
}
