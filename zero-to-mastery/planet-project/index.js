const {parse} = require('csv-parse');
const fs = require('fs')

const results = []

// check if planet is habitable
function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: "#",
        columns: true,
        cast: true        
    }))
    .on('data', (data) => {
        results.push(data)
    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', () => {
        console.log(results)
        console.log("done processing")
    });
