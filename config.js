/**
 * Configures and export configurations variables
 */

let environments = {
    development : {
        'httpPort' : 80,
        'httpsPort' : 443,
        'envName' : 'development',
        'hashingSecret' : 'a30078915d3e46db239efe1eb26025799bc1c23c'
    },
    production : {
        'httpPort' : 80,
        'httpsPort' : 443,
        'envName' : 'production',
        'hashingSecret' : '6b0b87a7d36dbec3ff3fb2d7e762cdb6e9376483'
    }
};

// Determines which environment was passed as a command-line argument
let currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
let environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment]
    : environments.development;

// Export the module
module.exports = environmentToExport;