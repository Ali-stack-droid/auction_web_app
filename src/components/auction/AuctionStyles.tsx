import { makeStyles } from '@mui/styles';
import theme from '../../theme';

export const useAuctionCardStyles = makeStyles({
    card: {
        maxWidth: 345,
        minHeight: 370,
        padding: 15,
        borderRadius: 15,
    },
    media: {
        borderRadius: 15,
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '250px'
    },
    content: {
        padding: 0,
        marginTop: 20,
        // minHeight: "70px",
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        color: theme.palette.primary.main1,
        flex: 1,
    },
    button: {
        height: "35px",
        width: 100,
        textTransform: 'none',
        marginLeft: 10,
        fontSize: 13,
        padding: 0,
        minWidth: "208.68px!important",
        mineight: "38.34px !important",
        border: '1px solid red',

    },
    actionButtons: {
        display: 'flex',
        alignItems: 'start',
        gap: 15,
        marginTop: "20px"
    },
    actionButton: {
        width: "95px",
        height: "37.47px",

    }
});

export const useAuctionDetailStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
    },
    iconText: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    flexItem: {
        flex: '1 1 auto',
        minWidth: '120px',
    },
    text: {
        fontSize: 13,
        color: theme.palette.primary.main2,
    },
});