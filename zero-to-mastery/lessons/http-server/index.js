const http = require('http');
const PORT = 8000;

const habitable_planets = [
    { id: 1, planet_name: 'Earth' },
    { id: 2, planet_name: 'Mars' },
    { id: 3, planet_name: 'Venus' }
];

const server = http.createServer((req, res) => {
    const items = req.url.split('/');

    if (items[1] === 'planets') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        if (items.length === 3) {
            const planetId = parseInt(items[2]);
            const planet = habitable_planets.find(p => p.id === planetId);

            if (planet) {
                res.end(JSON.stringify(planet));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Planet not found' }));
            }
        } else {
            res.end(JSON.stringify(habitable_planets));
        }
    } else if (items[1] === 'messages') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>Messages</h1>');
        res.write('<p>Message 1</p>');
        res.write('<p>Message 2</p>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
