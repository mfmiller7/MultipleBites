import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box, IconButton, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import RatingForm from '../components/RatingForm';

export default function RateGrinderPage() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (newRating) => {
    console.log('New Rating Submitted:', newRating);
    try {
      // const response = fetch(`http://localhost:3003/savenewrating`, {
      const response = fetch(`${process.env.REACT_APP_API_URL}/savenewrating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRating)
      });
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error during fetch:', error);
      setSuccess(false);
      setError(true);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Box sx={{ pt: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <RatingForm onSubmit={handleSubmit} />
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          There was an error saving your rating. Please try again later.
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Rating saved successfully.
        </Alert>
      )}
    </Container>
  );
};