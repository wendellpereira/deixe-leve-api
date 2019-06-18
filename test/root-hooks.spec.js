/**
 * Root level hooks for Mocha
 */

'use strict';

// Stops node server 1 second after all tests
after(()=> {
    setTimeout( ()=> {
        process.exit(0);
    }, 1000);
});