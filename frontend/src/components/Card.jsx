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
                        image={product.imageUrl || `https://via.placeholder.com/300?text=${product.name}`}
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
                        <span style={{ fontSize: '0.8em', color: '#666' }}>₹</span>
                        {product.price.toLocaleString()}
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