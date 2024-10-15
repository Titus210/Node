const express = require('express');

const app = express();

const PORT = 8000;

app.get('/', (req,res)=>{
    res.send({
        id: 1,
        name: "John Doe",
    })
})

app.get('/planets', (req,res)=>{
    res.send("<ul><li>This is the first planet</li></ul>")
})

app.post('/planets', (req,res)=>{
   console.log("POST request updating planets")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})