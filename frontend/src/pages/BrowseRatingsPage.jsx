import React, { useState, useEffect } from 'react';
import RatingList from '../components/RatingList';
import { Container, Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const initialRatings = [
  { sandwich: 'Turkey Club', rating: 4, review: 'Tasty and well-balanced.' },
  { sandwich: 'BLT', rating: 5, review: 'Crispy bacon and fresh lettuce.' },
];

function BrowseRatingsPage() {
  const [filter, setFilter] = useState('');
  const [ratings, setRatings] = useState(initialRatings);
  const navigation = useNavigate();

  // useEffect = () => {
  //   // TODO: get ratings from DB
  // }

  // TODO: figure out filtering (maybe serach too?)
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredRatings = ratings.filter(rating => rating.rating >= filter);

  const handleAddRating = () => {
    navigation('/rate')
  };

  return (
    <Container>
      <Box sx={{ pt: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Grinder Grader
          </Typography>
          <Button onClick={handleAddRating}>
            <AddIcon />
          </Button>
        </Box>
        <RatingList ratings={filteredRatings} />
      </Box>
    </Container>
  );
}

export default BrowseRatingsPage;