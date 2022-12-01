const http = require('http')
const serrver =  http.createServer((req,res)=>{
    res.writeHead(200,{"Name": "Titus"})
    res.end('Hello world!')
})