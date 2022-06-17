import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"

export default function ReviewForm(props) {
    return (
        <React.Fragment>

            <Grid container spacing={3} style={{minHeight:300}}>
                <Grid item xs={12}>
                    <Box m={3}>
                            {
                              props.ticketId>0
                                  ? <>
                                      <Typography variant="body2" gutterBottom >
                                          {`Заявка по вашему обращению была зарегистрирована
                                            в системе support.rw.by под номером `
                                          }
                                      </Typography>
                                      <Typography fontWeight={500} component="div" align="center"
                                                  style={{marginBottom:'20px', fontWeight:'600', fontSize:'4rem',letterSpacing: '5px', color: '#556cd6'}}>
                                          {props.ticketId}
                                      </Typography>
                                      <Link
                                          component="button"
                                          variant="body2"
                                          onClick={(e) => {
                                              e.preventDefault()
                                              window.open("https://support.rw.by/front/ticket.form.php?id="+ props.ticketId, '_blank').focus();
                                          }}
                                      >
                                          Ссылка на заявку
                                      </Link>
                              </>
                                  : props.ticketId<0
                                     ? <Typography variant="body2" gutterBottom >
                                        Ошибка создания заявки. Попробуйте оставить заявку позднее.
                                       </Typography>
                                     :  ''
                            }
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
