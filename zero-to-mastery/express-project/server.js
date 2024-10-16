const express = require('express');
const path = require('path');
const app = express();
const planetRoutes = require('./routes/planetRoutes'); // Import routes

const PORT = 8000;

// Middleware to serve static files
app.use('/home',express.static(path.join(__dirname,'public')))

// Middleware to parse JSON data from requests
app.use(express.json());

// Middleware to log request duration
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const delta = Date.now() - start;
        console.log(`${req.method} ${req.url} ${delta} ms`);
    });
    next();
});

// Default route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Planetary API</h1>');
});

// Use planet routes
app.use('/planets', planetRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
