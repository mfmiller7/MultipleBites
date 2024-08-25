import React from 'react';

import Grid from '@mui/material/Grid';

import RatingCard from './RatingCard';

export default function RatingList({ ratings }) {

  return (
    <Grid container spacing={4}>
      {ratings.map((rating, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <RatingCard rating={rating} />
        </Grid>
      ))}
    </Grid>
  );
};