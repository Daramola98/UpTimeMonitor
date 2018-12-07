/*
* Prmary file for the handling requests
*
*/

// Dependencies
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

/*
* Function for handling client requests and sending back a response
*
*/
function requestHandler(req, res){
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path 
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')

    // Get the queryString as an Object
    const queryStringObject = parsedUrl.query;

    // Get the Method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const { headers } = req;

    // Get the payload if any

    // Initialize a new strinf decoder class to read the request payload
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    // Streams are being used in sending the payload so listen to the emit event and add the data to the buffer variable
    req.on('data', function(data){
        buffer += decoder.write(data);
    });

    // Tells us when the stream has ended
    req.on('end', function(){
        buffer += decoder.end();
        // Add logic you want to carry out after request has been successfully streamed
        // Send the response
        res.end('Hello World\n');

        // Log the request path
        console.log(`Request received with these payload`, buffer);
    })
}

// Exporting the top level API of this module
module.exports = requestHandler;
