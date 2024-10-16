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

// Middleware to parse JSON data from requests
app.use(express.json());

// Middleware to log request duration
app.use((req, res, next) => {
    const start = Date.now(); // Track start time
    res.on('finish', () => {  // Execute when response is sent
        const delta = Date.now() - start;
        console.log(`${req.method} ${req.url} ${delta} ms`);
    });
    next(); // Proceed to next middleware or route
});

// Default route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Planetary API</h1>');
});

// Route to add a new planet (POST)
app.post('/planets', (req, res) => {
    const { planet_name, distance_from_sun, diameter } = req.body; // Destructure request body

    // Check for missing fields
    const missingFields = [];
    if (!planet_name) missingFields.push('planet_name');
    if (!distance_from_sun) missingFields.push('distance_from_sun');
    if (!diameter) missingFields.push('diameter');

    // If any field is missing, respond with 400 status and error message
    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    // If all required fields are present, create the new planet
    const newPlanet = {
        id: planets.length + 1,
        planet_name,
        distance_from_sun,
        diameter
    };
    // Respond with success message and the newly created planet
    res.status(201).json({
        message: "Planet created successfully",
        planet: newPlanet
    });
});

    // Route to get all planets (GET)
    app.get('/planets', (req, res) => {
        res.json(planets);
    });

    // Route to get a planet by its ID (GET)
    app.get('/planets/:planetId', (req, res) => {
        const planet_id = Number(req.params.planetId); // Convert ID to number
        const planet = planets.find(p => p.id === planet_id); // Find planet by ID

        if (planet) {
            res.status(200).json(planet); // If found, return planet data
        } else {
            res.status(404).json({ error: "Planet not found" }); // If not found, return 404
        }
    });

    // Route to get a planet by its name (GET)
    app.get('/planet-by-name/:planetName', (req, res) => {
        const planet_name = req.params.planetName.toLowerCase(); // Convert name to lowercase
        const planet = planets.find(p => p.planet_name.toLowerCase() === planet_name); // Find planet by name

        if (planet) {
            res.status(200).json({
                planet_name: planet.planet_name,
                distance_from_sun: planet.distance_from_sun,
            }); // If found, return name and distance from sun
        } else {
            res.status(404).json({ error: "Planet not found" }); // If not found, return 404
        }
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
