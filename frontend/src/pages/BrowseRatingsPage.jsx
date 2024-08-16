import React, { useState } from 'react';
import RatingList from '../components/RatingList';
import { Container, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const initialRatings = [
  { sandwich: 'Turkey Club', rating: 4, review: 'Tasty and well-balanced.' },
  { sandwich: 'BLT', rating: 5, review: 'Crispy bacon and fresh lettuce.' },
];

function BrowseRatingsPage() {
  const [filter, setFilter] = useState('');
  const [ratings, setRatings] = useState(initialRatings);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredRatings = ratings.filter(rating => rating.rating >= filter);

  return (
    <Container>
      <Box sx={{ pt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Browse Ratings
        </Typography>
        {/* <FilterForm onFilterChange={handleFilterChange} /> */}
        <RatingList ratings={filteredRatings} />
      </Box>
    </Container>
  );
}

export default BrowseRatingsPage;