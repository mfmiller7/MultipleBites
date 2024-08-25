import React, { useState } from 'react';

import { TextField, Button, Box } from '@mui/material';

export default function RatingForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const [ratingError, setRatingError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedName = toPascalCase(name);
    const formattedRestaurant = toPascalCase(restaurant);
    const ratingValue = parseFloat(rating);
    const formattedCity = toPascalCase(city);
    const formattedState = state.toUpperCase();

    if (ratingValue < 0 || ratingValue > 10 || isNaN(ratingValue)) {
      setRatingError(true);
    } else {
      onSubmit({
        name: formattedName,
        restaurant: formattedRestaurant,
        location: `${formattedCity}, ${formattedState}`,
        rating: ratingValue,
        review,
        date: new Date(),
      });
      setName('');
      setRestaurant('');
      setCity('');
      setState('');
      setRating('');
      setReview('');
      setRatingError(false);
    }
  };

  function toPascalCase(str) {
    str = str.toLowerCase();
    return str.trim()
      .split(/[\s_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Restaurant"
        value={restaurant}
        onChange={(e) => setRestaurant(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <Box display="flex" gap={2}>
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputProps={{
            maxLength: 2,
          }}
        />
      </Box>
      {ratingError ? (
        <TextField
          error
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          helperText="Must be a number between 0 and 10."
        />
      ) : (
        <TextField
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
      )}
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
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};