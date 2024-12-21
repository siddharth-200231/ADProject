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
  KeyboardArrowDown,
  Home as HomeIcon,
  ShoppingBag as ShoppingBagIcon,
  ShoppingBag,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../Context/Context';
import axios from '../axios';
import Logo from './Logo';

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&:focus-within': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '500px',
  transition: 'all 0.2s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255, 255, 255, 0.5)',
  transition: 'color 0.2s ease',
  '.MuiInputBase-root:focus-within + &': {
    color: '#3b82f6',
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: '0.95rem',
    width: '100%',
    transition: 'all 0.2s ease',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '35ch',
      '&:focus': {
        width: '45ch',
      },
    },
  },
}));

const CategoryMenu = ({ onSelectCategory }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/categories');
        // Add "All" category at the beginning
        setCategories(['All', ...response.data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(['All']); // Fallback to at least showing "All"
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (category) => {
    onSelectCategory(category === 'All' ? '' : category);
    handleClose();
  };

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        disabled={loading}
        sx={{
          color: 'rgba(255, 255, 255, 0.9)',
          textTransform: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '6px',
          padding: '8px 16px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.12)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        Categories
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            background: 'linear-gradient(135deg, rgba(29, 38, 113, 0.98), rgba(35, 41, 113, 0.98))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
            '& .MuiMenuItem-root': {
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(138, 43, 226, 0.2)',
                color: '#ffffff',
                transform: 'translateX(5px)',
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {loading ? (
          <MenuItem disabled>Loading categories...</MenuItem>
        ) : (
          categories.map((category) => (
            <MenuItem
              key={category}
              onClick={() => handleSelect(category)}
            >
              {category}
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

const MobileMenu = ({ onClose, onSelectCategory }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AppContext);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Box sx={{ 
      width: 250, 
      pt: 2,
      '& .MuiListItemText-primary': {
        color: 'rgba(255, 255, 255, 0.9)',
      },
      '& .MuiListItemText-secondary': {
        color: 'rgba(255, 255, 255, 0.7)',
      },
      '& .MuiListItemIcon-root': {
        color: 'rgba(255, 255, 255, 0.9)',
      }
    }}>
      <List>
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/cart')}>
          <ListItemIcon>
            <ShoppingBagIcon />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>

        {user && (
          <ListItem button onClick={() => handleNavigation('/add_product')}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItem>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Categories Section */}
        <ListItem>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        
        {["All", "Electronics", "Fashion", "Home & Living", "Books", "Sports", "Beauty", "Toys"].map((category) => (
          <ListItem 
            button 
            key={category}
            onClick={() => {
              onSelectCategory(category);
              onClose();
            }}
            sx={{ pl: 4 }}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {user ? (
          <>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText 
                primary={user.name}
                secondary={user.email}
                primaryTypographyProps={{ noWrap: true }}
                secondaryTypographyProps={{ noWrap: true }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={() => handleNavigation('/login')}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

const UserMenu = ({ anchorEl, handleClose, user, handleLogout }) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    PaperProps={{
      sx: {
        backgroundColor: 'rgba(29, 38, 113, 0.98)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        mt: 1.5,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
        '& .MuiMenuItem-root': {
          color: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        },
        '& .MuiListItemIcon-root': {
          color: 'rgba(255, 255, 255, 0.9)',
        }
      }
    }}
  >
    <MenuItem onClick={handleClose} component={Link} to="/profile">
      <ListItemIcon>
        <PersonIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </MenuItem>
    
    <MenuItem onClick={handleClose} component={Link} to="/orders">
      <ListItemIcon>
        <ShoppingBagIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </MenuItem>
    
    <Divider sx={{ my: 1, borderColor: 'var(--glass-border)' }} />
    
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </MenuItem>
  </Menu>
);

const Navbar = ({ onSearch, onSelectCategory }) => {
  const { user, cart, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All Categories']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      className="navbar" 
      sx={{ 
        background: 'rgba(22, 28, 36, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            justifyContent: 'space-between',
            py: 1.5,
          }}
        >
          {/* Mobile Menu Icon */}
          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <ShoppingBag 
              sx={{ 
                fontSize: { sm: '1.8rem', md: '2.2rem' },
                color: '#FF6B6B',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(-5px)',
                  },
                },
              }} 
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '0.5px',
                fontSize: { sm: '1.2rem', md: '1.4rem' },
                textDecoration: 'none',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.85)',
                },
                transition: 'color 0.2s ease',
              }}
            >
              TechBazaar
            </Typography>
          </Box>

          {/* Search Bar - Hide on mobile */}
          <Box sx={{ 
            flexGrow: 1, 
            maxWidth: '600px', 
            mx: { sm: 4, md: 8 },
            display: { xs: 'none', sm: 'block' },
            '&:hover': {
              boxShadow: '0 0 15px var(--primary-muted)',
            }
          }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search products..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearch}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSearch(searchQuery);
                  }
                }}
              />
            </Search>
          </Box>

          {/* Add CategoryMenu here */}
          <CategoryMenu onSelectCategory={onSelectCategory} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {/* Cart Icon */}
            <IconButton
              onClick={() => navigate('/cart')}
              sx={{
                p: 1,
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.12)',
                },
              }}
            >
              <Badge 
                badgeContent={cart.length} 
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(45deg, #9C27B0, #3F51B5)',
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    minWidth: { xs: '18px', sm: '20px' },
                    height: { xs: '18px', sm: '20px' },
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <ShoppingCartIcon sx={{ 
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  color: 'var(--primary-color)',
                }} />
              </Badge>
            </IconButton>

            {/* User Menu */}
            {user ? (
              <>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: { xs: 0.8, sm: 1.2 },
                    background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.1), rgba(63, 81, 181, 0.1))',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.2), rgba(63, 81, 181, 0.2))',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 15px rgba(156, 39, 176, 0.2)',
                    }
                  }}
                >
                  <Avatar sx={{ 
                    width: { xs: 28, sm: 32 }, 
                    height: { xs: 28, sm: 32 },
                    background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.9), rgba(63, 81, 181, 0.9))',
                    border: '2px solid rgba(20, 20, 30, 0.8)',
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
                    '&:hover': {
                      border: '2px solid rgba(138, 43, 226, 0.5)',
                    }
                  }}>
                    {user.username ? user.username.slice(0, 2).toUpperCase() : 'User'}
                  </Avatar>
                </IconButton>
                <UserMenu 
                  anchorEl={anchorElUser}
                  handleClose={handleCloseUserMenu}
                  user={user}
                  handleLogout={logout}
                />
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  fontSize: '0.875rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  padding: '6px 16px',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '300px',
            background: 'linear-gradient(135deg, var(--dark-bg-secondary), var(--dark-bg-primary))',
            '&:hover': {
              boxShadow: '0 0 15px var(--primary-muted)',
            }
          }
        }}
      >
        <MobileMenu onClose={() => setMobileOpen(false)} onSelectCategory={onSelectCategory} />
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
