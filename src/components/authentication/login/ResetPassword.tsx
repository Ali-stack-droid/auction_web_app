import { Box, Typography, CircularProgress, Link } from '@mui/material';
import CustomButton from '../../custom-components/CustomButton';
import CustomTextField from '../../custom-components/CustomTextField';
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import theme from '../../../theme';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useLoginStyles, useResetPasswordStyles } from './LoginStyles'; // Assuming LoginStyles is correctly exported

const ResetPassword = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState(['', '', '', '']); // Array to hold 4-digit values

    const loginClasses = useLoginStyles();
    const classes = useResetPasswordStyles();

    const handleChange = (e: any, index: number) => {
        const newValues = [...values];
        newValues[index] = e.target.value.slice(0, 1); // Restrict to 1 digit
        setValues(newValues);

        if (e.target.value) {
            const nextField = document.getElementById(`digit-${index + 1}`);
            if (nextField) nextField.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') e.preventDefault();
        if (e.key === 'Backspace' && !values[index]) {
            const prevField = document.getElementById(`digit-${index - 1}`);
            if (prevField) prevField.focus();
        }
    };

    const handleFormSubmit = () => {
        const code = values.join('');
        setIsSubmitting(true);
        setTimeout(() => {
            if (code === '1234') navigate('/new-password');
            else alert('Invalid code!');
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <Box className={loginClasses.componentContainer}>
            <Box width="100%" maxWidth={400}>
                <Typography variant="h5" mb={2}>
                    Password Reset
                </Typography>
                <Typography variant="body1" fontSize={15} mb={2}>
                    We sent a code to “user123@gmail.com”. Please enter the code below.
                </Typography>
                <Box className={classes.codeInputContainer}>
                    {values.map((value, index) => (
                        <CustomTextField
                            key={index}
                            id={`digit-${index}`}
                            value={value}
                            onChange={(e: any) => handleChange(e, index)}
                            onKeyDown={(e: any) => handleKeyDown(e, index)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center', fontSize: 32, color: theme.palette.primary.main8, overflow: 'hidden' },
                                inputMode: 'numeric',
                            }}
                        />
                    ))}
                </Box>
                <CustomButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleFormSubmit}
                >
                    {isSubmitting ? <CircularProgress sx={{ color: theme.palette.primary.main3 }} /> : 'Continue'}
                </CustomButton>
                {/* Link to go back to Login page */}
                <Box mt={2} textAlign="center">
                    <Link onClick={() => navigate('/')} variant="body2" fontWeight={400} underline="hover" sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <KeyboardBackspaceIcon sx={{ fontSize: 16, px: 0.5 }} /> Back to Login
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default ResetPassword;
