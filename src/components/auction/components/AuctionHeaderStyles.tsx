import { makeStyles } from '@mui/styles';

const useAuctionHeaderStyles = makeStyles((theme: any) => ({
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
    buttonContainer: {
        display: 'flex',
        gap: '16px',
        maxHeight: '40px',
    },
    addAuctionButton: {
        textTransform: 'none',
        color: theme.palette.primary.main5,
        borderColor: theme.palette.primary.main,
        height: '40px',
        width: '160px',
    },
    toggleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #E2E8F0',
        height: '40px',
        borderRadius: '5px',
        minWidth: '200px',
        maxWidth: '200px',
    },
    toggleButton: {
        textTransform: 'none',
        transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
        border: 'none',
        borderRadius: '5px !important',
        '&.current': {
            fontSize: '9px',
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: 'white !important',
            width: "100px"
        },
        '&.past': {
            fontSize: '8px',
            backgroundColor: 'inherit',
            color: `${theme.palette.primary.main5} !important`,
            width: "45%",
            whiteSpace: 'nowrap'
        },
    },
    filterButton: {
        textTransform: 'none',
        backgroundColor: theme.palette.primary.main,
        width: '160px',
        height: '40px',
    },
    menuItem: {
        '&.selected': {
            backgroundColor: theme.palette.primary.main,
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main6,
        },
    },
}));

export default useAuctionHeaderStyles;
