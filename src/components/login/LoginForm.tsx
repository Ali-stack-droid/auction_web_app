import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const LoginForm = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100%"
        >
            <Paper elevation={0} sx={{ padding: 4, maxWidth: 400, width: "100% !important" }}>
                <Typography fontSize={18} fontWeight={'bold'}>
                    Login
                </Typography>
                <Typography fontSize={14} gutterBottom>
                    Sign in to continue into the platform.
                </Typography>
                <form>
                    <Box width={"100%"} sx={{ py: 1 }}>
                        <Typography>Email:</Typography>
                        <TextField
                            fullWidth
                            type="email"
                            margin="dense"
                            variant="outlined"
                            required
                        />
                    </Box>
                    <Box>
                        <Typography>Password:</Typography>
                        <TextField
                            fullWidth
                            type="password"
                            margin="dense"
                            variant="outlined"
                            required

                        />
                    </Box>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginForm;
