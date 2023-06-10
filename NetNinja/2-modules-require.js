// import people module
const xyz = require("./people");

console.log(xyz); // gives an empty array
// console.log(people) // gives an error

console.log(xyz.people);
console.log(xyz.age);

 // import multiple objects
 const {age,people} = require("./people");

 // import operating system
 const os = require('os');
 console.log(os.platform(), os.homedir())
