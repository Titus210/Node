const express = require('express');
const router = express.Router();
const {
    getAllPlanets,
    getPlanetById,
    getPlanetByName,
    addPlanet,
    getPlanetImage
} = require('../controllers/planetsController');

// Define routes
router.get('/planet-by-name/:planetName', getPlanetByName); // Get planet by name
router.get('/planet-image/:planetName', getPlanetImage); // Get planet image
router.get('/:planetId', getPlanetById); // Get planet by ID
router.get('/', getAllPlanets); // Get all planets
router.post('/', addPlanet); // Add a new planet


module.exports = router;
 