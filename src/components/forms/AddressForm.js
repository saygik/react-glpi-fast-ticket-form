import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


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
            <Grid container style={{ height: 300 }}>
                <Grid item xs={12} style={{ width: '100%' }}>
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
                        size="small"
                        margin="dense"

                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={saveMe}
                                onChange={(event) => setFieldValue('saveMe', event.target.checked)}
                                name="saveMe"
                                color="primary"
                                size="small"
                            />
                        }
                        label={
                            <Typography variant="body2" color="textSecondary">
                                Запомнить меня на компьютере
                            </Typography>
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box mt={1}>
                        <Typography variant="caption" color="textSecondary">
                            Если указанный email будет обнаружен в системе, следующий шаг будет пропущен и заявка
                            будет создана в организации обнаруженного пользователя.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
