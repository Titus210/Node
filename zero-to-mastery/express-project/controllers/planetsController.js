const planets = [
    { id: 1, planet_name: "Earth", distance_from_sun: "93 million miles", diameter: "7,917.5 miles" },
    { id: 2, planet_name: "Mars", distance_from_sun: "142 million miles", diameter: "4,212 miles" },
    { id: 3, planet_name: "Jupiter", distance_from_sun: "484 million miles", diameter: "86,881.4 miles" }
];

// Get all planets
const getAllPlanets = (req, res) => {
    res.json(planets);
};

// Get planet by ID
const getPlanetById = (req, res) => {
    const planet_id = Number(req.params.planetId);
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
    const planet = planets.find((p) => p.planet_name.toLowerCase() === planet_name);

    if (planet) {
        res.status(200).json({
            planet_name: planet.planet_name,
            distance_from_sun: planet.distance_from_sun,
        });
    } else {
        res.status(404).json({ error: "Planet not found" });
    }
};

// Add a new planet
const addPlanet = (req, res) => {
    const { planet_name, distance_from_sun, diameter } = req.body;

    // Check for missing fields
    const missingFields = [];
    if (!planet_name) missingFields.push('planet_name');
    if (!distance_from_sun) missingFields.push('distance_from_sun');
    if (!diameter) missingFields.push('diameter');

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
        diameter
    };

    planets.push(newPlanet);

    // Respond with success message
    res.status(201).json({
        message: "Planet created successfully",
        planet: newPlanet
    });
};

module.exports = {
    getAllPlanets,
    getPlanetById,
    getPlanetByName,
    addPlanet
};
