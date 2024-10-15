const http = require('http')
const PORT = 8000;


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello, World!</h1> <br/> <p>This is an initial server</p>');
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})