import React from 'react';

export default function ReviewForm(props) {
    return (
        <React.Fragment>
            <div style={{ height: 250, overflowY: 'auto', paddingRight: 4 }}>
                <div style={{ marginTop: 20 }}>
                    <div className="p-3">
                        {
                            props.ticketId > 0
                                ? <>
                                    <p className="text-center text-secondary mb-2">
                                        Заявка по вашему обращению была зарегистрирована
                                        в системе support.rw под номером
                                    </p>
                                    <div
                                        className="text-center fw-bold"
                                        style={{
                                            marginBottom: '20px',
                                            fontWeight: '600',
                                            fontSize: '4rem',
                                            letterSpacing: '5px',
                                            color: '#556cd6'
                                        }}
                                    >
                                        {props.ticketId}
                                    </div>
                                </>
                                : props.ticketId < 0
                                    ? <p className="text-secondary">
                                        Ошибка создания заявки. Попробуйте оставить заявку позднее.
                                    </p>
                                    : ''
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}