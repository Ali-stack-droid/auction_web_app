import { makeStyles } from '@mui/styles';
import theme from '../../../theme';

const useWinnerModalStyle = makeStyles({
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        height: "450px"
    },
    closeButtonWrapper: {
        display: "flex",
        justifyContent: "end",
        marginRight: "18px",
        marginTop: "18px",
    },
    closeButton: {
        color: 'black',
        padding: "10px",
        border: "1px solid #676767",
        borderRadius: "10px"
    },
    title: {
        fontSize: "30px",
        fontWeight: 600,
        margin: 0
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: '9px',
    },
    name: {
        fontSize: "20px",
        fontWeight: 500,
        margin: '15px auto',
    },
    details: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '16px',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: 30
    },
    infoText: {
        fontSize: "14px",
        textAlign: "start",
        color: theme.palette.primary.main2
    },
    icon: {
        marginRight: '8px',
        color: '#007bff',
    },
    wave: {
        position: 'absolute',
        bottom: -5,
        left: 0,
        right: 0,
    },
});

export default useWinnerModalStyle;
