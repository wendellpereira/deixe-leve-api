/**
 * Main file for API
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config/app-config');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');

// DotEnv injection and configuration
require('dotenv').config();

// DB
require('./config/db-congif.js');

// Instantiate the HTTP server
const httpServer = http.createServer( function(req, res) {
    unifiedServer(req, res);
});

// Start the HTTP server
httpServer.listen(config.httpPort, function(){
    console.log('The HTTP server is up and running on port:', config.httpPort  ,' - ', 'In ', config.envName, ' mode.');
});

// The server should respond to all requests with a string
const unifiedServer = function(req, res) {
    // Get the URL and parse it
    const parserUrl = url.parse(req.url, true);

    // Get the path
    const path = parserUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as a object
    const queryStringObject = parserUrl.query;

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        // Choose the appropriate handler, if not found, resolves the notFound handler
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Controls incorrect JSON requisitions - Only in the methods that requires payload
        const tempPayload = helpers.parseJsonToObject(buffer);
        if (['post', 'put'].indexOf(method) > 1 && Object.keys(tempPayload).length === 0) {
            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(400);
            res.end( JSON.stringify({'error': 'Incorrect JSON format.'}));
        } else {
            // Construct the data object to send to the handler
            let data = {
                'trimmedPath': trimmedPath,
                'queryStringObject': queryStringObject,
                'method': method,
                'headers': headers,
                'payload': tempPayload
            };

            // Route the request to the handler specified in the router
            chosenHandler(data, function (statusCode, payload) {
                // Use the status code called back the handler, or default
                statusCode = typeof (statusCode) === 'number' ? statusCode : 200;

                // User the payload called the handler, or default to an empty object
                payload = typeof (payload) === 'object' ? payload : {};

                // Convert the payload to a string
                const payloadString = JSON.stringify(payload);

                // Return the response
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                res.end(payloadString);

                // Log the request
                console.info(`- Returning the response: ${ statusCode } - On path: "${ trimmedPath } 
                                - With payload: ${ payloadString } 
                                - With queryStringObject: ${ JSON.stringify(queryStringObject, null, 4) }`);
            });
        }
    });
};


// Define the request router
let router = {
    ''       : handlers.main,
    'sample' : handlers.sample,
    'hello'  : handlers.hello,
    'users'  : handlers.users
};

// Exports for testing
module.exports = httpServer;