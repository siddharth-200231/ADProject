import React, { useState, useEffect } from 'react';
import { 
    IconButton, 
    Menu, 
    MenuItem, 
    Avatar, 
    Typography,
    Divider,
    ListItemIcon 
} from '@mui/material';
import { 
    AccountCircle, 
    ShoppingBag, 
    Logout 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserMenu = ({ user, onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        onLogout();
    };

    return (
        <>
            <IconButton
                onClick={handleMenu}
                sx={{
                    p: 0.5,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': { transform: 'scale(1.05)' }
                }}
            >
                <Avatar sx={{ width: 32, height: 32 }}>
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 220, mt: 1.5 }
                }}
            >
                <MenuItem sx={{ py: 1 }}>
                    <Typography variant="subtitle1" noWrap>
                        {user.name || 'User'}
                    </Typography>
                </MenuItem>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ px: 2, pb: 1 }}
                >
                    {user.email}
                </Typography>
                <Divider />
                <MenuItem onClick={() => navigate('/orders')}>
                    <ListItemIcon>
                        <ShoppingBag fontSize="small" />
                    </ListItemIcon>
                    My Orders
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu; 