const Router = require('./requestRouter');

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

        // Choose handler to handle the request that is incoming
        const chosenHandler = typeof(Router[trimmedPath]) !== 'undefined' ? Router[trimmedPath] : Router['notFound'];

        // Construct the data to send to the chosen handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            body: buffer
        };

        // Route request by calling the chosen handler and passing the data to it
        chosenHandler(data, function(statusCode, payload){
            // Defaults for Status Code
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // Defaults for the payload sent back
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert Payload to a String
            const payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log(`Returning this response`, statusCode, payloadString);
        });
    })
}

// Exporting the top level API of this module
module.exports = requestHandler;
