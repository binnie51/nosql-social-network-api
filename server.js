const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// set up localhost PORT TO host app    
const PORT = process.env.port || 3001;
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Once cennection has been established, app listening to the PORT  
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}!`);
    });
});