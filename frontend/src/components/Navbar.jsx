import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Category as CategoryIcon,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../Context/Context';
import axios from '../axios';
import Logo from './Logo';

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.04)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
    '&::placeholder': {
      color: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.6)' 
        : 'rgba(0, 0, 0, 0.6)',
      opacity: 1,
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = ({ onSearch, onSelectCategory, onThemeToggle, isDarkMode }) => {
  const { user, cart, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All Categories']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(['All Categories', ...response.data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category === 'All Categories' ? '' : category);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'background.paper',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={() => setDrawerOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              textDecoration: 'none',
            }}
          >
            <Logo />
          </Box>

          {/* Mobile Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              textDecoration: 'none',
            }}
          >
            <Logo />
          </Box>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategorySelect(category)}
                sx={{
                  color: 'text.primary',
                  display: 'block',
                  fontWeight: selectedCategory === category ? 700 : 400,
                  borderBottom: selectedCategory === category ? 2 : 0,
                  borderColor: 'primary.main',
                  borderRadius: 0,
                  px: 2
                }}
              >
                {category}
              </Button>
            ))}
          </Box>

          {/* Cart & User Menu */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              component={Link}
              to="/cart"
              color="inherit"
              sx={{ position: 'relative' }}
            >
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt={user.name} src={user.avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem component={Link} to="/profile">
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                  <MenuItem component={Link} to="/add_product">
                    <ListItemIcon>
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add Product</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                startIcon={<LoginIcon />}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            )}
          </Box>

          {/* Add Theme Toggle Button */}
          <IconButton
            onClick={onThemeToggle}
            color="inherit"
            sx={{ ml: 2 }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Category Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            <ListItem>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Categories
              </Typography>
            </ListItem>
            <Divider />
            {categories.map((category) => (
              <ListItem
                key={category}
                button
                onClick={() => handleCategorySelect(category)}
                sx={{
                  bgcolor: selectedCategory === category ? 'action.selected' : 'transparent'
                }}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
