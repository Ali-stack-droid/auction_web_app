import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import useSideBarStyles from './SideBarStyles';

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import FestivalRoundedIcon from '@mui/icons-material/FestivalRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CustomNavLink from '../../custom-components/CustomNavLink';

const SideBar = () => {
    const classes = useSideBarStyles();
    const navigate = useNavigate();


    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <GridViewRoundedIcon /> },
        { label: 'Auction', path: '/auction', icon: <FestivalRoundedIcon /> },
        { label: 'Live Streaming', path: '/live', icon: <OndemandVideoRoundedIcon /> },
        { label: 'Payment Tracking', path: '/payment', icon: <PriceChangeRoundedIcon /> },
        { label: 'Logout', path: '/logout', icon: <LogoutRoundedIcon /> },
    ];

    const location = useLocation();
    const isSelected = (path: string) => {
        if (path === "/auction") {
            return location.pathname.replace(/\/+$/, '').includes(path) || location.pathname.replace(/\/+$/, '').includes("live-streaming");
        }
        return path === location.pathname;
    }

    return (
        <Box className={classes.sideBarContainer}>
            {/* Logo */}
            <h1 className={classes.logo}>LOGO</h1>
            <Box className={classes.menu}>
                MENU
            </Box>
            {/* Navigation Buttons */}
            {navItems.map((item) => (
                <CustomNavLink
                    isSelected={isSelected(item.path)}
                    key={item.path}
                    to={item.path}
                    onClick={() => navigate(item.path)}
                    className={item.path === '/logout' ? classes.logoutLink : ''}
                >
                    <Box className={classes.navContent}>
                        {item.icon}
                        <Typography className={classes.navText}>{item.label}</Typography>
                    </Box>
                </CustomNavLink>
            ))}
        </Box>
    );
};

export default SideBar;
