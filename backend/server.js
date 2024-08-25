const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
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
};

// fixes CORS issue
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

// for server
app.get("/", (req, res) => {
    res.send("Welcome to the server, Grinder Grader should work now!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    main().catch(console.error);
});