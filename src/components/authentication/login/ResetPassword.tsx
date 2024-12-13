import { Box, Typography, Button, CircularProgress, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../custom-components/CustomButton';
import CustomTextField from '../../custom-components/CustomTextField';
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import theme from '../../../theme';

const ResetPassword = ({ setForgotPassword }: any) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState(['', '', '', '']); // Array to hold 4 digit values

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValues = [...values];
        newValues[index] = e.target.value.slice(0, 1); // Allow only 1 character per field
        setValues(newValues);

        // Move focus to next field when digit is entered
        if (e.target.value) {
            const nextField = document.getElementById(`digit-${index + 1}`);
            if (nextField) {
                nextField.focus();
            }
        }
    };
    return (
        <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={4}
        >
            <Box width="100%" maxWidth={400}>
                <Typography variant="h5" mb={2}>
                    Password Reset
                </Typography>
                <Typography variant="body1" fontSize={15} mb={2}>
                    We send a code to “user123@gmail.com”. Please paste the code
                    into that fields.
                </Typography>

                {/* Email input */}
                {/* <CustomTextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    placeholder="user123@gmail.com"
                /> */}
                <Box display="flex" justifyContent="start" alignItems="center" gap={1} >
                    {values.map((value, index) => (
                        <CustomTextField
                            type=''
                            key={index}
                            id={`digit-${index}`}
                            value={value}
                            onChange={(e: any) => handleChange(e, index)}
                            variant="outlined"
                            inputProps={{
                                maxLength: 1, // Restrict input to 1 character
                                style: { textAlign: 'center', fontSize: 32, color: theme.palette.secondary.main, overflow: 'hidden' },
                            }}
                        />
                    ))}
                </Box>

                <CustomButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    {isSubmitting ? <CircularProgress sx={{ color: 'white' }} /> : 'Continue'}
                </CustomButton>

                {/* Link to go back to Login page */}
                <Box mt={2} textAlign="center">
                    <Link onClick={() => setForgotPassword(false)} variant="body2" fontWeight={400} underline="hover" sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <KeyboardBackspaceIcon sx={{ fontSize: 16, px: 0.5 }} /> Back to Login
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default ResetPassword;
