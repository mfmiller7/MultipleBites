import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function RatingForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const [ratingError, setRatingError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ratingValue = parseFloat(rating);
    if (ratingValue < 0 || ratingValue > 10 || isNaN(ratingValue)) {
      setRatingError(true);
    } else {
      onSubmit({
        name: `${firstName} ${lastName}`,
        restaurant,
        location: `${city}, ${state}`,
        rating: ratingValue,
        review,
        date: new Date(),
      });
      setFirstName('');
      setLastName('');
      setRestaurant('');
      setCity('');
      setState('');
      setRating('');
      setReview('');
      setRatingError(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box display="flex" gap={2}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
      </Box>
      {/* TODO: make this search resturants in db (use state management??) */}
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
}

export default RatingForm;