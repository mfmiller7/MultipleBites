import React from 'react';

import { Box, IconButton, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';

import { ModalStyle } from '../constants';

const InfoModal = ({ open, onClose }) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={ModalStyle}>
                <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={handleClose}>
                        <ClearIcon />
                    </IconButton>
                </Box>
                <Typography variant="h5" component="h2">
                    About
                </Typography>
                <Typography variant="body1" paragraph>
                    I created this app for my dad, who can never visit the East Coast without stopping at a pizza shop to grab a grinder. Now, he can easily rate and track all his favorite spots!
                </Typography>
                <Typography variant="h5" component="h2">
                    How to Use
                </Typography>
                <Typography variant="body1" paragraph>
                    Click the <AddIcon fontSize='small' sx={{ verticalAlign: 'middle' }}/> icon in the top right corner to fill out the form and add your own rating! 
                    In the top left corner, you can use the <SortIcon fontSize='small' sx={{ verticalAlign: 'middle' }}/> icon to sort ratings by date or overall score. 
                    Use the <SearchIcon fontSize='small' sx={{ verticalAlign: 'middle' }}/> icon to filter ratings by the rater’s name, restaurant name, or restaurant location. Click the <ClearIcon fontSize='small' sx={{ verticalAlign: 'middle' }}/> icon to reset the filter when you're done.
                </Typography>
                <Typography variant="h5" component="h2">
                    Contact
                </Typography>
                <Typography variant="body1">
                    If you have any questions or feedback, feel free to reach out to me at <a href="mailto:margomiller048@gmail.com">margomiller048@gmail.com</a>.
                </Typography>
            </Box>
        </Modal>
    );
};

export default InfoModal;