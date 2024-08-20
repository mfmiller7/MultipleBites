const express = require('express');
const router = express.Router();
const { getAllRatings, saveNewRating } = require('../controllers/ratingController');

router.get('/getallratings', getAllRatings);
router.post('/savenewrating', saveNewRating);

module.exports = router;