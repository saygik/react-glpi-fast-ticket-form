import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core"
import Link from "@material-ui/core/Link"


const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function ReviewForm(props) {
    const classes = useStyles();

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
                                            в системе support.rw.by под номером ${props.ticketId}`
                                          }
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
                                         Попробуйте оставить заявку позднее.
                                       </Typography>
                                     : ''
                            }
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
