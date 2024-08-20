import React, { useState } from 'react';
import RatingForm from '../components/RatingForm';
import { Container, Box, Button, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RateGrinderPage() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(newRating) => {
    console.log('New Rating Submitted:', newRating);
    // TODO: debug post
    try {
      const response = await axios.post('http://localhost:3003/savenewrating', newRating);
      console.log('Rating saved successfully:', response.data);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('Error saving the rating:', error);
      setError(true);
      setSuccess(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Box sx={{ pt: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button onClick={handleBack} sx={{ ml:-2 }}>
            <ArrowBackIcon />
          </Button>
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
}

export default RateGrinderPage;