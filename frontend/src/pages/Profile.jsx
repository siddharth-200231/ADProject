import React, { useContext } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  AccountBox as AccountIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import AppContext from '../Context/Context';

const Profile = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">
          Please login to view your profile
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            background: 'var(--dark-bg-secondary)',
            borderRadius: 3,
            position: 'relative'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
                fontSize: '3rem',
                border: '4px solid',
                borderColor: 'primary.main'
              }}
            >
              {user.username ? user.username[0].toUpperCase() : 'U'}
            </Avatar>
            <Box>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                {user.username}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user.role || 'Customer'}
              </Typography>
            </Box>
            <Tooltip title="Edit Profile">
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20 
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        {/* Info Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              background: 'var(--dark-bg-secondary)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Username</Typography>
                </Box>
                <Typography variant="body1">{user.username}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              background: 'var(--dark-bg-secondary)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Email</Typography>
                </Box>
                <Typography variant="body1">{user.email}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              background: 'var(--dark-bg-secondary)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccountIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Account Type</Typography>
                </Box>
                <Typography variant="body1">{user.role || 'Customer'}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 