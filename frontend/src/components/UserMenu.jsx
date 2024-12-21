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
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    '&:hover': { 
                        transform: 'scale(1.05)',
                        backgroundColor: 'primary.main',
                        '& .MuiAvatar-root': {
                            color: 'primary.contrastText'
                        }
                    }
                }}
            >
                <Avatar 
                    sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: 'transparent',
                        color: 'primary.main',
                        fontWeight: 'bold'
                    }}
                >
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    elevation: 3,
                    sx: { 
                        width: 200, 
                        mt: 1.5,
                        borderRadius: 2,
                        '& .MuiMenuItem-root': {
                            borderRadius: 1,
                            mx: 1,
                            my: 0.5
                        }
                    }
                }}
            >
                <MenuItem sx={{ py: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                        {user.name || 'User'}
                    </Typography>
                </MenuItem>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ px: 2, pb: 2 }}
                >
                    {user.email}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <MenuItem 
                    onClick={handleLogout}
                    sx={{
                        color: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.lighter'
                        }
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: 'error.main' }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu; 