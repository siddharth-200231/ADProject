import React, { useContext, useMemo } from 'react';
import AppContext from '../Context/Context';
import { useNotification } from '../hooks/useNotification';
import defaultImg from '../assets/img.png';
import { 
    Card as MuiCard,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip,
    Rating,
    IconButton,
    Skeleton,
    Fade,
    useTheme
} from '@mui/material';
import { 
    ShoppingCart as CartIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    LocalShipping as ShippingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

const generateDefaultSvg = (category) => {
    return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Primary Gradient -->
                <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
                </linearGradient>
                
                <!-- Extended Accent Gradients -->
                <linearGradient id="accentGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#2563eb;stop-opacity:0.8" />
                </linearGradient>
                
                <linearGradient id="accentGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0.8" />
                </linearGradient>
                
                <linearGradient id="accentGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ec4899;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#d946ef;stop-opacity:0.8" />
                </linearGradient>

                <!-- Enhanced New Gradients -->
                <linearGradient id="accentGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#059669;stop-opacity:0.8" />
                </linearGradient>

                <linearGradient id="accentGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#d97706;stop-opacity:0.8" />
                </linearGradient>

                <linearGradient id="accentGrad6" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#dc2626;stop-opacity:0.8" />
                </linearGradient>

                <!-- New Rainbow Gradient -->
                <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.6" />
                    <stop offset="25%" style="stop-color:#8b5cf6;stop-opacity:0.6" />
                    <stop offset="50%" style="stop-color:#ec4899;stop-opacity:0.6" />
                    <stop offset="75%" style="stop-color:#f59e0b;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.6" />
                </linearGradient>

                <!-- Enhanced Patterns -->
                <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" stroke-width="0.8"/>
                </pattern>
                
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1.5" fill="#94a3b8" opacity="0.4"/>
                </pattern>

                <!-- Filters -->
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>

                <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
                </filter>
            </defs>

            <!-- Background Structure -->
            <rect width="200" height="200" fill="url(#primaryGrad)"/>
            <rect width="200" height="200" fill="url(#grid)"/>
            <rect width="200" height="200" fill="url(#dots)"/>

            <!-- Enhanced Decorative Circles -->
            <circle cx="40" cy="40" r="100" fill="url(#rainbowGrad)" opacity="0.1"/>
            <circle cx="160" cy="160" r="120" fill="url(#accentGrad2)" opacity="0.08"/>
            <circle cx="100" cy="100" r="80" fill="url(#accentGrad3)" opacity="0.07"/>
            <circle cx="180" cy="40" r="60" fill="url(#accentGrad4)" opacity="0.06"/>
            <circle cx="20" cy="160" r="50" fill="url(#accentGrad5)" opacity="0.05"/>

            <!-- Enhanced Dynamic Lines -->
            <path d="M20 100 Q60 80 100 100 T180 100" stroke="url(#rainbowGrad)" fill="none" 
                stroke-width="3" opacity="0.4" filter="url(#glow)"/>
            <path d="M20 120 Q60 140 100 120 T180 120" stroke="url(#accentGrad2)" fill="none" 
                stroke-width="2.5" opacity="0.35" filter="url(#glow)"/>
            <path d="M40 80 Q80 60 120 80 T200 80" stroke="url(#accentGrad4)" fill="none" 
                stroke-width="2" opacity="0.3" filter="url(#glow)"/>
            <path d="M0 140 Q40 160 80 140 T160 140" stroke="url(#accentGrad5)" fill="none" 
                stroke-width="2" opacity="0.25" filter="url(#glow)"/>

            <!-- Enhanced Floating Elements -->
            <g transform="translate(50, 50)">
                <circle cx="0" cy="0" r="6" fill="url(#accentGrad1)" opacity="0.4"/>
                <circle cx="100" cy="100" r="6" fill="url(#accentGrad2)" opacity="0.4"/>
                <circle cx="80" cy="20" r="5" fill="url(#accentGrad3)" opacity="0.4"/>
                <circle cx="20" cy="80" r="4" fill="url(#accentGrad4)" opacity="0.4"/>
                <circle cx="60" cy="40" r="4" fill="url(#accentGrad5)" opacity="0.4"/>
                <circle cx="120" cy="60" r="4" fill="url(#accentGrad6)" opacity="0.4"/>
            </g>

            <!-- Central Icon Container -->
            <g transform="translate(100, 85)" filter="url(#shadow)">
                <circle cx="0" cy="0" r="35" fill="white" opacity="0.95"/>
                <circle cx="0" cy="0" r="28" fill="url(#accentGrad1)" opacity="0.1"/>
                <path d="M-20 0 Q0 -20 20 0 Q0 20 -20 0" 
                    fill="none" stroke="#3b82f6" stroke-width="2.5" opacity="0.6"/>
            </g>

            <!-- Modern Category Badge -->
            <g transform="translate(100, 140)">
                <rect x="-70" y="-15" width="140" height="30" rx="15" 
                    fill="white" opacity="0.95" filter="url(#shadow)"/>
                <text 
                    x="0" 
                    y="6" 
                    font-family="'Inter', system-ui, sans-serif" 
                    font-size="13" 
                    fill="#1e293b" 
                    text-anchor="middle" 
                    font-weight="600"
                    letter-spacing="0.5"
                >
                    ${category || 'No Image'}
                </text>
            </g>

            <!-- Corner Accents -->
            <path d="M0 0 L40 0 L40 3 L3 3 L3 40 L0 40 Z" fill="url(#accentGrad1)" opacity="0.3"/>
            <path d="M200 0 L160 0 L160 3 L197 3 L197 40 L200 40 Z" fill="url(#accentGrad2)" opacity="0.3"/>
            <path d="M0 200 L40 200 L40 197 L3 197 L3 160 L0 160 Z" fill="url(#accentGrad2)" opacity="0.3"/>
            <path d="M200 200 L160 200 L160 197 L197 197 L197 160 L200 160 Z" fill="url(#accentGrad3)" opacity="0.3"/>

            <!-- Abstract Shapes -->
            <circle cx="30" cy="170" r="15" fill="url(#accentGrad1)" opacity="0.1"/>
            <circle cx="170" cy="30" r="15" fill="url(#accentGrad3)" opacity="0.1"/>
        </svg>
    `)}`;
};

// Updated gradient palette with more unique combinations
const getGradients = (isDark) => ({
    primary: isDark 
        ? 'linear-gradient(135deg, #1a1c20 0%, #2d3748 50%, #1a1c20 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
    accent: isDark
        ? 'linear-gradient(135deg, #2d3748 0%, #1a1c20 50%, #2d3748 100%)'
        : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
    hover: isDark
        ? 'linear-gradient(135deg, #000000 0%, #1a1c20 50%, #000000 100%)'
        : 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, #f1f5f9 100%)'
});

const Card = React.memo(({ product }) => {
    const navigate = useNavigate();
    const { addToCart, user } = useContext(AppContext);
    const { showSuccess, showError } = useNotification();
    const theme = useTheme();

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await addToCart(product, 1);
            showSuccess('Added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            showError(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    return (
        <Fade in={true} timeout={800}>
            <MuiCard 
                onClick={() => navigate(`/product/${product.id}`)}
                sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: theme => theme.palette.mode === 'dark' 
                        ? 'linear-gradient(145deg, #1E293B 0%, #334155 100%)'
                        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.2)',
                    }
                }}
            >
                {/* Image Container */}
                <Box sx={{ 
                    position: 'relative',
                    height: 220,
                    width: '100%',
                    background: '#1A1F2E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                    <CardMedia
                        component="img"
                        loading="lazy"
                        image={product.imageUrl || defaultImg}
                        alt={product.name}
                        sx={{ 
                            width: '80%',
                            height: '80%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                        }}
                    />
                    
                    {/* Price Tag */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            background: 'rgba(0,0,0,0.9)',
                            color: '#fff',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        {formatPrice(product.price)}
                    </Box>
                </Box>

                {/* Content */}
                <CardContent sx={{ 
                    flexGrow: 1,
                    p: 2.5,
                    '&:last-child': { pb: 2 }
                }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            mb: 1,
                            color: '#FFFFFF',
                        }}
                    >
                        {product.name}
                    </Typography>

                    {/* Brand */}
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            mb: 2,
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.9rem',
                        }}
                    >
                        {product.brand}
                    </Typography>

                    {/* Specs */}
                    <Box sx={{ 
                        display: 'flex',
                        gap: 1,
                        flexWrap: 'wrap',
                        mb: 2
                    }}>
                        {product.specs?.slice(0, 2).map((spec, index) => (
                            <Chip
                                key={index}
                                label={spec}
                                size="small"
                                sx={{
                                    fontSize: '0.75rem',
                                    height: '24px',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </CardContent>

                {/* Actions */}
                <CardActions sx={{ 
                    p: 2.5,
                    pt: 0,
                    gap: 1.5
                }}>
                    <Button 
                        variant="outlined"
                        fullWidth
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                        }}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 600,
                            borderColor: 'rgba(255,255,255,0.3)',
                            color: '#FFFFFF',
                            '&:hover': {
                                borderColor: 'rgba(255,255,255,0.5)',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                            }
                        }}
                    >
                        Details
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<CartIcon />}
                        onClick={handleAddToCart}
                        disabled={!product.available}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 600,
                            backgroundColor: '#3B82F6',
                            '&:hover': {
                                backgroundColor: '#2563EB',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.3)',
                            }
                        }}
                    >
                        {product.available ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                </CardActions>
            </MuiCard>
        </Fade>
    );
});

Card.displayName = 'Card';

export default Card;