import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Typography,Box} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';


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
        <React.Fragment>
            <Grid container spacing={3} style={{height:300}}>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        required
                        id="email"
                        name="email"
                        label="Почтовый адрес"
                        helperText={touched.email ? errors.email : ""}
                        error={Boolean(errors.email)}
                        value={email}
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
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={saveMe}
                                onChange={(event, value) => setFieldValue('saveMe', event.target.checked)}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Запомнить меня"
                    />
                </Grid>
                <Box m={3}>
                <Typography variant="body2" gutterBottom >
                    Если указанный email будет обнаружен в системе,
                    то следующий шаг будет пропущен и заявка будет
                    создана в организации обнаруженного пользователя.
                </Typography>

                </Box>
            </Grid>
        </React.Fragment>
    );
}
