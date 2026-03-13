import React, { useEffect, useState } from 'react'
import api from "../../services/api"
import { subnetsContainIp } from '../../services/utils'

const YEARS = [
    { value: '-', label: 'не определено' },
    { value: '1234', label: '1' },
    { value: '5234', label: '2' },
    { value: '9234', label: '3' },
]

export default function OrganizationForm(props) {
    const {
        values: { org, fio, phone, address },
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur
    } = props;

    const [orgs, setOrgs] = useState([{ id: 0, completename: 'Не определена', comment: '' }])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.getOrgs()
            .then(data => {
                let subnets = []
                if (data.data.results) {
                    const orgs = data.data.results.map(org => {
                        const newOrg = org
                        newOrg.completename = newOrg.completename.slice(6)
                        return newOrg
                    })
                    orgs.push({ id: 0, completename: 'Не определена', comment: '' })
                    setOrgs(orgs)
                    if (data.data.ip) {
                        subnets = orgs.map(org => {
                            try {
                                let nets = org.comment.substr(org.comment.indexOf('[') + 1, org.comment.indexOf(']') - org.comment.indexOf('[') - 1)
                                const ipExist = subnetsContainIp(nets, data.data.ip)
                                return { id: org.id, containIp: ipExist.containIp, mask: ipExist.mask }
                            } catch (err) {
                                console.log('-ERR-', err)
                                return { id: org.id, isIp: false }
                            }
                        })
                        const currentOrg = subnets.filter(net => net.containIp).reduce((res, org) => {
                            if (org.mask > res.mask) return org
                            else return res
                        }, { id: 0, mask: 0 })
                        if (currentOrg.id > 0) setFieldValue('org', currentOrg.id)
                    }
                } else setOrgs([]);
                setLoading(false)
            }).catch(err => {
                console.log('-ERR-', err)
                setLoading(false)
            })
    }, [])

    return (
        <div style={{ height: 270, overflowY: 'auto', paddingRight: 4 }}>
            <div className="mb-3" style={{ padding: "20px 5px 5px 5px" }}>
                <label className="form-label" htmlFor="org">Регион обслуживания</label>

                {loading ? (
                    <div className="form-text d-flex align-items-center gap-2">
                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        Загружаю список…
                    </div>
                ) : orgs.length > 1 ? (
                    <>
                        <select
                            className={`form-select ${touched.org && errors.org ? 'is-invalid' : ''}`}
                            id="org"
                            name="org"
                            value={orgs.length > 1 ? org : 0}
                            onChange={props.handleChange}
                            onBlur={handleBlur}
                        >
                            {orgs.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.completename}
                                </option>
                            ))}
                        </select>
                        {touched.org && errors.org ? (
                            <div className="invalid-feedback">{errors.org}</div>
                        ) : null}
                    </>
                ) : (
                    <div className="invalid-feedback" style={{ display: 'block' }}>
                        Ошибка. Список организаций недоступен.
                    </div>
                )}
            </div>

            {/* Поля ФИО и Телефон с подписями в одной строке */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                padding: '0 5px',
                marginBottom: '15px'
            }}>
                {/* ФИО */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <label className="form-label" htmlFor="fio" style={{
                        minWidth: '60px',
                        marginBottom: 0,
                        whiteSpace: 'nowrap',
                        lineHeight: '38px', // Выравнивание по высоте input
                        height: '38px' // Фиксированная высота как у input
                    }}>
                        ФИО
                    </label>
                    <div style={{ flex: 1 }}>
                        <input
                            autoFocus
                            required
                            type="text"
                            className={`form-control ${touched.fio && errors.fio ? 'is-invalid' : ''}`}
                            id="fio"
                            name="fio"
                            value={fio}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ height: '38px' }} // Фиксированная высота
                        />
                        {touched.fio && errors.fio ? (
                            <div className="invalid-feedback">{errors.fio}</div>
                        ) : null}
                    </div>
                </div>

                {/* Телефон */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <label className="form-label" htmlFor="phone" style={{
                        minWidth: '60px',
                        marginBottom: 0,
                        whiteSpace: 'nowrap',
                        lineHeight: '38px', // Выравнивание по высоте input
                        height: '38px' // Фиксированная высота как у input
                    }}>
                        Телефон
                    </label>
                    <div style={{ flex: 1 }}>
                        <input
                            required
                            type="text"
                            className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ height: '38px' }} // Фиксированная высота
                        />
                        {touched.phone && errors.phone ? (
                            <div className="invalid-feedback">{errors.phone}</div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Адрес */}
            <div className="mb-3" style={{ padding: "0 5px" }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <label className="form-label" htmlFor="address" style={{
                        minWidth: '60px',
                        marginBottom: 0,
                        whiteSpace: 'nowrap',
                        lineHeight: '38px', // Выравнивание по высоте input
                        height: '38px' // Фиксированная высота как у input
                    }}>
                        Адрес
                    </label>
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`}
                            id="address"
                            name="address"
                            value={address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ height: '38px' }} // Фиксированная высота
                        />
                        {touched.address && errors.address ? (
                            <div className="invalid-feedback">{errors.address}</div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}