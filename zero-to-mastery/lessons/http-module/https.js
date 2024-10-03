const internals = require('./internals')

// const request = require('./request');
//const response = require('./response');

function makeRequest(url, data){
    internals.request.send(url, data);
    return internals.response.read();
}

const responseData = makeRequest('https://www.google.com');
console.log(responseData);
