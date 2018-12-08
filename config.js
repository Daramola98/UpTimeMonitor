/* 
* Create and export configuration variables
*
*/

// Containers for all the environments
function environmentContainers(){
    // Staging which is the default environment
    const staging = {
        'httpPort' : 3000,
        'httpsPort' : 3001,
        'envName' : 'staging'
      };

    // Environment for production
    const production = {
        'httpPort' : 5000,
        'httpsPort' : 5001,
        'envName' : 'production'
      };

    // Return object that shows configuration for multiple environments
    return {
        staging,
        production
    }
}

// Determine which environment was passed as a command line argument
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

// Check that the current environment is one of the environments above, if not default to staging
const environmentToExport = typeof(environmentContainers()[currentEnvironment]) == 'object' ? environmentContainers()[currentEnvironment] : environmentContainers()[currentEnvironment];

// Export environment configuration
module.exports = environmentToExport;