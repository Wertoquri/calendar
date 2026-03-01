import express from 'express';
import cors from 'cors';
import db from './db.js';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*'

}))

app.post('/register', async (req, res) => {
    let { login, password, email } = req.body;
    try{
        let result = await db.query("SELECT * FROM user WHERE login = ? OR email = ?", [login, email]);
        if(result[0].length > 0){
            return res.status(400).json({error: 'User with this login or email already exists'});
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO user (login, password, email) VALUES (?, ?, ?)", [login, hashedPassword, email]);
        res.status(201).json({message: 'User registered successfully'});
    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
});

app.listen(3000,()=>console.log('Server is running on port 3000'));