import { Button, styled } from "@mui/material";

const CustomButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '65px',
    textTransform: 'none',
    borderRadius: '15px',
    backgroundColor: `${theme.palette.primary.main}`,
    color: '#fff',
    fontSize: 16,
    boxShadow: 'none'
}));

export default CustomButton;
