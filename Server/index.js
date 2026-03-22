import express from 'express';
import cors from 'cors';
import db from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Register endpoint
app.post('/register', async (req, res) => {
    let { login, password, email } = req.body;
    console.log('Register attempt:', { login, email });
    try {
        // Check if user exists by login OR email
        let [existingUsers] = await db.query("SELECT id, login, email FROM user WHERE login = ? OR email = ?", [login, email]);
        
        if (existingUsers.length > 0) {
            const existingUser = existingUsers[0];
            if (existingUser.login === login) {
                return res.status(400).json({ error: 'User with this login already exists' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
        }
        
        let hashedPassword = await bcrypt.hash(password, 10);
        let insertResult = await db.query("INSERT INTO user (login, password, email) VALUES (?, ?, ?)", [login, hashedPassword, email]);
        console.log('User registered:', insertResult[0].insertId);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Register error:', err);
        console.error('Error details:', err.message, err.code, err.sql);
        res.status(500).json({ error: err.message || 'Server error', code: err.code });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let [users] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        let user = users[0];
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        let token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn: '14d' });
        res.status(200).json({ token, user: { id: user.id, email: user.email, login: user.login } });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Middleware to authenticate token
const authenticateToken = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    let token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }
    try {
        let user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

// Get all events for authenticated user
app.get('/events', authenticateToken, async (req, res) => {
    try {
        let [events] = await db.query("SELECT * FROM events WHERE user_id = ? ORDER BY date DESC", [req.user.id]);
        res.status(200).json({ events });
    } catch (err) {
        console.error('Get events error:', err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
});

// Create new event
app.post('/events', authenticateToken, async (req, res) => {
    let { title, date, time, color } = req.body;
    try {
        let result = await db.query(
            "INSERT INTO events (user_id, title, date, time, color) VALUES (?, ?, ?, ?, ?)",
            [req.user.id, title, date, time || '00:00', color || '#6366f1']
        );
        let newEvent = {
            id: result[0].insertId,
            user_id: req.user.id,
            title,
            date,
            time: time || '00:00',
            color: color || '#6366f1'
        };
        res.status(201).json({ event: newEvent });
    } catch (err) {
        console.error('Create event error:', err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
});

// Delete event
app.delete('/events/:id', authenticateToken, async (req, res) => {
    let eventId = req.params.id;
    try {
        let [result] = await db.query("DELETE FROM events WHERE id = ? AND user_id = ?", [eventId, req.user.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully', id: eventId });
    } catch (err) {
        console.error('Delete event error:', err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
});

// Update event
app.put('/events/:id', authenticateToken, async (req, res) => {
    let eventId = req.params.id;
    let { title, date, time, color } = req.body;
    try {
        let [result] = await db.query(
            "UPDATE events SET title = ?, date = ?, time = ?, color = ? WHERE id = ? AND user_id = ?",
            [title, date, time, color, eventId, req.user.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (err) {
        console.error('Update event error:', err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
});

// Protected route example
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ data: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));