const http = require('http')
const PORT = 8000;


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(JSON.stringify({
        id: 1,
        planet_name: 'Earth',
    }));
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})