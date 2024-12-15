import { makeStyles } from '@mui/styles';

const useSideBarStyles = makeStyles({
    sideBarContainer: {
        position: 'sticky',
        left: 0,
        width: '250px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: '1px solid #DBDFED',
    },
    logo: {
        fontWeight: 'bold',
        marginBottom: '20px',
        padding: '10px',
    },
    navButton: {
        width: '100%',
        marginBottom: '16px',
    },
    logoutButton: {
        width: '100%',
        marginTop: 'auto',
    },
});

export default useSideBarStyles;
