// Global object

// console.log(global)

  global.setTimeout(() => {
    console.log("Set timeout");
  }, 2000);

const int = setInterval(()=>{
    console.log("new")
},1000)


console.log(__dirname);     // gets the current directory
console.log(__filename);    // gets the names of the file


 