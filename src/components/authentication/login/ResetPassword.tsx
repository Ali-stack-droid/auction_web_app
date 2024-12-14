import { Box, Typography, CircularProgress, Link } from '@mui/material';

import CustomButton from '../../custom-components/CustomButton';
import CustomTextField from '../../custom-components/CustomTextField';
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import theme from '../../../theme';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ }: any) => {

    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState(['', '', '', '']); // Array to hold 4 digit values

    const handleChange = (e: any, index: number) => {
        const newValues = [...values];
        const isBackspace = e.nativeEvent?.inputType === 'deleteContentBackward';

        // Update the value in the current field
        newValues[index] = e.target.value.slice(0, 1);
        setValues(newValues);

        if (e.target.value) {
            // Move focus to the next field when a digit is entered
            const nextField = document.getElementById(`digit-${index + 1}`);
            if (nextField) {
                nextField.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault(); // Block non-numeric input except for navigation and backspace
        }
        if (e.key === 'Backspace' && !values[index]) {
            e.preventDefault()
            // Move focus to the previous field if backspace is pressed and current field is empty
            const prevField = document.getElementById(`digit-${index - 1}`);
            if (prevField) {
                prevField.focus();
            }
        }
    };

    const handleFormSubmit = () => {
        const code = values.join('');
        setIsSubmitting(true);
        setTimeout(() => {
            // Simulate verification
            if (code === '1234') {
                navigate('/new-password'); // Redirect to the next step
            } else {
                // Handle invalid code (you can add an error message here)
                alert('Invalid code!');
            }
            setIsSubmitting(false);
        }, 2000);
    }

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
                <Box display="flex" justifyContent="start" alignItems="center" gap={1} >
                    {values.map((value, index) => (
                        <CustomTextField
                            key={index}
                            id={`digit-${index}`}
                            value={value}
                            onChange={(e: any) => handleChange(e, index)}
                            onKeyDown={(e: any) => handleKeyDown(e, index)}
                            inputProps={{
                                maxLength: 1, // Restrict input to 1 character
                                style: { textAlign: 'center', fontSize: 32, color: theme.palette.secondary.main, overflow: 'hidden' },
                                inputMode: 'numeric', // Show numeric keyboard on mobile
                            }}
                        />

                    ))}
                </Box>

                <CustomButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleFormSubmit()}
                >
                    {isSubmitting ? <CircularProgress sx={{ color: 'white' }} /> : 'Continue'}
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
