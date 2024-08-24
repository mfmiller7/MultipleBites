// for accessing ratings from mongodb
const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGODB_URI;

router.get('/getallratings', async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('MultipleBites');
        const collection = database.collection('Ratings');
        const ratings = await collection.find({}).toArray();
        await client.close(); 
        res.json(ratings); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;