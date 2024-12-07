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
        Laptop: ['#4A90E2', '#2574c4'],
        Mobile: ['#50E3C2', '#00b894'],
        Headphone: ['#F5A623', '#e17055'],
        Electronics: ['#9B59B6', '#6c5ce7'],
        default: ['#95A5A6', '#636e72']
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
        <Fade in={true} timeout={700}>
            <MuiCard 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    background: theme => `linear-gradient(135deg, 
                        ${theme.palette.mode === 'dark' ? '#2a2d3e' : '#ffffff'} 0%,
                        ${theme.palette.mode === 'dark' ? '#1a1c27' : '#f8faff'} 100%)`,
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: theme => `
                        0 10px 40px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(140, 152, 164, 0.2)'},
                        inset 0 -10px 20px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)'}`,
                    '&:hover': {
                        transform: 'translateY(-12px) scale(1.02) rotate(1deg)',
                        boxShadow: theme => `
                            0 30px 60px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.35)' : 'rgba(140, 152, 164, 0.3)'},
                            inset 0 -10px 20px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)'}`,
                        '& .product-image': {
                            transform: 'scale(1.15) rotate(-3deg)',
                        },
                        '& .card-content-overlay': {
                            opacity: 1,
                            transform: 'translateY(0)',
                        }
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 50%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.8s ease',
                    },
                    '&:hover::before': {
                        transform: 'translateX(100%)',
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

                {/* Image Container with new styling */}
                <Box sx={{ 
                    position: 'relative', 
                    pt: '75%',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(0,0,0,0.05) 0%, rgba(255,255,255,0.15) 100%)',
                        zIndex: 1,
                        borderRadius: '32px 32px 0 0',
                        backdropFilter: 'blur(4px)',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '5%',
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        border: '2px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                    },
                    '&:hover::after': {
                        opacity: 1,
                    }
                }}>
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
                        className="product-image"
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
                            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    />
                </Box>

                <CardContent 
                    className="card-content-overlay"
                    sx={{ 
                        flexGrow: 1, 
                        p: 3,
                        position: 'relative',
                        background: theme => `linear-gradient(to top, 
                            ${theme.palette.mode === 'dark' ? 'rgba(26,28,39,0.95)' : 'rgba(255,255,255,0.95)'} 0%,
                            ${theme.palette.mode === 'dark' ? 'rgba(26,28,39,0.7)' : 'rgba(255,255,255,0.7)'} 100%)`,
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.4s ease',
                        opacity: 0.95,
                        transform: 'translateY(5px)',
                    }}
                >
                    {/* Updated Chips styling */}
                    <Box sx={{ 
                        mb: 2, 
                        display: 'flex', 
                        gap: 1, 
                        flexWrap: 'wrap',
                        '& .MuiChip-root': {
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: -1,
                                padding: 1,
                                borderRadius: 'inherit',
                                background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            },
                            '&:hover': {
                                transform: 'translateY(-3px) rotate(2deg)',
                                '&::before': {
                                    opacity: 1
                                }
                            }
                        }
                    }}>
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

                    {/* Updated Typography styles */}
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            lineHeight: 1.4,
                            mb: 1,
                            height: '3.2em',
                            background: 'linear-gradient(45deg, #2c3e50, #3498db)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
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

                {/* Updated Card Actions */}
                <CardActions sx={{ 
                    p: 3, 
                    pt: 2,
                    gap: 1.5,
                    '& .MuiButton-root': {
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        '&:hover': {
                            transform: 'translateY(-3px) scale(1.03)',
                            boxShadow: '0 12px 25px rgba(0,0,0,0.15)'
                        }
                    }
                }}>
                    <Button 
                        size="medium" 
                        variant="outlined"
                        onClick={() => navigate(`/product/${product.id}`)}
                        sx={{
                            flex: 1,
                            background: 'rgba(33, 150, 243, 0.05)',
                            borderWidth: '2px',
                            borderColor: '#2196f3',
                            color: '#2196f3',
                            fontWeight: 700,
                            '&:hover': {
                                background: 'rgba(33, 150, 243, 0.1)',
                                borderWidth: '2px',
                                borderColor: '#1976d2',
                                boxShadow: '0 8px 20px rgba(33, 150, 243, 0.25), inset 0 2px 4px rgba(33, 150, 243, 0.1)'
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
                            background: product.available 
                                ? 'linear-gradient(45deg, #2196f3, #1976d2)'
                                : 'linear-gradient(45deg, #9e9e9e, #757575)',
                            boxShadow: '0 6px 15px rgba(33, 150, 243, 0.3)',
                            '&:hover': {
                                background: product.available 
                                    ? 'linear-gradient(45deg, #1976d2, #1565c0)'
                                    : 'linear-gradient(45deg, #757575, #616161)',
                                boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
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