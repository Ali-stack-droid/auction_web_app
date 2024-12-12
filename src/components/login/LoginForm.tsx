import { Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
    // Formik setup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password should be at least 8 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            alert("Form Submitted")
            // Handle the form submission (for now, just log values)
            console.log(values);
        },
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width={"100%"} >
            <Paper elevation={0} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
                <Typography fontSize={32} fontWeight={'bold'} py={0.5}>
                    Login
                </Typography>
                <Typography fontSize={16} gutterBottom>
                    Sign in to continue into the platform.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box width="100%" sx={{ py: 1 }}>
                        <Typography fontSize={15}>Email:</Typography>
                        <TextField
                            fullWidth
                            type="email"
                            margin="dense"
                            variant="outlined"
                            required
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Box>
                    <Box>
                        <Typography fontSize={15}>Password:</Typography>
                        <TextField
                            fullWidth
                            type="password"
                            margin="dense"
                            variant="outlined"
                            required
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        {/* Forgot Password Link */}
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Link href="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Box>
                    </Box>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, fontSize: 16 }}
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginForm;
