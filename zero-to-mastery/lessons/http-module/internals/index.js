/* exporting internal folder as module*/

// directly import here to avoid using (response, require) in the (http.js) file
// const request = require('./request') ;
// const response = require('./response');

/*
module.exports = {
    send: request.send,
    read: response.read,
}
*/

// using spread operator
module.exports ={
    ...require("./request"),
    ...require("./response"),
}
