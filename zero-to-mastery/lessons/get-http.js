
const {get} = require('https');

get('https:www.gmail.com', (res) =>{
         res.on('data', (chunk) =>{
            console.log(`Data chunk: ${chunk}`);
        });
        res.on('end', () =>{
            console.log("no mo Gmail data");
        });
})
