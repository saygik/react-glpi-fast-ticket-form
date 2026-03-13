import React from 'react'


export default function AddressForm(props) {
    const {
        values: { email, saveMe },
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleBlur
    } = props;

    return (
        <div style={{ height: 270, overflowY: 'auto', paddingRight: 4 }}>
            <div style={{ padding: "20px 5px 5px 5px" }}>
                <label className="form-label" htmlFor="email">Почтовый адрес</label>
                <input
                    autoFocus
                    required
                    type="email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                />
                {touched.email && errors.email ? (
                    <div className="invalid-feedback">{errors.email}</div>
                ) : null}
            </div>

            <div style={{ padding: 20 }}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="saveMe"
                    name="saveMe"
                    checked={!!saveMe}
                    onChange={(event) => setFieldValue('saveMe', event.target.checked)}
                />
                <label style={{ paddingLeft: 5 }} className="form-check-label" htmlFor="saveMe">
                    Запомнить меня на компьютере
                </label>
            </div>
        </div>
    );
}
