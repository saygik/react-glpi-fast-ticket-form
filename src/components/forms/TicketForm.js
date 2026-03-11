import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';


const AntSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase': {
    color: red[500],
    '& + .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: red[200],
    },
    '&.Mui-checked': {
      color: green[500],
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[500],
    },
  },
}));



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
            <Grid container spacing={2} style={{height:292}}>
                <Grid item xs={12} style={{paddingBottom:0}}>
                        <Grid component="label" container justifyContent="center" spacing={0}>
                            <Grid item><Typography component="div">Инцидент</Typography></Grid>
                            <Grid item>
                                <AntSwitch
                                    size="small"
                                    checked={!!(tip-1)}
                                    onChange={(event, value) => setFieldValue('tip', value+1)}
                                    name="checkedC" />
                            </Grid>
                            <Grid item><Typography component="div">Запрос</Typography></Grid>
                        </Grid>

                </Grid>

                <Grid item xs={12} style={{ paddingTop:0}}>
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
                        rows={2}
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
