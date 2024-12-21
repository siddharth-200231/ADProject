import React, { useContext, useMemo } from 'react';
import AppContext from '../Context/Context';
import { useNotification } from '../hooks/useNotification';
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
    const icons = {
        Laptop: `<path d="M40,60 L260,60 Q270,60 270,70 L270,190 Q270,200 260,200 L40,200 Q30,200 30,190 L30,70 Q30,60 40,60 Z" fill="none" stroke="white" stroke-width="8"/>
                 <rect x="45" y="75" width="210" height="110" fill="white" fill-opacity="0.2"/>
                 <path d="M20,200 L280,200 L300,240 L0,240 Z" fill="none" stroke="white" stroke-width="8"/>
                 <rect x="80" y="220" width="140" height="8" fill="white"/>
                 <circle cx="150" cy="225" r="4" fill="white"/>`,
        Mobile: `<path d="M100,20 L200,20 Q220,20 220,40 L220,260 Q220,280 200,280 L100,280 Q80,280 80,260 L80,40 Q80,20 100,20 Z" fill="none" stroke="white" stroke-width="8"/>
                 <rect x="90" y="40" width="120" height="200" rx="2" fill="white" fill-opacity="0.2"/>
                 <circle cx="150" cy="250" r="15" fill="white"/>
                 <rect x="130" y="45" width="40" height="5" rx="2.5" fill="white"/>
                 <circle cx="150" cy="45" r="2" fill="white" fill-opacity="0.5"/>`,
        Headphone: `<path d="M80,150 Q80,80 150,80 Q220,80 220,150 L220,220 L200,220 L200,160 Q200,100 150,100 Q100,100 100,160 L100,220 L80,220 Z" fill="none" stroke="white" stroke-width="8"/>
                    <path d="M60,180 Q40,180 40,200 L40,240 Q40,260 60,260 L80,260 Q100,260 100,240 L100,200 Q100,180 80,180 Z" fill="white"/>
                    <path d="M220,180 Q200,180 200,200 L200,240 Q200,260 220,260 L240,260 Q260,260 260,240 L260,200 Q260,180 240,180 Z" fill="white"/>
                    <circle cx="150" cy="140" r="5" fill="white" fill-opacity="0.5"/>`,
        Electronics: `<path d="M40,80 L260,80 Q280,80 280,100 L280,200 Q280,220 260,220 L40,220 Q20,220 20,200 L20,100 Q20,80 40,80 Z" fill="none" stroke="white" stroke-width="8"/>
                     <circle cx="150" cy="150" r="40" fill="none" stroke="white" stroke-width="8"/>
                     <circle cx="150" cy="150" r="20" fill="white"/>
                     <circle cx="250" cy="100" r="10" fill="white"/>
                     <path d="M150,110 L150,190 M110,150 L190,150" stroke="white" stroke-width="4"/>`,
        default: `<path d="M150,50 L250,150 L150,250 L50,150 Z" fill="none" stroke="white" stroke-width="8"/>
                  <circle cx="150" cy="150" r="40" fill="none" stroke="white" stroke-width="8"/>
                  <circle cx="150" cy="150" r="20" fill="white"/>
                  <circle cx="150" cy="150" r="5" fill="white" fill-opacity="0.5"/>`
    };

    const colors = {
        Laptop: ['#6366f1', '#4f46e5'],
        Mobile: ['#ec4899', '#db2777'],
        Headphone: ['#8b5cf6', '#7c3aed'],
        Electronics: ['#14b8a6', '#0d9488'],
        default: ['#64748b', '#475569']
    };

    const [primary, secondary] = colors[category] || colors.default;

    return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${primary};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${secondary};stop-opacity:1" />
                </linearGradient>
                <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="#fff" fill-opacity="0.15"/>
                </pattern>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad)"/>
            <rect width="100%" height="100%" fill="url(#pattern)"/>
            <g filter="url(#glow)">
                ${icons[category] || icons.default}
            </g>
        </svg>
    `)}`;
};

// Updated gradient and color palette
const getGradients = (isDark) => ({
    primary: isDark 
        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(23, 31, 50, 0.98) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 251, 254, 0.98) 100%)',
    accent: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    hover: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
});

const Card = React.memo(({ product }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const { addToCart, user } = useContext(AppContext);
    const { showSuccess, showError } = useNotification();
    const theme = useTheme();

    const gradients = React.useMemo(() => getGradients(theme.palette.mode === 'dark'), 
        [theme.palette.mode]);

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
        <Fade in={true} timeout={600}>
            <MuiCard 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate(`/product/${product.id}`)}
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    background: theme => theme.palette.mode === 'dark' 
                        ? 'rgba(15, 23, 42, 0.6)'
                        : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: theme => `1px solid ${
                        theme.palette.mode === 'dark' 
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.05)'
                    }`,
                    boxShadow: isHovered 
                        ? '0 20px 40px rgba(0,0,0,0.12)'
                        : '0 4px 12px rgba(0,0,0,0.05)',
                    transform: isHovered ? 'translateY(-4px)' : 'none',
                }}
            >
                {/* Tech Specs Badge - Updated */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 2,
                        display: 'flex',
                        gap: 0.75,
                        flexWrap: 'wrap',
                        maxWidth: '75%'
                    }}
                >
                    {product.specs?.map((spec, index) => (
                        <Chip
                            key={index}
                            label={spec}
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                                background: 'rgba(0, 0, 0, 0.65)',
                                backdropFilter: 'blur(8px)',
                                color: '#fff',
                                fontSize: '0.7rem',
                                height: '22px',
                                borderRadius: '6px',
                                '& .MuiChip-label': {
                                    px: 1.25,
                                    fontWeight: 500,
                                }
                            }}
                        />
                    ))}
                </Box>

                {/* Favorite Button - Updated */}
                <IconButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                    }}
                    sx={{ 
                        position: 'absolute', 
                        right: 12, 
                        top: 12,
                        zIndex: 2,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        width: 32,
                        height: 32,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        '&:hover': { 
                            background: 'rgba(255, 255, 255, 1)',
                        }
                    }}
                >
                    {isFavorite ? 
                        <FavoriteIcon sx={{ color: '#f43f5e', fontSize: 18 }} /> : 
                        <FavoriteBorderIcon sx={{ color: '#64748b', fontSize: 18 }} />
                    }
                </IconButton>

                {/* Image Container - Updated */}
                <Box sx={{ 
                    position: 'relative', 
                    pt: '80%',
                    background: theme => theme.palette.mode === 'dark' 
                        ? '#0f172a'
                        : '#f8fafc',
                }}>
                    <CardMedia
                        component="img"
                        loading="lazy"
                        image={product.imageUrl || generateDefaultSvg(product.category)}
                        alt={product.name}
                        sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            transform: isHovered ? 'scale(1.03)' : 'none',
                        }}
                    />
                </Box>

                {/* Content Section - Updated */}
                <CardContent 
                    sx={{ 
                        flexGrow: 1, 
                        p: 2,
                    }}
                >
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            mb: 1.5,
                            color: theme => theme.palette.mode === 'dark' ? '#f1f5f9' : '#0f172a',
                            lineHeight: 1.3,
                        }}
                    >
                        {product.name}
                    </Typography>

                    <Box sx={{ 
                        display: 'flex', 
                        gap: 1, 
                        mb: 2,
                        flexWrap: 'wrap'
                    }}>
                        {product.category && (
                            <Chip 
                                label={product.category} 
                                size="small" 
                                sx={{ 
                                    background: theme => theme.palette.mode === 'dark' 
                                        ? 'rgba(59, 130, 246, 0.15)'
                                        : 'rgba(59, 130, 246, 0.1)',
                                    color: '#3b82f6',
                                    borderRadius: '6px',
                                    height: '24px',
                                    fontWeight: 500,
                                }}
                            />
                        )}
                        {product.brand && (
                            <Chip 
                                label={product.brand} 
                                size="small" 
                                sx={{ 
                                    borderRadius: 2,
                                    background: 'linear-gradient(45deg, #8b5cf6, #6366f1)',
                                    color: 'white',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.5px'
                                }}
                            />
                        )}
                        {product.freeShipping && (
                            <Chip 
                                icon={<ShippingIcon sx={{ fontSize: 16, color: 'white' }} />}
                                label="Free Shipping" 
                                size="small"
                                sx={{ 
                                    borderRadius: 2,
                                    background: 'linear-gradient(45deg, #14b8a6, #0d9488)',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.7rem'
                                }}
                            />
                        )}
                    </Box>

                    {/* Price Section - Updated */}
                    <Box sx={{ 
                        mt: 'auto',
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: theme => `1px solid ${
                            theme.palette.mode === 'dark' 
                                ? 'rgba(255,255,255,0.05)'
                                : 'rgba(0,0,0,0.05)'
                        }`,
                    }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700,
                                color: theme => theme.palette.mode === 'dark' 
                                    ? '#f1f5f9'
                                    : '#0f172a',
                                fontSize: '1.25rem'
                            }}
                        >
                            {formatPrice(product.price)}
                        </Typography>
                        {product.originalPrice && (
                            <Typography
                                variant="body2"
                                sx={{
                                    textDecoration: 'line-through',
                                    color: 'text.secondary',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {formatPrice(product.originalPrice)}
                            </Typography>
                        )}
                    </Box>
                </CardContent>

                {/* Action Buttons - Updated */}
                <CardActions 
                    onClick={(e) => e.stopPropagation()}
                    sx={{ 
                        p: 2,
                        pt: 0,
                        gap: 1,
                    }}
                >
                    <Button 
                        variant="outlined"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                        }}
                        sx={{
                            flex: 1,
                            py: 1,
                            borderRadius: '8px',
                            borderColor: theme => theme.palette.mode === 'dark'
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(0,0,0,0.1)',
                            color: theme => theme.palette.mode === 'dark' ? '#f1f5f9' : '#0f172a',
                            '&:hover': {
                                borderColor: '#3b82f6',
                                background: 'rgba(59, 130, 246, 0.08)',
                            }
                        }}
                    >
                        Details
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<CartIcon />}
                        onClick={handleAddToCart}
                        disabled={!product.available}
                        sx={{
                            flex: 1,
                            py: 1,
                            borderRadius: '8px',
                            background: '#3b82f6',
                            '&:hover': {
                                background: '#2563eb',
                            },
                            '&:disabled': {
                                background: theme => theme.palette.mode === 'dark'
                                    ? 'rgba(255,255,255,0.1)'
                                    : 'rgba(0,0,0,0.1)',
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