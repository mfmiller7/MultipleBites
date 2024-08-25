import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { Container, Box, Menu, MenuItem, IconButton, Dialog, DialogContent, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LinearProgress from '@mui/material/LinearProgress';

import RatingList from '../components/RatingList';
import logo from '../logo.png';
import { logoStyles } from '../constants';
import InfoModal from '../components/InfoModal';

export default function BrowseRatingsPage() {
  const navigate = useNavigate();

  const [ratings, setRatings] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://grindergrader.onrender.com/getallratings');
        const sorted = sortByDate(response.data, 'newest');
        setRatings(sorted);
        setAllRatings(sorted);
        setServerError(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching ratings:', error);
        setServerError(true);
      }
    };
    fetchRatings();
  }, []);

  const handleAddRating = () => {
    navigate('/rate');
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
      <Box sx={{ pt: 1, pb: 4 }}>
        <Box display="flex" justifyContent="space-between" sx={{ pb: 2 }}>
          <Box sx={{ pt: 1 }}>
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
            {allRatings.length === ratings.length &&
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            }
            {allRatings.length !== ratings.length &&
              <IconButton onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            }
          </Box>
          <img src={logo} alt="Grinder Grader Logo" style={logoStyles} />
          <Box sx={{ pt: 1 }}>
            <IconButton onClick={handleModalOpen}>
              <HelpOutlineIcon />
            </IconButton>
            <IconButton onClick={handleAddRating}>
              <AddIcon />
            </IconButton>
          </Box>
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
        <InfoModal
          open={modalOpen}
          onClose={handleModalClose}
        />
        {loading ? (
          <>
            <LinearProgress color="success" />
            <Alert severity="info" color="success">
              If loading is taking a while please start the server by clicking this <a href="https://grindergrader.onrender.com" target="_blank" rel="noopener noreferrer">link</a>, then return to this page.
            </Alert>
          </>
        ) : (serverError ? (
          <Alert severity="warning">
            Please start the server by clicking this <a href="https://grindergrader.onrender.com" target="_blank" rel="noopener noreferrer">link</a>, then return to this page.
          </Alert>
        ) : (
          <RatingList ratings={ratings} />
        ))}
      </Box>
    </Container>
  );
};