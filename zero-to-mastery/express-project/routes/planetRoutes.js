const express = require('express');
const router = express.Router();
const {
    getAllPlanets,
    getPlanetById,
    getPlanetByName,
    addPlanet
} = require('../controllers/planetsController');

// Define routes
router.get('/', getAllPlanets); // Get all planets
router.get('/:planetId', getPlanetById); // Get planet by ID
router.get('/planet-by-name/:planetName', getPlanetByName); // Get planet by name
router.post('/', addPlanet); // Add a new planet

module.exports = router;
 