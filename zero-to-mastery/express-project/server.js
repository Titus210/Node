const express = require('express');
const app = express();

const PORT = 8000;

const planets = [
    {
        id: 1,
        planet_name: "Earth",
        distance_from_sun: "93 million miles",
        diameter: "7,917.5 miles",
    },
    {
        id: 2,
        planet_name: "Mars",
        distance_from_sun: "142 million miles",
        diameter: "4,212 miles",
    },
    {
        id: 3,
        planet_name: "Jupiter",
        distance_from_sun: "484 million miles",
        diameter: "86,881.4 miles",
    }
];

// Middleware to log request duration
app.use((req, res, next) => {
    const start = Date.now(); // Track the start time
    res.on('finish', () => {  // Use 'finish' event to ensure response has been sent
        const delta = Date.now() - start;
        console.log(`${req.method} ${req.url} ${delta} ms`);
    });
    next(); // Proceed to the next middleware/route handler
});

// Default route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Planetary API</h1>');
});

// Route to get all planets
app.get('/planets', (req, res) => {
    res.json(planets);
});

// Route to get a specific planet by its ID
app.get('/planets/:planetId', (req, res) => {
    const planet_id = Number(req.params.planetId); // Convert ID to a number
    const planet = planets.find(p => p.id === planet_id); // Find the planet by ID

    if (planet) {
        res.status(200).json(planet); // If found, return the planet data
    } else {
        res.status(404).json({ error: "Planet not found" }); // If not found, return 404
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
