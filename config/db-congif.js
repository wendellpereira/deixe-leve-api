/**
 * Config file for Mongoose/MongoDB connection
 */

const mongoose = require( 'mongoose' );

/** Set database URI */
const DBURI = process.env.MONGO_URI;
const DBSERVERNAME = DBURI.substr( DBURI.lastIndexOf('/', DBURI.length +2) +1);
console.log('Mongoose is about to connect on ' + DBSERVERNAME );

mongoose.Promise = global.Promise;

mongoose.connect(DBURI, {
    promiseLibrary: global.Promise,
    useNewUrlParser : true,
    useCreateIndex : true
});

mongoose.connection.on('connected', function() {
    console.log('MongoDB via Mongoose connected to ' + DBSERVERNAME);
});
mongoose.connection.on('error', function(err) {
    console.log('MongoDB via Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('MongoDB via Mongoose disconnected.');
});

const readLine = require ("readline");
if (process.platform === "win32") {
    const rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });

    rl.on ("SIGINT", function () {
        process.emit (Signals,"SIGINT");
    });
}

/**
 * Capture app termination / restart MongoDB/Mongoose
 */
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('MongoDB via Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

