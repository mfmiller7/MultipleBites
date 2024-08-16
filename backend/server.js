const express = require('express');
const app = express();
const port = 3003;
require('dotenv').config();
const uri = process.env.MONGODB_URI;

// to connect to mongo db
const { MongoClient } = require('mongodb');
async function main(){
    const uri = process
    const client = new MongoClient(uri);
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);

// save rated grinders
app.use(express.json());
app.post('/savenewrating', async (req, res) => {
    const grinderData = req.body;
    console.log(`Grinder data received:`, grinderData);
    const saveToMongoDB = async (grinderData) => {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const database = client.db('MultipleBites');
            const collection = database.collection('Ratings');
            await collection.insertOne(grinderData);
            console.log(`Inserted ${grinderData} into MongoDB.`);
        } catch (error) {
            console.error(`Error saving rating to MongoDB: ${error.message}`);
        } finally {
            await client.close();
        }
    };
    await saveToMongoDB(grinderData);
});

// get rated grinders
const ratings = require("./ratings");
app.use("/", ratings);

// for server
app.get("/", (req, res) => {
    res.send("Welcome to the server!");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    main().catch(console.error);
});