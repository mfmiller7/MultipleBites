const express = require('express');
const app = express();
const port = 3003;
const ratingRoutes = require('./routes/ratingRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use('/ratings', ratingRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});