const { MongoClient, ServerApiVersion } = require('mongodb');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});

const URI = process.env.MONGODB_URI;
const db_name = process.env.DATABASE_NAME;
let db;

async function connectToDB() {
    const client = new MongoClient(URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected to MongoDB');

        // return client.db();
        db = client.db(db_name);
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        throw err;
    }
}

async function getUsersCollection() {
    return db.collection('users');
}

async function getPlayersCollection() {
    return db.collection('players');
}

async function getCoachesCollection() {
    return db.collection('coaches');
}

async function getSubscriptionsCollection() {
    return db.collection('subscriptions');
}

async function getEventsCollection() {
    return db.collection('events');
}

async function getDrillsCollection() {
    return db.collection('drills');
}

module.exports = { connectToDB, getUsersCollection, getPlayersCollection, getCoachesCollection, getSubscriptionsCollection, getEventsCollection, getDrillsCollection };