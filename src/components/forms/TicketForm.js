import React from 'react'



export default function TicketForm(props) {
    const {
        values: { title, description, urgency, tip },
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur
    } = props;

    return (
        <div style={{ height: 270, overflowY: 'auto', paddingRight: 4 }}>


            <div className="mb-3" style={{ padding: "0 5px" }}>
                <label className="form-label" htmlFor="title">Заголовок</label>
                <input
                    autoFocus
                    required
                    type="text"
                    className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.title && errors.title ? (
                    <div className="invalid-feedback">{errors.title}</div>
                ) : null}
            </div>

            <div className="mb-3" style={{ padding: "0 5px" }}>
                <label className="form-label" htmlFor="description">Описание</label>
                <textarea
                    required
                    className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                />
                {touched.description && errors.description ? (
                    <div className="invalid-feedback">{errors.description}</div>
                ) : null}
            </div>
        </div>
    );
}
