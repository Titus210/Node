const path = require('path');
const fs = require('fs');

// Define the path to the planets JSON file
const planetsFilePath = path.join(__dirname, '..', 'public', 'data', 'planets.json');

// Helper to read planets JSON data
const readPlanetsFromFile = () => {
    try {
        const data = fs.readFileSync(planetsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading planets file:", error);
        throw new Error("Unable to read planets data");
    }
};

// Helper to write planets JSON data
const writePlanetsToFile = (planets) => {
    try {
        fs.writeFileSync(planetsFilePath, JSON.stringify(planets, null, 2));
    } catch (error) {
        console.error("Error writing planets file:", error);
        throw new Error("Unable to write planets data");
    }
};

// Get all planets
const getAllPlanets = (req, res) => {
    try {
        const planets = readPlanetsFromFile();
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve planets" });
    }
};

// Get planet by ID
const getPlanetById = (req, res) => {
    const planet_id = Number(req.params.planetId);
    try {
        const planets = readPlanetsFromFile();
        const planet = planets.find((p) => p.id === planet_id);

        if (planet) {
            res.status(200).json(planet);
        } else {
            res.status(404).json({ error: "Planet not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve planet" });
    }
};

// Get planet by name
const getPlanetByName = (req, res) => {
    const planet_name = req.params.planetName.toLowerCase();
    try {
        const planets = readPlanetsFromFile();
        const planet = planets.find((p) => p.planet_name.toLowerCase() === planet_name);

        if (planet) {
            res.status(200).json({
                planet_name: planet.planet_name,
                distance_from_sun: planet.distance_from_sun,
                planet_images: planet.planet_images,
            });
        } else {
            res.status(404).json({ error: "Planet not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve planet" });
    }
};

// Get planet image
const getPlanetImage = (req, res) => {
    const planet_name = req.params.planetName.toLowerCase();
    const planets = readPlanetsFromFile();

    // Find the planet from JSON data
    const planet = planets.find(p => p.planet_name.toLowerCase() === planet_name);

    if (!planet) {
        return res.status(404).json({ error: `Planet "${planet_name}" not found.` });
    }

    // Get the first image path from the planet's images array
    const imagePath = path.join(__dirname, '..', planet.planet_images[0]);

    console.log("Resolved image path:", imagePath); // Debug log

    // Check if the image exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("Image not found or inaccessible:", err); // Error log
            return res.status(404).json({ error: `Image not found for planet "${planet_name}".` });
        }

        // Send the image file
        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ error: "Error sending the image file." });
            }
        });
    });
};

// Add a new planet
const addPlanet = (req, res) => {
    const { planet_name, distance_from_sun, diameter, planet_images } = req.body;

    try {
        const planets = readPlanetsFromFile();

        const missingFields = [];
        if (!planet_name) missingFields.push('planet_name');
        if (!distance_from_sun) missingFields.push('distance_from_sun');
        if (!diameter) missingFields.push('diameter');
        if (!planet_images || !Array.isArray(planet_images)) missingFields.push('planet_images');

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }

        const planetExists = planets.some(
            (p) => p.planet_name.toLowerCase() === planet_name.toLowerCase()
        );

        if (planetExists) {
            return res.status(409).json({
                error: `Planet "${planet_name}" already exists and cannot be added again.`,
            });
        }

        const newPlanet = {
            id: planets.length > 0 ? Math.max(...planets.map((p) => p.id)) + 1 : 1,
            planet_name,
            distance_from_sun,
            diameter,
            planet_images,
        };

        planets.push(newPlanet);
        writePlanetsToFile(planets);

        res.status(201).json({
            message: "Planet created successfully",
            planet: newPlanet,
        });
    } catch (error) {
        res.status(500).json({ error: "Unable to add planet" });
    }
};

module.exports = {
    getAllPlanets,
    getPlanetById,
    getPlanetByName,
    addPlanet,
    getPlanetImage,
    readPlanetsFromFile,
};
