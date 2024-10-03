const {send,read} = require('./internals')

// const request = require('./request');
//const response = require('./response');

function makeRequest(url, data){
    send(url, data);
    return read();
}

const responseData = makeRequest('https://www.google.com');
console.log(responseData);
