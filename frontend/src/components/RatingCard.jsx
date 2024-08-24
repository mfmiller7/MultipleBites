import React from 'react';

import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import Rating from '@mui/material/Rating';

import { Colors } from '../constants';

const RatingCard = ({ rating }) => {

    const color = (rating) => {
        let bc;
        if (rating >= 7 && rating <= 10) {
            bc = Colors.green;
        } else if (rating >= 4 && rating < 7) {
            bc = Colors.yellow;
        } else if (rating >= 0 && rating < 4) {
            bc = Colors.red;
        } else {
            bc = Colors.white;
        }
        return bc;
    };

    return (
        <Card variant="outlined" sx={{ height: 225, overflow: 'auto', backgroundColor: color(rating.rating) }}>
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
                    {rating.review}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 2 }}>
                    {rating.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RatingCard;