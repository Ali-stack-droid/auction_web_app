
import { makeStyles } from '@mui/styles';
import theme from '../../../theme';

const useDetailStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '30px',
        fontWeight: 600,
        color: theme.palette.primary.main,
    },
    soldButton: {
        backgroundColor: "#009045",
        position: 'absolute',
        top: "10px",
        left: "10px",
        pointerEvents: 'none', // Prevent interaction while keeping styles
        opacity: 0.9, // Maintain original appearance
        width: "98.34px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    },
    unSoldButton: {
        backgroundColor: "#C91818",
        position: 'absolute',
        top: "10px",
        left: "10px",
        pointerEvents: 'none', // Prevent interaction while keeping styles
        opacity: 0.9, // Maintain original appearance
        width: "98.34px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    }
}));

export default useDetailStyles;
