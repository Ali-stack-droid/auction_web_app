import { makeStyles } from '@mui/styles';

const useHeaderStyles = makeStyles({
    headerContainer: {
        position: 'sticky',
        padding: '10px 0',
        border: '1px solid black',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        gap: '16px',
    },
    breadcrumb: {
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
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid red',
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
    },
    badge: {
        '& .MuiBadge-badge': {
            backgroundColor: '#FF5630',
            color: '#fff',
        },
    },
});

export default useHeaderStyles;
