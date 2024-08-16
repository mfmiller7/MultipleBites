import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function RatingForm({ onSubmit }) {
  const [sandwich, setSandwich] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ sandwich, rating, review });
    setSandwich('');
    setRating('');
    setReview('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Rate a Sandwich
      </Typography>
      <TextField
        label="Sandwich Name"
        value={sandwich}
        onChange={(e) => setSandwich(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Rating
      </Button>
    </Box>
  );
}

export default RatingForm;