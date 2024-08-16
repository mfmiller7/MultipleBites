import React from 'react';
import RatingForm from '../components/RatingForm';
import { Container, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

function RateGrinderPage() {
  const handleSubmit = (newRating) => {
    console.log('New Rating Submitted:', newRating);
    // Here you would typically send the data to a server
  };

  return (
    <Container>
      <Box sx={{ pt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Rate a Sandwich
        </Typography>
        <RatingForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
}

export default RateGrinderPage;