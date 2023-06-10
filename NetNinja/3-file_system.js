const fs = require("fs"); // importing ile system

// reading files
fs.readFile("./Blogs/blog.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString()); // data returns buffer we need to make it to string form
});

console.log("last line"); // comes first because function above is asynchronous

// writing files
fs.writeFile("./Blogs/blog.txt", "hello world", () => {
  console.log("File was written");
});
fs.writeFile("./Blogs/blog_2.txt", "hello world", () => {
  console.log("File was written");
});

// directories
// creating a directory
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder deleted");
  });
}

// deleting files
if(fs.existsSync('./Blogs/deleteme.txt')){
  fs.unlink('./Blogs/deleteme.txt',(err)=>{
    if(err){
      console.log(err);
    }
    console.log('File deleted')
  })
}