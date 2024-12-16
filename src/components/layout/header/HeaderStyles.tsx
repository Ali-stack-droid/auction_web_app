import { makeStyles } from '@mui/styles';

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
        color: '#383838',
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        marginRight: 1,
    },
    auction: {
        color: '#383838',
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
            color: '#1976d2',
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
        backgroundColor: '#2F83E9',
        border: '1px solid #DBDFED',
        height: '100%',
        borderRadius: '0 15px 15px 0',
        right: 0
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid red'
    },
    iconButton: {
        '& .appBarIcons': {
            color: '#C4C4C4',
            height: '30px',
            width: '30px',
        },
    },
    avatar: {
        height: '30px',
        width: '30px',
        fontSize: 16,
        border: '2px solid #C4C4C4',
        backgroundColor: '#2F83E9'
    },
    badge: {
        '& .MuiBadge-badge': {
            fontSize: 10,
            backgroundColor: '#FF5630',
            color: '#fff',
        },
    },
});

export default useHeaderStyles;
