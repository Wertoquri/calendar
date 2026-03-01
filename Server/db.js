import {createPool} from 'mysql2/promise';
import {config} from 'dotenv';

config();

export default createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10
});