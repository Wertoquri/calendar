import db from './db.js';

async function testConnection() {
    try {
        console.log('Testing database connection...');
        const [rows] = await db.query('SELECT 1 as test');
        console.log('✅ Connection successful!', rows);
        
        // Check if database exists
        const [dbs] = await db.query('SHOW DATABASES LIKE "webcalendar"');
        if (dbs.length > 0) {
            console.log('✅ Database "webcalendar" exists');
        } else {
            console.log('❌ Database "webcalendar" does not exist');
            console.log('Run: source schema.sql');
        }
        
        // Check if tables exist
        const [tables] = await db.query('SHOW TABLES');
        console.log('Tables:', tables.map(t => Object.values(t)[0]));
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('Code:', error.code);
        console.error('Please check your .env file');
        process.exit(1);
    }
}

testConnection();
