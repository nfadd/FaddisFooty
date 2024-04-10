// Imports
const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db');
const userRoutes = require('./routes/userRoutes');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

const startServer = async () => {
    try {
        await connectToDB();

        // Define routes and other server logic here
        app.use('/api', userRoutes);

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