import React, { useContext } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  AccountBox as AccountIcon
} from '@mui/icons-material';
import AppContext from '../Context/Context';

const Profile = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">
          Please login to view your profile
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--dark-bg-secondary)',
            borderRadius: 2
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: '2.5rem'
            }}
          >
            {user.username ? user.username[0].toUpperCase() : 'U'}
          </Avatar>

          <Typography variant="h4" gutterBottom>
            {user.username}
          </Typography>

          <Divider sx={{ width: '100%', my: 2 }} />

          <List sx={{ width: '100%' }}>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Username"
                secondary={user.username}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Email"
                secondary={user.email}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Account Type"
                secondary={user.role || 'Customer'}
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 