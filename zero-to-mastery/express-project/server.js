const express = require('express');
const path = require('path');
const planetRoutes = require('./routes/planetRoutes'); // Import routes

const { readPlanetsFromFile } = require('./controllers/planetsController');

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 8000;

// Middleware to serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

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

// Use planet routes
app.use('/planets', planetRoutes);

// Route to render the planet images
app.get('/home', (req, res) => {
    const planets = readPlanetsFromFile(); // Read planets from the file
    res.render('planets', {
        title: 'Planetary API',
        planets
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
