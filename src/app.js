
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// In-memory user data store (Replace this with a real database in production)
let users = [];

// Create user (C in CRUD)
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required' });
    }

    const user = {
        id: users.length + 1, // Simple ID generation (incremental)
        name,
        email,
        age
    };

    users.push(user);
    return res.status(201).json(user);
});

// Get all users (R in CRUD)
app.get('/users', (req, res) => {
    return res.status(200).json(users);
});

// Get user by ID (R in CRUD)
app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
});

// Update user (U in CRUD)
app.put('/users/:id', (req, res) => {
    const { name, email, age } = req.body;
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Update user properties
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    return res.status(200).json(user);
});

// Delete user (D in CRUD)
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Remove user from the array
    users.splice(userIndex, 1);

    return res.status(204).send(); // No content, successfully deleted
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});