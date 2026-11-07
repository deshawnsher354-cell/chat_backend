const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows front-end to talk to back-end on localhost
app.use(express.json()); // Allows server to read JSON bodies from req.body

// In-memory array to store all chat messages
const messages = [];

// GET endpoint: Sends all stored messages to front-end
app.get('/api/messages', (req, res) => {
    res.status(200).json(messages);
});

// POST endpoint: Catches new incoming message from front-end
app.post('/api/messages', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, error: "Message cannot be empty." });
    }

    const newMessage = {
        id: Date.now(),
        message: message
    };

    messages.push(newMessage);
    console.log("New message received:", newMessage);

    res.status(201).json({ success: true, data: newMessage });
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});