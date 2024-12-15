import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Avatar,
    Box,
} from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Help as HelpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../custom-components/CustomTextField';
import useHeaderStyles from './HeaderStyles';

const Header = () => {
    const classes = useHeaderStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Box className={classes.headerContainer}>
            <Toolbar className={classes.toolbar}>
                {/* Left Section - Title and Breadcrumb */}
                <Box className={classes.leftSection}>
                    <Typography variant="h5">Auctions</Typography>
                    <Typography variant="body2" className={classes.breadcrumb}>
                        <span onClick={() => navigate('/dashboard')}>Dashboard</span>
                        <span> &gt; Auction</span>
                    </Typography>
                </Box>

                <Box display="flex">
                    {/* Center Section - Search Bar */}
                    <Box className={classes.centerSection}>
                        <CustomTextField
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by anything"
                            className={classes.searchField}
                            InputProps={{
                                endAdornment: (
                                    <Box>
                                        <SearchIcon />
                                    </Box>
                                ),
                            }}
                        />
                    </Box>

                    {/* Right Section - Notifications, Help, and User Avatar */}
                    <Box className={classes.rightSection}>
                        {/* Notifications Icon */}
                        <IconButton className={classes.iconButton}>
                            <Badge badgeContent={'4'} className={classes.badge}>
                                <NotificationsIcon className="appBarIcons" />
                            </Badge>
                        </IconButton>

                        {/* Help Icon */}
                        <IconButton className={classes.iconButton}>
                            <HelpIcon className="appBarIcons" />
                        </IconButton>

                        {/* User Avatar */}
                        <Avatar
                            alt="Admin"
                            src="/static/images/avatar/1.jpg"
                            className={classes.avatar}
                        />
                    </Box>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Header;
