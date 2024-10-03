// fucntion to enctypt the dat
function encrypt(){
    return "encrypted data";
}

// function to make a request
function send(url, data){
    const encryptedData = encrypt(data);
    console.log(`Sending ${encryptedData} data to ${url}`)    
}

module.exports = {
    send,
}
