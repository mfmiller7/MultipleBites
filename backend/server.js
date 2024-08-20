const express = require('express');
const app = express();
const port = 3003;
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const { MongoClient } = require('mongodb');

// connect to mongodb
async function main(){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to mongodb")
    } catch (e) {
        console.error(e);
    }
}

// fixes CORS issue
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
        } catch (error) {
            console.error(`Error saving rating to MongoDB: ${error.message}`);
        } finally {
            await client.close();
        }
    };
    await saveBeerToMongoDB(newRating);
});

// get ratings
const ratings = require("./ratings");
app.use("/", ratings);

app.get("/", (req, res) => {
    res.send("Welcome to the server!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    main().catch(console.error);
});