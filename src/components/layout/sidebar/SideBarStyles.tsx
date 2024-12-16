import { makeStyles } from '@mui/styles';

const useSideBarStyles = makeStyles({
    sideBarContainer: {
        position: 'sticky',
        left: 0,
        width: '15%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: '1px solid #DBDFED',
        padding: '0 12px'
    },
    logo: {
        fontWeight: '700',
        marginBottom: '24px',
        padding: '10px',
    },
    menu: {
        width: '100%',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333333',
        textAlign: 'left'
    },
    navText: {
        fontSize: '14px',
        fontWeight: 600,
        padding: '0 10px',
        color: 'inherit'
    },
    navContent: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
    },
    logoutLink: {
        width: "85%",
        position: 'absolute',
        bottom: 0,
        padding: '',
    }
});

export default useSideBarStyles;
