import React, { useContext } from 'react';
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
    Fade
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
        Laptop: `<path d="M40,60 L260,60 L260,200 L40,200 Z M20,200 L280,200 L300,240 L0,240 Z" fill="none" stroke="white" stroke-width="8"/>
                 <rect x="80" y="220" width="140" height="8" fill="white"/>`,
        Mobile: `<path d="M100,20 L200,20 Q220,20 220,40 L220,260 Q220,280 200,280 L100,280 Q80,280 80,260 L80,40 Q80,20 100,20 Z" fill="none" stroke="white" stroke-width="8"/>
                 <circle cx="150" cy="250" r="15" fill="white"/>
                 <rect x="110" y="40" width="80" height="180" fill="white" fill-opacity="0.2"/>`,
        Headphone: `<path d="M80,150 Q80,80 150,80 Q220,80 220,150 L220,220 L200,220 L200,160 Q200,100 150,100 Q100,100 100,160 L100,220 L80,220 Z" fill="none" stroke="white" stroke-width="8"/>
                    <rect x="60" y="180" width="40" height="80" rx="20" fill="white"/>
                    <rect x="200" y="180" width="40" height="80" rx="20" fill="white"/>`,
        Electronics: `<path d="M40,80 L260,80 Q280,80 280,100 L280,200 Q280,220 260,220 L40,220 Q20,220 20,200 L20,100 Q20,80 40,80 Z" fill="none" stroke="white" stroke-width="8"/>
                     <circle cx="150" cy="150" r="30" fill="white"/>
                     <circle cx="250" cy="100" r="10" fill="white"/>`,
        default: `<path d="M150,50 L250,150 L150,250 L50,150 Z" fill="none" stroke="white" stroke-width="8"/>
                  <circle cx="150" cy="150" r="30" fill="white"/>`
    };

    const colors = {
        Laptop: ['#4A90E2', '#357ABD'],
        Mobile: ['#50E3C2', '#39B3A3'],
        Headphone: ['#F5A623', '#F39C12'],
        Electronics: ['#9B59B6', '#8E44AD'],
        default: ['#95A5A6', '#7F8C8D']
    };

    const [primary, secondary] = colors[category] || colors.default;
    const icon = icons[category] || icons.default;

    return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${primary};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${secondary};stop-opacity:1" />
                </linearGradient>
                <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1.5" fill="#fff" fill-opacity="0.2"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad)"/>
            <rect width="100%" height="100%" fill="url(#pattern)"/>
            ${icon}
        </svg>
    `)}`;
};

const Card = ({ product }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const { addToCart, user } = useContext(AppContext);
    const { showSuccess, showError } = useNotification();

    const handleAddToCart = async () => {
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
        <Fade in={true} timeout={500}>
            <MuiCard 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                    }
                }}
            >
                {/* Favorite Button with Ripple Effect */}
                <IconButton 
                    sx={{ 
                        position: 'absolute', 
                        right: 12, 
                        top: 12,
                        zIndex: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                            transform: 'scale(1.1) rotate(5deg)',
                            bgcolor: 'rgba(255, 255, 255, 1)'
                        }
                    }}
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    {isFavorite ? 
                        <FavoriteIcon sx={{ color: '#ff4081' }} /> : 
                        <FavoriteBorderIcon />
                    }
                </IconButton>

                {/* Product Image with Loading Skeleton */}
                <Box sx={{ position: 'relative', pt: '75%' }}>
                    {!imageLoaded && (
                        <Skeleton 
                            variant="rectangular" 
                            sx={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%'
                            }} 
                        />
                    )}
                    <CardMedia
                        component="img"
                        image={product.imageUrl || generateDefaultSvg(product.category)}
                        alt={product.name}
                        onLoad={() => setImageLoaded(true)}
                        sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Tags Section */}
                    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {product.category && (
                            <Chip 
                                label={product.category} 
                                size="small" 
                                sx={{ 
                                    borderRadius: 2,
                                    background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                                    color: 'white',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.5px'
                                }}
                            />
                        )}
                        {product.brand && (
                            <Chip 
                                label={product.brand} 
                                size="small" 
                                sx={{ 
                                    borderRadius: 2,
                                    background: 'linear-gradient(45deg, #ff9800, #ff5722)',
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
                                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.7rem'
                                }}
                            />
                        )}
                    </Box>

                    {/* Product Name */}
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            lineHeight: 1.4,
                            mb: 1,
                            height: '3.2em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            color: '#2c3e50'
                        }}
                    >
                        {product.name}
                    </Typography>

                    {/* Rating */}
                    {product.rating && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Rating 
                                value={product.rating} 
                                readOnly 
                                size="small" 
                                precision={0.5}
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: '#ffd700'
                                    }
                                }}
                            />
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    ml: 1,
                                    color: '#666',
                                    fontSize: '0.875rem'
                                }}
                            >
                                ({product.rating})
                            </Typography>
                        </Box>
                    )}

                    {/* Price */}
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 800,
                            color: '#2c3e50',
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 0.5
                        }}
                    >
                        {formatPrice(product.price)}
                    </Typography>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                    <Button 
                        size="medium" 
                        variant="outlined"
                        onClick={() => navigate(`/product/${product.id}`)}
                        sx={{
                            flex: 1,
                            borderRadius: 2,
                            borderColor: '#2196f3',
                            color: '#2196f3',
                            fontWeight: 600,
                            '&:hover': {
                                borderColor: '#1976d2',
                                backgroundColor: 'rgba(33, 150, 243, 0.08)'
                            }
                        }}
                    >
                        View Details
                    </Button>
                    <Button
                        size="medium"
                        variant="contained"
                        startIcon={<CartIcon />}
                        onClick={handleAddToCart}
                        disabled={!product.available}
                        sx={{
                            flex: 1,
                            borderRadius: 2,
                            fontWeight: 600,
                            background: product.available 
                                ? 'linear-gradient(45deg, #2196f3, #1976d2)'
                                : '#9e9e9e',
                            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                            '&:hover': {
                                background: product.available 
                                    ? 'linear-gradient(45deg, #1976d2, #1565c0)'
                                    : '#757575',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)'
                            }
                        }}
                    >
                        {product.available ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                </CardActions>
            </MuiCard>
        </Fade>
    );
};

export default Card;