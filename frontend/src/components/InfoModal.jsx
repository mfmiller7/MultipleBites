import React from 'react';

import { Box, IconButton, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

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
                <Typography variant="body1">
                    Sorting: In the top right, use the icon to sort ratings by date or overall rating.
                </Typography>
                <Typography variant="body1">
                    Search: Filter ratings by the rater’s name, restaurant location, or restaurant name.
                </Typography>
                <Typography variant="body1" paragraph>
                    Add a Rating: Tap the plus button in the top left to add your own ratings!
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