import { makeStyles } from '@mui/styles';
import theme from '../../../theme';

export const useAuctionCardStyles = makeStyles({
    card: {
        maxWidth: "345px",
        minHeight: "370px",
        padding: "15px",
        borderRadius: "15px",
    },
    media: {
        borderRadius: "15px",
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '250px'
    },
    content: {
        marginTop: "15px",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
    },
    title: {
        fontSize: "18px",
        fontWeight: 600,
        color: theme.palette.primary.main1,
        flex: 1,
    },
    catalogButton: {
        height: "37.47px",
        width: "98.47px",
        textTransform: 'none',
        marginLeft: 15,
        fontSize: 12,
        padding: 0,
    },
    actionButtons: {
        display: 'flex',
        alignItems: 'start',
        gap: 15,
        marginTop: "20px"
    },
    actionButton: {
        textTransform: "none",
        fontSize: "13px",
        width: "95px",
        height: "37.47px",
    },
    smallTitle: {
        marginLeft: 15,
        fontWeight: "600",
        fontSize: "11px"

    }
});

export const useAuctionDetailStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    lotContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        gap: 30,
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
        // flex: '1',
    },
    text: {
        fontSize: "14px",
        color: theme.palette.primary.main2,
    }
});