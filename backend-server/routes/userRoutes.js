const express = require('express');
const { getUsersCollection, getEventsCollection } = require('../db');

const router = express.Router();

// Users
router.post('/users', async (req, res) => {
    const userData = req.body;
    try {
        const usersCollection = await getUsersCollection();
        const result = await usersCollection.insertOne(userData);
        res.json(result.ops[0]);
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/users', async (req, res) => {
    try {
        const usersCollection = await getUsersCollection();
        const users = await usersCollection.find().toArray();
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users', err); 
        res.status(500).json({message: 'Server error'});
    }
});

router.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    try {
        const usersCollection = await getUsersCollection();
        const result = await usersCollection.updateOne({_id: ObjectId(userId)}, {$set: userData});
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user', err);
        res.status(500).json({message: 'Server error'});
    }
});

router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const usersCollection = await getUsersCollection();
        const result = await usersCollection.deleteOne({_id: ObjectId(userId)});
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user', err);
        res.status(500).json({message: 'Server error'});
    }
});

// Events
router.get('/events', async (req, res) => {
    try {
        const eventsCollection = await getEventsCollection();
        const events = await eventsCollection.find().toArray();
        res.json(events);
    } catch (err) {
        console.error('Error retrieving events', err); 
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;