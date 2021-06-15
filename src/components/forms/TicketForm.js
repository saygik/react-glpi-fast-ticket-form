import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import {makeStyles, withStyles} from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors';
import Button from "@material-ui/core/Button"

const AntSwitch = withStyles((theme) => ({

    switchBase: {
        color: red[500],
        '& + $track': {
            opacity: 1,
            backgroundColor: red[200],
        },
        '&$checked': {
            color: green[500],
        },
        '&$checked + $track': {
            backgroundColor: green[500],
        },
    },
    checked: {},
    track: {},
}))(Switch);



export default function TicketForm(props) {
    const {
        values: { title, description, urgency,tip },
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur
    } = props;

    return (
        <React.Fragment>
            {/*<Typography variant="h6" gutterBottom>*/}
            {/*    Заголовок*/}
            {/*</Typography>*/}
            <Grid container spacing={2} style={{height:292}}>
                <Grid item xs={12}>
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={0}>
                            <Grid item>Инцидент</Grid>
                            <Grid item>
                                <AntSwitch
                                    checked={!!(tip-1)}
                                    onChange={(event, value) => setFieldValue('tip', value+1)}
                                    name="checkedC" />
                            </Grid>
                            <Grid item>Запрос</Grid>
                        </Grid>
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <TextField
                        autoFocus
                        required
                        id="title"
                        name="title"
                        label="Заголовок"
                        helperText={touched.title ? errors.title : ""}
                        error={Boolean(errors.title)}
                        value={title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        inputProps={{
                            style: {
                                fontSize:16
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="Описание"
                        helperText={touched.description ? errors.description : ""}
                        multiline
                        rows={3}
                        error={Boolean(errors.description)}
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        inputProps={{
                            style: {
                                fontSize:16
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
