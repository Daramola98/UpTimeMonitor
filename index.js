/*
* Prmary file for the API
*
*/

//Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');
const requestHandler = require('./requestHandler');
const environmentConfig = require('./config');

// Creates Server and responds to requests based on the URL
const httpServer = http.createServer(requestHandler);

// Assign Port Value Server is going to be listening on
const httpPort = environmentConfig.httpPort || 3000;

// Listen to the http server on the assigned port and notify us when the server is listening
httpServer.listen(httpPort, () => {
    console.log(`Http Server is running on port ${httpPort}`);
})

// Instantiate the HTTPS server
const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
  };

// Create server for https connections
const httpsServer = https.createServer(httpsServerOptions, requestHandler);

// Assign a port for the https server
const httpsPort = environmentConfig.httpsPort;

// Listen to the https § on the assigned port and notify us when the server is listening
httpsServer.listen(httpsPort, () => {
    console.log(`Https Server is running on ${httpsPort}`);
})