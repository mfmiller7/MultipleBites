const { connectToMongoDB } = require('../config/db');

async function getAllRatings(req, res) {
    try {
        const client = await connectToMongoDB();
        const database = client.db('Multiple Bites');
        const collection = database.collection('Ratings');
        const ratings = await collection.find({}).toArray();
        res.json(ratings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function saveNewRating(req, res) {
    const grinderData = req.body;
    try {
        const client = await connectToMongoDB();
        const database = client.db('Multiple Bites');
        const collection = database.collection('Ratings');
        const result = await collection.insertOne(grinderData);
        res.status(201).json({ message: 'Rating saved successfully!', result });
    } catch (error) {
        console.error('Error saving rating:', error);
        res.status(500).json({ error: 'Failed to save rating.' });
    }
}

module.exports = { getAllRatings, saveNewRating };