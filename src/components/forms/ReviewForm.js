import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"

export default function ReviewForm(props) {
    return (
        <React.Fragment>

            <div style={{ height: 250, overflowY: 'auto', paddingRight: 4 }}>
                <div style={{ marginTop: 20 }}>
                    <Box m={3}>
                        {
                            props.ticketId > 0
                                ? <>
                                    <Typography variant="body2" gutterBottom sx={{ textAlign: 'center' }}>
                                        {`Заявка по вашему обращению была зарегистрирована
                                            в системе support.rw под номером `
                                        }
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, textAlign: 'center' }} component="div" align="center"
                                        style={{ marginBottom: '20px', fontWeight: '600', fontSize: '4rem', letterSpacing: '5px', color: '#556cd6' }}>
                                        {props.ticketId}
                                    </Typography>

                                </>
                                : props.ticketId < 0
                                    ? <Typography variant="body2" gutterBottom >
                                        Ошибка создания заявки. Попробуйте оставить заявку позднее.
                                    </Typography>
                                    : ''
                        }
                    </Box>
                </div>
            </div>
        </React.Fragment>
    );
}