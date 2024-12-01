import React from 'react';
import { 
    Card as MuiCard,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
    const navigate = useNavigate();

    return (
        <MuiCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                </Typography>
                <Typography>
                    {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    View Details
                </Button>
            </CardActions>
        </MuiCard>
    );
};

export default Card;
