import React from 'react'
import Review from './forms/ReviewForm';
import BigLoader from "./BigLoader/BigLoader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faEnvelopeOpen, faSitemap, faShareSquare, faCheckCircle, faExclamationCircle, faEye } from '@fortawesome/free-solid-svg-icons'

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

    // Маппинг иконок для шагов
    const stepIcons = {
        0: faQuestionCircle,      // Тип обращения
        1: faSitemap,             // Выбор организации/региона
        2: faEnvelopeOpen,        // Контактные данные
        3: faEye,                  // Просмотр/Подтверждение
    };

    // Функция для определения иконки шага
    const getStepIcon = (step, index) => {
        // Если шаг пропущен (регион отключен)
        if (step.id === 1 && disableRegion) {
            return faShareSquare; // Skip icon
        }

        // Для последнего шага (Review)
        if (activeStep === steps.length - 1 && step.id === steps.length - 1) {
            if (ticketId > 0) return faCheckCircle; // Success icon
            if (ticketId < 0) return faExclamationCircle; // Error icon
            return faEye; // Review icon
        }

        // Возвращаем иконку по индексу или дефолтную
        return stepIcons[index] || faQuestionCircle;
    };

    // Определение статуса шага
    const getStepStatus = (index) => {
        if (index < activeStep) return 'completed';
        if (index === activeStep) return 'active';
        return 'disabled';
    };

    // Определение цвета для иконки
    const getStepColor = (status, isLastStepError = false) => {
        if (isLastStepError) return '#dc3545'; // Красный для ошибки
        switch (status) {
            case 'active':
            case 'completed':
                return '#2fb344'; // Зеленый для активных и завершенных
            default:
                return '#6c757d'; // Серый для неактивных
        }
    };

    return (
        <div className="container-fluid px-0">
            {/* CoreUI стиль степпера с надписью слева */}
            <div className="stepper mb-4">
                <ol className="stepper-steps d-flex justify-content-between list-unstyled m-0 p-0">
                    {steps.map((step, index) => {
                        const status = getStepStatus(index);
                        const isActive = status === 'active';
                        const isCompleted = status === 'completed';
                        const icon = getStepIcon(step, index);
                        const isLastStepError = (ticketId < 0 && activeStep === steps.length - 1 && step.id === steps.length - 1);

                        let label = step.label;
                        if (activeStep === steps.length - 1 && step.id === steps.length - 1) {
                            if (ticketId > 0) label = 'Принята';
                            if (ticketId < 0) label = 'Отклонена';
                        }

                        return (
                            <li key={step.id} className="stepper-step flex-fill" style={{ listStyle: 'none' }}>
                                <button
                                    type="button"
                                    className="stepper-step-button w-100 border-0 bg-transparent"
                                    style={{ cursor: 'default', padding: '5px 0px 0' }}
                                    disabled={status === 'disabled'}
                                >
                                    <div className="d-flex align-items-center justify-content-start gap-3">
                                        {/* Метка шага слева */}
                                        <span
                                            className="stepper-step-label text-end"
                                            style={{
                                                fontWeight: isActive ? '600' : '400',
                                                color: isActive ? '#1a1a1a' : '#6c757d',
                                                minWidth: '120px',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            {label}
                                        </span>

                                        {/* Индикатор шага с иконкой справа */}
                                        <span
                                            className="stepper-step-indicator d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                backgroundColor: getStepColor(status, isLastStepError),
                                                color: 'white',
                                                transition: 'all 0.3s ease',
                                                boxShadow: isActive ? '0 0 0 4px rgba(47, 179, 68, 0.2)' : 'none'
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={icon}
                                                style={{
                                                    fontSize: isActive || isCompleted ? '1.1rem' : '1rem'
                                                }}
                                            />
                                        </span>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ol>

                {/* Прогресс-линия между шагами - теперь ближе к степам */}
                <div className="stepper-progress position-relative" style={{ height: '2px', marginTop: '5px' }}>
                    <div className="stepper-progress-bar bg-light w-100 h-100"></div>
                    <div
                        className="stepper-progress-fill position-absolute top-0 start-0 h-100"
                        style={{
                            width: `${(activeStep / (steps.length - 1)) * 100}%`,
                            backgroundColor: '#2fb344',
                            transition: 'width 0.3s ease'
                        }}
                    ></div>
                </div>
            </div>

            {/* Content Box */}
            <div className="position-relative mx-3 p-2 pt-4 bg-light rounded-3 shadow">
                {/* Icon Avatar для активного шага */}
                {!!steps[activeStep].icon && (
                    <div className="position-absolute top-0 start-50 translate-middle">
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: '45px',
                                height: '45px',
                                marginTop: '20px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                backgroundColor: '#2fb344'
                            }}
                        >
                            {React.cloneElement(steps[activeStep].icon, {
                                style: { color: 'white', fontSize: '1.5rem' }
                            })}
                        </div>
                    </div>
                )}

                {activeStep === steps.length - 1 ? (
                    <React.Fragment>
                        <Review ticketId={ticketId} />
                        {loader && <BigLoader />}
                        <div className="d-flex justify-content-end mt-3">
                            <button
                                type="button"
                                disabled={ticketId === 0}
                                onClick={() => {
                                    handleReset()
                                    userFromLocalStorage()
                                }}
                                className="btn btn-outline-success"
                            >
                                Новая заявка
                            </button>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            formik.handleSubmit()
                        }}>
                            {React.cloneElement(steps[activeStep].component, { ...formik, goToStep })}

                            {loader && <BigLoader />}
                            <div className="d-flex justify-content-end mt-3">
                                {activeStep !== 0 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="btn btn-outline-success me-2"
                                    >
                                        Назад
                                    </button>
                                )}
                                {activeStep !== 0 && (
                                    <button
                                        type='submit'
                                        disabled={!activeStepValid}
                                        className="btn btn-outline-success"
                                    >
                                        {activeStep === steps.length - 2 ? 'Отправить заявку' : 'Вперёд'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}