import React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function RatingList({ ratings }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ratings List
      </Typography>
      <List>
        {ratings.map((rating, index) => (
          <ListItem key={index} sx={{ mb: 2 }}>
            <ListItemText
              primary={`Sandwich: ${rating.sandwich}`}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    Rating: {rating.rating}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    Review: {rating.review}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RatingList;