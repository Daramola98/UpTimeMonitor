/*
* Prmary file for the API
*
*/

//Dependencies
const http = require('http');
const requestHandler = require('./requestHandler');
const environmentConfig = require('./config');

// Creates Server and responds to requests based on the URL
const server = http.createServer(requestHandler);

// Assign Port Value Server is going to be listening on
const PORT = environmentConfig.port || 3000;

// Listen to the server on the assigned port and notify us when the server is listening
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})