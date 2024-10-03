const http = require('https');

const req = http.request("https://www.google.com", (res) =>{
    res.on('data', (chunk) =>{
        console.log(`Data chunk: ${chunk}`);
    });
    res.on('end', () =>{
        console.log('no more data to fetch');
    });
});
req.end();

