import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { Container, Box, Menu, MenuItem, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

import RatingList from '../components/RatingList';

export default function BrowseRatingsPage() {
  const navigate = useNavigate();
  
  const [ratings, setRatings] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/getallratings`);
        setRatings(response.data.reverse());
      } catch (error) {
        console.error('Error fetching beers:', error);
      }
    };
    fetchRatings();
  }, []);

  const handleAddRating = () => {
    navigate('/rate')
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (criteria) => {
    let sortedRatings;
    switch (criteria) {
      case 'newest':
        sortedRatings = sortByDate(ratings, 'newest');
        break;
      case 'oldest':
        sortedRatings = sortByDate(ratings, 'oldest');
        break;
      case 'highest':
        sortedRatings = ratings.slice().sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sortedRatings = ratings.slice().sort((a, b) => a.rating - b.rating);
        break;
      default:
        sortedRatings = ratings;
    }
    setRatings(sortedRatings);
  };

  const sortByDate = (ratings, order) => {
    return ratings.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (order === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  };

  return (
    <Container>
      <Box sx={{ pt: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ pb: 4 }}>
          <div>
            <IconButton onClick={handleClick}>
              <SortIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleSort('newest')}>Newest</MenuItem>
              <MenuItem onClick={() => handleSort('oldest')}>Oldest</MenuItem>
              <MenuItem onClick={() => handleSort('highest')}>Highest Rating</MenuItem>
              <MenuItem onClick={() => handleSort('lowest')}>Lowest Rating</MenuItem>
            </Menu>
          </div>
          <Typography variant="h4">
            Grinder Grader
          </Typography>
          <IconButton onClick={handleAddRating}>
            <AddIcon />
          </IconButton>
        </Box>
        <RatingList ratings={ratings} />
      </Box>
    </Container>
  );
};