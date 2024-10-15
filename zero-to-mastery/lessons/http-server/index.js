const http = require('http')
const PORT = 8000;


const server = http.createServer((req, res) => {
    if (req.url === '/planets') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify({
            id: 1,
            planet_name: 'Earth',
        }));
    }
    else if (req.url === "/messages") {
        res.write('<html>')
        res.write('<body>')
        res.write('<h1>Messages</h1>')
        res.write('<p>Message 1</p>')
        res.write('<p>Message 2</p>')
        res.write('</body>')
        res.write('</html>')
        res.end()
    }
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})