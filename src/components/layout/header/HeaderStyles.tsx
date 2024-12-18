import { makeStyles } from '@mui/styles';
import theme from '../../../theme';

const useHeaderStyles = makeStyles({
    headerContainer: {
        position: 'sticky',
        padding: '10px 0',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        gap: '4px',
    },
    dashboard: {
        color: theme.palette.primary.main2,
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        marginRight: 1,
    },
    auction: {
        color: theme.palette.primary.main2,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        marginLeft: 8,
        fontSize: 14
    },
    breadcrumb: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        color: 'gray',
        '& span': {
            cursor: 'pointer',
            color: theme.palette.primary.main,
        },
    },
    centerSection: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginRight: '16px',
    },
    searchField: {
        height: '40px',
    },
    searchButton: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main6}`,
        height: '100%',
        borderRadius: '0 15px 15px 0',
        right: 0
    },
    avatar: {
        height: '30px',
        width: '30px',
        fontSize: 16,
        border: `2px solid ${theme.palette.primary.main7}`,
        backgroundColor: theme.palette.primary.main
    },
    badge: {
        '& .MuiBadge-badge': {
            fontSize: 10,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main3,
        },
    },
});

export default useHeaderStyles;
