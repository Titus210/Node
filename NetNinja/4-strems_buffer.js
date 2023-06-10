const fs = require("fs"); // importing ile system

const readStream = fs.createReadStream("./Blogs/stream_blog.txt", {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream('./Blogs/blog_4.txt');

readStream.on("data", (chunk) => {
  console.log("_________NEW CHUNK __________________");
  console.log(chunk);
  writeStream.write("\nNEW CHUNK\n");
  writeStream.write(chunk);
});


// piping
readStream.pipe(writeStream)