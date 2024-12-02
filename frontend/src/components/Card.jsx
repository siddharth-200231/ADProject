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
    IconButton
} from '@mui/material';
import { 
    ShoppingCart as CartIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = React.useState(false);
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
        <MuiCard 
            sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[4]
                }
            }}
        >
            {/* Favorite Button */}
            <IconButton 
                sx={{ 
                    position: 'absolute', 
                    right: 8, 
                    top: 8,
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' }
                }}
                onClick={() => setIsFavorite(!isFavorite)}
            >
                {isFavorite ? 
                    <FavoriteIcon color="error" /> : 
                    <FavoriteBorderIcon />
                }
            </IconButton>

            {/* Product Image */}
            <CardMedia
                component="img"
                height="200"
                image={product.imageUrl || `https://via.placeholder.com/300?text=${product.name}`}
                alt={product.name}
                sx={{ 
                    objectFit: 'cover',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}
            />

            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                {/* Category & Brand */}
                <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
                    {product.category && (
                        <Chip 
                            label={product.category} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                        />
                    )}
                    {product.brand && (
                        <Chip 
                            label={product.brand} 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                        />
                    )}
                </Box>

                {/* Product Name */}
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="h2"
                    sx={{ 
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        height: '2.6rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {product.name}
                </Typography>

                {/* Rating */}
                {product.rating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating 
                            value={product.rating} 
                            readOnly 
                            size="small" 
                            precision={0.5}
                        />
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ ml: 1 }}
                        >
                            ({product.rating})
                        </Typography>
                    </Box>
                )}

                {/* Price */}
                <Typography 
                    variant="h6" 
                    color="primary"
                    sx={{ 
                        fontWeight: 'bold',
                        mt: 1
                    }}
                >
                    ₹{product.price.toLocaleString()}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => navigate(`/product/${product.id}`)}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none'
                    }}
                >
                    View Details
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<CartIcon />}
                    onClick={handleAddToCart}
                    disabled={!product.available}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none'
                    }}
                >
                    {product.available ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </CardActions>
        </MuiCard>
    );
};

export default Card;
