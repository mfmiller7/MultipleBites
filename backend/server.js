const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3003; 
const cors = require('cors');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const { MongoClient } = require('mongodb');

// connect to mongodb
async function main(){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error(e);
    }
}

// fixes CORS issue
app.use(cors({
    origin: 'http://localhost:3000', // TODO: add production URL
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

// serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// save new rating
app.use(express.json());
app.post('/savenewrating', async (req, res) => {
    const newRating = req.body;
    console.log(`Rating received:`, newRating);
    const saveBeerToMongoDB = async (newRating) => {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const database = client.db('MultipleBites');
            const collection = database.collection('Ratings');
            await collection.insertOne(newRating);
            console.log(`Inserted ${newRating} into MongoDB.`);
            res.status(200).send('Rating saved successfully'); // Send a response to the client
        } catch (error) {
            console.error(`Error saving rating to MongoDB: ${error.message}`);
            res.status(500).send('Error saving rating'); // Send an error response to the client
        } finally {
            await client.close();
        }
    };
    await saveBeerToMongoDB(newRating);
});

// get ratings
const ratings = require("./ratings");
app.use("/", ratings);

// catch-all handler for any request that doesn't match an API route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    main().catch(console.error);
});