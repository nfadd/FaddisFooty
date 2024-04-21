const express = require('express');
const { getUsersCollection, getEventsCollection } = require('../db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

async function hashPassword(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
};

router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        const usersCollection = await getUsersCollection();
        const existingUser = await usersCollection.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hash = hashPassword(userData.password);
        if (!hash) {
            console.error('Error hashing password:', err);
        }

        userData.password = hash;
        console.log('Hashed password stored');

        const result = await usersCollection.insertOne(userData);
        res.json(result);
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

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const usersCollection = await getUsersCollection();
        const user = await usersCollection.findOne({_id: new ObjectId(userId)});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            delete user.password;
            res.json(user);
        }
    } catch (err) {
        console.error('Error retrieving user', err); 
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usersCollection = await getUsersCollection();
        const user = await usersCollection.findOne({email: email});
        if (!user) {
            return res.status(401).json({ message: '*Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: '*Invalid email or password' });
        }

        delete user.password;
        res.json(user);

        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.json({ token: token });
    } catch (err) {
        console.error('Login error:', err); 
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