import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

interface CustomNavLinkProps {
    isSelected: boolean;
}

const CustomNavLink = styled(Link, { shouldForwardProp: (prop) => prop !== 'isSelected' })<CustomNavLinkProps>(({ isSelected }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
    width: '100%',
    height: '45px',
    textDecoration: 'none',
    borderRadius: '15px',
    backgroundColor: isSelected ? '#2F83E9' : 'white',
    color: isSelected ? '#fff' : '#838383',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
        backgroundColor: !isSelected && 'rgba(47, 131, 233, 0.2)',
    },
}));

export default CustomNavLink;
