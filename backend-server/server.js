const { MongoClient, ServerApiVersion } = require('mongodb');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json()); // Parse JSON bodies

const connectToMongoDB = async () => {
    try {
        const client = new MongoClient(URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected to MongoDB');

        return client.db(); // Return the database object for further use
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if unable to connect
    }
};

const startServer = async () => {
    try {
        const db = await connectToMongoDB();

        // Define routes and other server logic here

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit the process if unable to start server
    }
};
  
startServer();