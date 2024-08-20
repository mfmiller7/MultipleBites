import React from 'react';

import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import Rating from '@mui/material/Rating';

const RatingCard = ({ rating }) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 400, margin: '20px auto' }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" component="div">
                        {rating.restaurant}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(rating.date).toLocaleDateString()}
                    </Typography>
                </Box>
                <Typography color="text.secondary">
                    {rating.location}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center">
                    <Rating
                        name="rating"
                        value={rating.rating / 2}
                        precision={0.1}
                        readOnly
                    />
                    <Typography variant="body2" component="div" sx={{ ml: 0.5 }}>
                        ({rating.rating}/10)
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    <em>{rating.review}</em>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" align="right">
                    ~ {rating.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RatingCard;