/**
 * Configures and export configurations variables
 */

let environments = {
    development : {
        'httpPort' : 3000,
        'httpsPort' : 3001,
        'envName' : 'development',
        'hashingSecret' : 'a30078915d3e46db239efe1eb26025799bc1c23c'
    },
    staging : {
        'httpPort' : process.env.PORT || 5000,
        'httpsPort' : process.env.PORT || 50001,
        'envName' : 'staging',
        'hashingSecret' : '0adab7e09018e0ca04351c55a4a13964b6098bb7'
    },
    production : {
        'httpPort' : process.env.PORT || 5000,
        'httpsPort' : process.env.PORT || 50001,
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