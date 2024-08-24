import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { Container, Box, Menu, MenuItem, IconButton, Dialog, DialogContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import RatingList from '../components/RatingList';

export default function BrowseRatingsPage() {
  const navigate = useNavigate();

  const [ratings, setRatings] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/getallratings`);
        setRatings(response.data.reverse());
        setAllRatings(response.data.reverse());
      } catch (error) {
        console.error('Error fetching beers:', error);
      }
    };
    fetchRatings();
  }, []);

  const handleAddRating = () => {
    navigate('/rate')
  };

  // for sorting

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

  // for searching

  const handleSearch = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchQuery);
      handleCloseSearch();
      setSearchQuery('');
    }
  };

  const onSearch = (searchValue) => {
    const filteredRatings = ratings.filter((rating) =>
      rating.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      rating.restaurant.toLowerCase().includes(searchValue.toLowerCase()) ||
      rating.location.toLowerCase().includes(searchValue.toLowerCase())
    );
    setRatings(filteredRatings);
  };

  const handleClear = () => {
    setRatings(allRatings);
  };

  return (
    <Container>
      <Box alignItems="center" sx={{ pt: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ pb: 4 }}>
          <Box display="flex" alignItems="center">
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
              <MenuItem onClick={() => handleSort('highest')}>Best</MenuItem>
              <MenuItem onClick={() => handleSort('lowest')}>Worst</MenuItem>
            </Menu>
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            {allRatings.length != ratings.length &&
              <IconButton onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            }
          </Box>
          <Typography variant="h4">
            Grinder Grader
          </Typography>
          <IconButton onClick={handleAddRating}>
            <AddIcon />
          </IconButton>
          <Dialog open={openSearch} onClose={handleCloseSearch} maxWidth="xs" fullWidth>
            <DialogContent>
              <InputBase
                placeholder="Search ratings..."
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
                autoFocus
                value={searchQuery}
                onChange={handleSearchInput}
                onKeyPress={handleSearchKeyPress}
              />
            </DialogContent>
          </Dialog>
        </Box>
        <RatingList ratings={ratings} />
      </Box>
    </Container>
  );
};