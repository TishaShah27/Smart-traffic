// Import the mysql2 library
const mysql = require('mysql2');

// Define the configuration for the database connection
const config = {
    host: 'localhost',       // The hostname of the database you are connecting to
    user: 'root',            // The username to authenticate with
    password: 'password',    // The password to authenticate with
    database: 'traffic_db',  // The name of the database to connect to
};

// Create a connection to the database using the configuration
const connection = mysql.createConnection(config);

// Attempt to connect to the database
connection.connect((err) => {
    if (err) {
        // Handle any errors that occur during the connection attempt
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    // Log connection success information
    console.log('Connected to the database as ID:', connection.threadId);
});

// Export the connection for use in other parts of the application
module.exports = connection;
