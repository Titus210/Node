const path = require('path');
const fs = require('fs');

// Define the path to the planets JSON file
const planetsFilePath = path.join(__dirname, '..', 'public', 'data', 'planets.json');

// Read the planets from the JSON file
const readPlanetsFromFile = () => {
    const data = fs.readFileSync(planetsFilePath, 'utf-8');
    return JSON.parse(data);
};

// Write the planets back to the JSON file
const writePlanetsToFile = (planets) => {
    fs.writeFileSync(planetsFilePath, JSON.stringify(planets, null, 2));
};

// Get all planets
const getAllPlanets = (req, res) => {
    const planets = readPlanetsFromFile();
    res.json(planets);
};

// Get planet by ID
const getPlanetById = (req, res) => {
    const planet_id = Number(req.params.planetId);
    const planets = readPlanetsFromFile();
    const planet = planets.find((p) => p.id === planet_id);

    if (planet) {
        res.status(200).json(planet);
    } else {
        res.status(404).json({ error: "Planet not found" });
    }
};

// Get planet by name
const getPlanetByName = (req, res) => {
    const planet_name = req.params.planetName.toLowerCase();
    const planets = readPlanetsFromFile();
    const planet = planets.find((p) => p.planet_name.toLowerCase() === planet_name);

    if (planet) {
        res.status(200).json({
            planet_name: planet.planet_name,
            distance_from_sun: planet.distance_from_sun,
            planet_images: planet.planet_images
        });
    } else {
        res.status(404).json({ error: "Planet not found" });
    }
};

// Get planet image
const getPlanetImage = (req, res) => {
    const planet_name = req.params.planetName.toLowerCase();
    const imagePath = path.join(__dirname, '..', 'public', 'images', `${planet_name}.jpg`);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: `Image for planet "${planet_name}" not found` });
        }

        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ error: "Error sending the image file" });
            }
        });
    });
};

// Add a new planet
const addPlanet = (req, res) => {
    const { planet_name, distance_from_sun, diameter, planet_images } = req.body;
    const planets = readPlanetsFromFile();

    // Check for missing fields
    const missingFields = [];
    if (!planet_name) missingFields.push('planet_name');
    if (!distance_from_sun) missingFields.push('distance_from_sun');
    if (!diameter) missingFields.push('diameter');
    if (!planet_images || !Array.isArray(planet_images)) missingFields.push('planet_images');

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    // Check if the planet already exists
    const planetExists = planets.some(
        (p) => p.planet_name.toLowerCase() === planet_name.toLowerCase()
    );

    if (planetExists) {
        return res.status(409).json({
            error: `Planet "${planet_name}" already exists and cannot be added again.`
        });
    }

    // Create new planet
    const newPlanet = {
        id: planets.length + 1,
        planet_name,
        distance_from_sun,
        diameter,
        planet_images
    };

    planets.push(newPlanet);
    writePlanetsToFile(planets);

    res.status(201).json({
        message: "Planet created successfully",
        planet: newPlanet
    });
};

module.exports = {
    getAllPlanets,
    getPlanetById,
    getPlanetByName,
    addPlanet,
    getPlanetImage,
    readPlanetsFromFile,
};
