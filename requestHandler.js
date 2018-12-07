/*
* Prmary file for the handling requests
*
*/

// Dependencies
const url = require('url');

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

    // Send the response
    res.end('Hello World\n');

    // Log the request path
    console.log('Request received on path: '+trimmedPath);

}

// Exporting the top level API of this module
module.exports = requestHandler;
