import { Box, Typography, Button, CircularProgress, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../custom-components/CustomButton';
import CustomTextField from '../../custom-components/CustomTextField';
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ForgotPassword = ({ setForgotPassword }: any) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Formik setup for forgot password
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: (values) => {
            setIsSubmitting(true);
            setTimeout(() => {
                // Here you can call an API to send reset instructions
                console.log('Password reset email sent to:', values.email);
                setIsSubmitting(false);
                setForgotPassword(false)
            }, 2000);
        },
    });

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
                    Forgot Password
                </Typography>
                <Typography variant="body1" fontSize={15} mb={2}>
                    If you forget your password, we will send you reset instructions.
                </Typography>

                {/* Email input */}
                <Typography fontWeight="600" fontSize={15} pt={2}>
                    Email:
                </Typography>
                <CustomTextField
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
                />

                <CustomButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => formik.handleSubmit()}
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

export default ForgotPassword;
