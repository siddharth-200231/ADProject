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
    return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#f1f5f9"/>
            <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#64748b" text-anchor="middle">
                ${category || 'No Image'}
            </text>
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