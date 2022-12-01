const http = require('http')
const server =  http.createServer((req,res)=>{
    res.writeHead(200,{"Name": "Titus"})
    res.end('Hello world!')
})

server.listen(8000)